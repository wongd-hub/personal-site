import React, { useRef, useEffect, useMemo } from 'react';

// Configuration constants
const HIST_WIDTH = 144; // 80% of 180
const HIST_HEIGHT = 66; // scaled down proportionally
const HIST_BINS = 14;

const COLOR_SIZE = 66; // 80% of previous 82
const COLOR_WIDTH = COLOR_SIZE;
const COLOR_HEIGHT = COLOR_SIZE;

// Utility to convert RGB to Hue (0-360)
function rgbToHue(r, g, b) {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;
  if (delta === 0) return 0;
  let hue;
  if (max === r) hue = ((g - b) / delta) % 6;
  else if (max === g) hue = (b - r) / delta + 2;
  else hue = (r - g) / delta + 4;
  hue = (hue * 60 + 360) % 360;
  return hue;
}

export default function ParticleGraphs({ particleData }) {
  const histCanvasRef = useRef(null);
  const colorCanvasRef = useRef(null);
  const peaksRef = useRef(new Array(HIST_BINS).fill(0)); // Persistent peak heights per bin

  // Process data – memoised for perf
  const { yHistogram, colorBins, yRange, stats } = useMemo(() => {
    if (!particleData?.positions || !particleData?.colors) {
      return { yHistogram: [], colorBins: {}, yRange: null, stats: null };
    }

    const positions = particleData.positions;
    const colors = particleData.colors;

    // --------- Build Y-position histogram (positive & negative) ---------
    const sampleRate = 3; // every 3rd particle for perf
    const yValues = [];
    for (let i = 1; i < positions.length; i += 3 * sampleRate) {
      yValues.push(positions[i + 1]); // Y at i+1
    }
    if (yValues.length === 0) return { yHistogram: [], colorBins: {}, yRange: null, stats: null };

    // Build full-range histogram (-max to +max) evenly across bins and gather stats
    const yMin = Math.min(...yValues);
    const yMax = Math.max(...yValues);
    const binSize = (yMax - yMin) / HIST_BINS;
    const fullHist = new Array(HIST_BINS).fill(0);

    // Stats for normal overlay
    let sumY = 0;
    let sumY2 = 0;

    yValues.forEach((v) => {
      const idx = Math.min(Math.floor((v - yMin) / binSize), HIST_BINS - 1);
      fullHist[idx]++;

      sumY += v;
      sumY2 += v * v;
    });

    const n = yValues.length;
    const mean = sumY / n;
    const variance = Math.max(sumY2 / n - mean * mean, 1e-6);
    const sigma = Math.sqrt(variance);

    // --------- Build colour distribution ---------
    const colourBins = {
      red: 0, orange: 0, yellow: 0, green: 0,
      cyan: 0, blue: 0, purple: 0, magenta: 0,
    };
    const colourSampleRate = 3;
    for (let i = 0; i < colors.length; i += 3 * colourSampleRate) {
      const r = colors[i];
      const g = colors[i + 1];
      const b = colors[i + 2];
      const h = rgbToHue(r, g, b);
      if (h < 30 || h >= 330) colourBins.red++;
      else if (h < 60) colourBins.orange++;
      else if (h < 90) colourBins.yellow++;
      else if (h < 150) colourBins.green++;
      else if (h < 180) colourBins.cyan++;
      else if (h < 240) colourBins.blue++;
      else if (h < 300) colourBins.purple++;
      else colourBins.magenta++;
    }

    return { yHistogram: fullHist, colorBins: colourBins, yRange: { min: yMin, max: yMax }, stats: { mean, sigma } };
  }, [particleData]);

  // Draw Cyber-punk Histogram with falling peak indicators
  useEffect(() => {
    const canvas = histCanvasRef.current;
    if (!canvas || !yHistogram) return;
    const ctx = canvas.getContext('2d');

    ctx.globalAlpha = 0.8; // overall transparency

    const hist = yHistogram || [];
    const maxCount = Math.max(...hist, 1);

    const barWidth = HIST_WIDTH / HIST_BINS;
    const baseY = HIST_HEIGHT - 4; // padding bottom
    const maxBarHeight = HIST_HEIGHT - 18; // leave head-room for peaks

    // Slightly clear previous frame to create soft trail
    ctx.fillStyle = 'rgba(0,0,0,0.18)';
    ctx.fillRect(0, 0, HIST_WIDTH, HIST_HEIGHT);

    // Subtle glow in cotton-candy palette
    ctx.shadowBlur = 2;
    ctx.shadowColor = 'rgba(216,180,254,0.25)';

    const peaks = peaksRef.current;
    const PEAK_DECAY = 0.8; // pixels per frame

    for (let i = 0; i < HIST_BINS; i++) {
      let barHeight = (hist[i] / maxCount) * maxBarHeight;
      if (!Number.isFinite(barHeight)) barHeight = 0;

      // Update peak height
      if (barHeight > (peaks[i] || 0)) {
        peaks[i] = barHeight;
      } else {
        peaks[i] = Math.max((peaks[i] || 0) - PEAK_DECAY, barHeight);
      }

      // Draw bar using cotton-candy gradient (lavender → pink)
      const grad = ctx.createLinearGradient(0, baseY - barHeight, 0, baseY);
      grad.addColorStop(0, '#818cf8');   // top – indigo-lavender
      grad.addColorStop(0.7, '#d8b4fe'); // mid – light purple
      grad.addColorStop(1, '#f9a8d4');   // bottom – soft pink
      ctx.fillStyle = grad;
      ctx.fillRect(i * barWidth, baseY - barHeight, barWidth - 2, barHeight);

      // Draw peak indicator (lavender highlight 2 px)
      ctx.fillStyle = '#d8b4fe';
      ctx.fillRect(i * barWidth, baseY - peaks[i] - 2, barWidth - 2, 2);
    }

    // ---- Draw normal distribution line ----
    if (stats && stats.sigma > 0.0001) {
      const { mean, sigma } = stats;
      ctx.beginPath();
      ctx.strokeStyle = '#5ffbf1';
      ctx.lineWidth = 1;

      for (let i = 0; i < HIST_BINS; i++) {
        // bin center value
        const yVal = ((i + 0.5) * (yRange.max - yRange.min)) / HIST_BINS + yRange.min;
        const z = (yVal - mean) / sigma;
        const pdf = Math.exp(-0.5 * z * z);
        const pdfHeight = pdf * maxBarHeight; // scaled so peak aligns with maxBarHeight
        const x = i * barWidth + barWidth / 2;
        const y = baseY - pdfHeight;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }

    ctx.shadowBlur = 0; // reset

    ctx.globalAlpha = 1; // restore for subsequent operations

  }, [yHistogram, stats, yRange]);

  // Draw Colour Spectrum Ring (radial representation)
  useEffect(() => {
    const canvas = colorCanvasRef.current;
    if (!canvas || !colorBins || Object.keys(colorBins).length === 0) return;
    const ctx = canvas.getContext('2d');

    // Clear canvas fully (no trail needed)
    ctx.clearRect(0, 0, COLOR_WIDTH, COLOR_HEIGHT);

    ctx.globalAlpha = 0.8; // match overall transparency

    const categories = Object.keys(colorBins);
    const values = Object.values(colorBins);
    const maxCount = Math.max(...values, 1);

    // Geometry
    const cx = COLOR_WIDTH / 2;
    const cy = COLOR_HEIGHT / 2;
    const outerR = Math.min(COLOR_WIDTH, COLOR_HEIGHT) / 2 - 4; // padding
    const innerR = outerR * 0.25; // minimum radius for very low density
    const angleStep = (Math.PI * 2) / categories.length; // equal slices

    // Draw faint concentric circles (HUD styling)
    ctx.save();
    ctx.strokeStyle = 'rgba(255,255,255,0.08)';
    ctx.lineWidth = 1;
    ctx.setLineDash([3, 4]);
    [innerR, (innerR + outerR) / 2, outerR].forEach((r) => {
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.stroke();
    });

    // Crosshair lines
    ctx.beginPath();
    ctx.moveTo(cx - outerR, cy);
    ctx.lineTo(cx + outerR, cy);
    ctx.moveTo(cx, cy - outerR);
    ctx.lineTo(cx, cy + outerR);
    ctx.stroke();
    ctx.restore();

    // Build star-shaped polygon representing colour densities
    const points = [];
    categories.forEach((cat, idx) => {
      const density = values[idx] / maxCount; // 0 → 1
      const r = innerR + density * (outerR - innerR);
      const angle = -Math.PI / 2 + idx * angleStep; // start at 12 o'clock
      points.push({
        x: cx + r * Math.cos(angle),
        y: cy + r * Math.sin(angle),
        colour: cat,
      });
    });

    // Fill polygon with translucent mint gradient
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
      ctx.lineTo(points[i].x, points[i].y);
    }
    ctx.closePath();
    const gradient = ctx.createRadialGradient(cx, cy, innerR * 0.3, cx, cy, outerR);
    gradient.addColorStop(0, 'rgba(249,168,212,0.20)'); // pink core
    gradient.addColorStop(1, 'rgba(216,180,254,0.08)'); // lavender edge
    ctx.fillStyle = gradient;
    ctx.fill();

    // Outline with bright cyan base
    ctx.strokeStyle = '#5ffbf1';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // ----- Per-edge coloured accents so hue bins are obvious -----
    const colourMap = {
      red: '#f87171', orange: '#fb923c', yellow: '#fde047', green: '#4ade80',
      cyan: '#22d3ee', blue: '#60a5fa', purple: '#a78bfa', magenta: '#f472b6',
    };

    categories.forEach((cat, idx) => {
      const p1 = points[idx];
      const p2 = points[(idx + 1) % points.length];
      ctx.beginPath();
      ctx.strokeStyle = colourMap[cat] || '#ffffff';
      ctx.lineWidth = 2;
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.stroke();
    });

    ctx.globalAlpha = 1;
  }, [colorBins]);

  return (
    <div className="graphs-boxes">
      <div className="graph-wrapper y-graph">
        <canvas
          ref={histCanvasRef}
          width={HIST_WIDTH}
          height={HIST_HEIGHT}
          className="graph-canvas"
          aria-label="Y Position Distribution"
        />
        <span className="graph-label">y-pos {yRange && Number.isFinite(yRange.min) ? `(${yRange.min.toFixed(1)} → ${yRange.max.toFixed(1)})` : ''}</span>
      </div>
      <div className="graph-wrapper colour-graph">
        <canvas
          ref={colorCanvasRef}
          width={COLOR_WIDTH}
          height={COLOR_HEIGHT}
          className="graph-canvas color-ring"
          aria-label="Colour Distribution"
        />
        <span className="graph-label">colour-dsn</span>
      </div>
    </div>
  );
} 