'use client';

import { track } from '@vercel/analytics';

// A plain <a> that fires a named analytics event on click before navigating —
// used for every WhatsApp/call link so we know what page/machine drove the contact.
export default function TrackedLink({ event, props, onClick, ...rest }) {
  return (
    <a
      {...rest}
      onClick={(e) => {
        if (event) track(event, props || {});
        if (onClick) onClick(e);
      }}
    />
  );
}
