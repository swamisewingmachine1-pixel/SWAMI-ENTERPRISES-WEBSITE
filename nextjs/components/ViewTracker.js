'use client';

import { useEffect } from 'react';
import { track } from '@vercel/analytics';

// Fires a product_view event once when a machine's page mounts client-side.
// The page itself is still fully server-rendered for SEO — this only adds the event.
export default function ViewTracker({ event, props }) {
  useEffect(() => {
    track(event, props || {});
  }, [event, JSON.stringify(props)]);
  return null;
}
