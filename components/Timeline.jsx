import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Timeline() {
  const timelineRef = useRef(null);
  const cardsRef = useRef([]);

  const timelineData = [
    {
      id: 'current',
      type: 'work',
      date: 'May 2024 - Present',
      title: 'Lead Data Analyst',
      organization: 'Commonwealth Department of Health',
      department: 'Health Workforce Data Intelligence Unit',
      location: 'Canberra, Australia',
      achievements: [
        'Headhunted to be one of three modelling leads responsible for delivering supply-and-demand models for key medical specialist professions',
        'Led the end-to-end delivery of the Psychiatry model stream over 12 months, directing team resources effectively',
        'Automated several key modelling outputs, reducing manual work and eliminating human error',
        'Led critical senior-level briefings including up to DEPSEC level and C-suite external stakeholders',
        'Currently leading integration of 3+ R-based models with AWS-hosted online tool'
      ],
      technologies: ['R', 'AWS', 'Python', 'Git']
    },
    {
      id: 'data-scientist',
      type: 'work',
      date: 'Jul 2022 - Apr 2024',
      title: 'Data Scientist',
      organization: 'Commonwealth Department of Health',
      department: 'Data Analytics Branch',
      location: 'Canberra, Australia',
      achievements: [
        'Led a $67M cost-saving analytics transition from 40-person consultancy to 9-person internal team',
        'Performed advanced analytics in one of Australia\'s largest secure linked data environments',
        'Optimized key data pipeline speeds by 50% through advanced R code improvements',
        'Migrated 220+ mission-critical tables (1.8B+ rows) from Hadoop to Google BigQuery in under two months',
        'Gained extensive hands-on experience with large-scale, secure unit record data using R and Python'
      ],
      technologies: ['R', 'Python', 'Google BigQuery', 'Hadoop', 'Git', 'PLIDA']
    },
    {
      id: 'data-analyst',
      type: 'work',
      date: 'Apr 2021 - Jun 2022',
      title: 'Data Analyst',
      organization: 'Commonwealth Department of Health',
      department: 'Health Economics & Modelling Branch',
      location: 'Canberra, Australia',
      achievements: [
        'Led the Department of Health and Aged Care\'s data modelling to forecast demand for health workers across Australia for the next 30 years',
        'Quickly fixed an unworkable microsimulation model within six weeks using advanced R and problem-solving skills',
        'Developed a method for forecasting new healthcare demands using logistic regression on unit record data',
        'Built an R-Shiny dashboard for data-driven decision-making and authored a concise user guide'
      ],
      technologies: ['R', 'SAS', 'R Shiny', 'Logistic Regression']
    },
    {
      id: 'economist',
      type: 'work',
      date: 'Jul 2018 - Mar 2021',
      title: 'Economist',
      organization: 'Pharmacy Guild of Australia',
      department: 'Economics & Data Team',
      location: 'Canberra, Australia',
      achievements: [
        'Served as the sole technical developer and economic modeller for the $25.3 billion negotiations with the Government',
        'Demonstrated a steep learning curve, rapidly upskilling in R and SQL within three months',
        'Built comprehensive R documentation site with end-to-end technical documentation',
        'Singlehandedly delivered high-quality forecasts under tight deadlines—matching output of a five-person government team',
        'Led stakeholder engagement with 20+ technical and policy experts, including C-suite executive leadership'
      ],
      technologies: ['R', 'SQL', 'Time Series Forecasting', 'Economic Modelling']
    },
    {
      id: 'education-masters',
      type: 'education',
      date: '2019 - Present',
      title: 'Master of Data Science',
      organization: 'Deakin University',
      department: 'Graduate Certificate in Health Economics',
      location: 'Australia',
      achievements: [
        'Currently pursuing advanced data science qualifications',
        'Focus on machine learning, statistical modelling, and data engineering',
        'Complementing practical experience with theoretical foundations'
      ],
      technologies: ['Machine Learning', 'Statistical Modelling', 'Data Engineering']
    },
    {
      id: 'education-bachelor',
      type: 'education',
      date: '2015 - 2018',
      title: 'Bachelor of Actuarial Studies/Commerce',
      organization: 'Australian National University',
      department: '',
      location: 'Canberra, Australia',
      achievements: [
        'Double degree combining actuarial mathematics with commerce',
        'Strong foundation in statistics, probability theory, and financial mathematics',
        'Developed analytical and quantitative problem-solving skills'
      ],
      technologies: ['Statistics', 'Probability Theory', 'Financial Mathematics']
    },
    {
      id: 'project-herd',
      type: 'project',
      date: '2020 - Present',
      title: 'The Herd Mentality',
      organization: 'Technical Blogger & Founder',
      department: '',
      location: 'Online',
      achievements: [
        'Founded and maintain a technical blog showcasing insights and innovations in data science & engineering',
        'Share knowledge and methodologies with fellow data scientists and engineers',
        'Regular contributor covering advanced analytics techniques and industry trends'
      ],
      technologies: ['Technical Writing', 'Data Science', 'Knowledge Sharing']
    },
    {
      id: 'project-agency',
      type: 'project',
      date: '2020 - 2022',
      title: 'VanillaTea Digital Agency',
      organization: 'Front-end Web Developer',
      department: '',
      location: 'Freelance',
      achievements: [
        'Led React web development projects for digital agency startup',
        'Developed responsive, modern web applications',
        'Collaborated with design and backend teams to deliver client solutions'
      ],
      technologies: ['React', 'JavaScript', 'HTML/CSS', 'Web Development']
    }
  ];

  useEffect(() => {
    // Animate timeline cards on scroll
    cardsRef.current.forEach((card, index) => {
      if (card) {
        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 50,
            rotationX: 15
          },
          {
            opacity: 1,
            y: 0,
            rotationX: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }
    });

    // Animate the timeline line
    gsap.fromTo(
      '.timeline-line',
      { scaleY: 0 },
      {
        scaleY: 1,
        duration: 2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: timelineRef.current,
          start: "top 80%",
          end: "bottom 20%",
          scrub: 1
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const getTypeIcon = (type) => {
    switch (type) {
      case 'work':
        return '💼';
      case 'education':
        return '🎓';
      case 'project':
        return '🚀';
      default:
        return '📍';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'work':
        return '#4285f4';
      case 'education':
        return '#34a853';
      case 'project':
        return '#ea4335';
      default:
        return '#fbbc05';
    }
  };

  return (
    <div className="timeline-container" ref={timelineRef}>
      <h2 className="timeline-title">Professional Journey</h2>
      <div className="timeline">
        <div className="timeline-line"></div>
        {timelineData.map((item, index) => (
          <div
            key={item.id}
            className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}
            ref={el => cardsRef.current[index] = el}
          >
            <div className="timeline-marker" style={{ backgroundColor: getTypeColor(item.type) }}>
              <span className="timeline-icon">{getTypeIcon(item.type)}</span>
            </div>
            <div className="timeline-card glass-bg">
              <div className="timeline-card-header">
                <div className="timeline-date">{item.date}</div>
                <h3 className="timeline-title-text">{item.title}</h3>
                <div className="timeline-organization">
                  {item.organization}
                  {item.department && <span className="timeline-department"> • {item.department}</span>}
                </div>
                <div className="timeline-location">{item.location}</div>
              </div>
              <div className="timeline-card-content">
                <ul className="timeline-achievements">
                  {item.achievements.map((achievement, i) => (
                    <li key={i}>{achievement}</li>
                  ))}
                </ul>
                {item.technologies && (
                  <div className="timeline-technologies">
                    {item.technologies.map((tech, i) => (
                      <span key={i} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 