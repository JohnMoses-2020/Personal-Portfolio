import React from 'react';

/*
 * Nothing on this page pretends. Content awaiting John's real material is
 * stamped, visibly, until the truth replaces it.
 */
export default function ProvisionalStamp({ children = 'Provisional', title }) {
  return (
    <span className="provisional-stamp" title={title || 'Awaiting John’s real material'}>
      {children}
    </span>
  );
}
