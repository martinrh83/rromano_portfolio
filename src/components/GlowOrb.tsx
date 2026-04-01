interface GlowOrbProps {
  size?: number;
  className?: string;
}

export function GlowOrb({ size = 12, className = "" }: GlowOrbProps) {
  return (
    <div
      className={`glow-orb${className ? ` ${className}` : ""}`}
      style={{ width: size, height: size }}
    />
  );
}
