import React from 'react';

export default function EngravedLabel({ children, notch = false, notchColor = '', className = '' }) {
  return (
    <span className={`engraved-label t-engraved ${className}`}>
      {notch && <span className={`notch ${notchColor}`} aria-hidden="true" />}
      {children}
    </span>
  );
}
