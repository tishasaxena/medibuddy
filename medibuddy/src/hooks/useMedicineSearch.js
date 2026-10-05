import { useEffect, useState } from 'react';
import { getCachedSearch, searchMedicines } from '../lib/api';

const IDLE = { status: 'idle', results: [], error: null };

export default function useMedicineSearch(query, retryKey = 0) {
  const [state, setState] = useState(() => {
    const cached = query && getCachedSearch(query);
    return cached ? { status: 'success', results: cached, error: null } : IDLE;
  });

  useEffect(() => {
    if (!query) {
      setState(IDLE);
      return;
    }

    const cached = getCachedSearch(query);
    if (cached) {
      setState({ status: 'success', results: cached, error: null });
      return;
    }

    const controller = new AbortController();
    setState((s) => ({ ...s, status: 'loading', error: null }));

    searchMedicines(query, controller.signal)
      .then((results) => setState({ status: 'success', results, error: null }))
      .catch((e) => {
        if (e.name === 'AbortError') return;
        setState({ status: 'error', results: [], error: e.message });
      });

    return () => controller.abort();
  }, [query, retryKey]);

  return state;
}
