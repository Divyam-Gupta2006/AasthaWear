'use client';
import { useState } from 'react';

export default function Photo({
  src,
  alt = 'आstha ceremonial apparel',
  tone = '#c4c3c0',
  className = '',
  children,
  style,
  onClick,
  priority = false
}) {
  const [error, setError] = useState(false);
  const grad = `linear-gradient(160deg, ${tone}, ${tone}cc 60%, #00000022)`;
  const effectiveSrc = !error && src ? src : null;

  return (
    <div
      className={`photo ${className}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      style={{
        backgroundImage: effectiveSrc ? `url(${effectiveSrc}), ${grad}` : grad,
        ...style
      }}
      aria-label={alt}
    >
      {effectiveSrc && (
        <img
          src={effectiveSrc}
          alt={alt}
          onError={() => setError(true)}
          style={{ display: 'none' }}
          loading={priority ? 'eager' : 'lazy'}
        />
      )}
      {children}
    </div>
  );
}
