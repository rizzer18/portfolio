import React from "react";

interface AuraBackgroundProps {
  children?: React.ReactNode;
  className?: string;
}

export function AuraBackground({ children, className }: AuraBackgroundProps) {
  return <div className={className ? `min-h-screen ${className}` : "min-h-screen"}>{children}</div>;
}

export default AuraBackground;
