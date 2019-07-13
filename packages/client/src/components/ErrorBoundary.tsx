import React from "react";

export default class ErrorBoundary extends React.Component {
  public static getDerivedStateFromError() {
    return { hasError: true };
  }

  public state = { hasError: false };

  // public componentDidCatch(error, info) {}

  public render() {
    if (this.state.hasError) {
      return <h1>An error occured, please refresh your browser</h1>;
    }

    return this.props.children;
  }
}
