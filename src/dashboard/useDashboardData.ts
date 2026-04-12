import { useState, useEffect } from 'react';
import { parseDateTxt } from './parseData';
import type { DashboardData } from './types';

export function useDashboardData() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    fetch('/a14u/news/date.txt')
      .then(r => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.text();
      })
      .then(text => {
        if (alive) { setData(parseDateTxt(text)); setLoading(false); }
      })
      .catch(err => {
        if (alive) { setError(err.message); setLoading(false); }
      });
    return () => { alive = false; };
  }, []);

  return { data, loading, error };
}
