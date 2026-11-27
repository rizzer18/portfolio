import React from "react";

interface AuraBackgroundProps {
  children?: React.ReactNode;
  className?: string;
}

export function AuraBackground({ children, className }: AuraBackgroundProps) {
  return (
    <div className={className ? `aura-bg ${className}` : "aura-bg"}>
      <div className="aura-layer-1" aria-hidden="true" />
      <div className="aura-layer-2" aria-hidden="true" />
      <div className="aura-layer-3" aria-hidden="true" />
      <div className="aura-content">{children}</div>
    </div>
  );
}

export default AuraBackground;
