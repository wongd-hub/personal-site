import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    // Log full error details to the console for debugging
    console.error('💥 ErrorBoundary caught an error', error, info);
  }

  render() {
    const { error } = this.state;
    if (error) {
      // Render nothing on error (white screen), but console will have details
      return null;
    }
    return this.props.children;
  }
} 