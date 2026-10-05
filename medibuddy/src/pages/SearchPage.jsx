import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import useDebounce from '../hooks/useDebounce';
import useMedicineSearch from '../hooks/useMedicineSearch';
import MedicineCard from '../components/MedicineCard';
import { EmptyState, ErrorState, Spinner } from '../components/States';

export default function SearchPage() {
  const [params, setParams] = useSearchParams();
  const urlQuery = params.get('q') || '';

  const [text, setText] = useState(urlQuery);
  const debounced = useDebounce(text, 400);
  const [retryKey, setRetryKey] = useState(0);

  useEffect(() => {
    const next = debounced.trim();
    if (next !== urlQuery) {
      setParams(next ? { q: next } : {}, { replace: true });
    }
  }, [debounced, setParams, urlQuery]);

  const query = debounced.trim();
  const { status, results, error } = useMedicineSearch(query, retryKey);
  const typing = text.trim() !== query;
  const from = `/${urlQuery ? `?q=${encodeURIComponent(urlQuery)}` : ''}`;

  return (
    <>
      <form className="search" role="search" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="q" className="sr-only">Search by brand name</label>
        <input
          id="q"
          type="search"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Search by brand name, e.g. Advil"
          autoComplete="off"
          autoFocus
        />
      </form>

      <section aria-live="polite">
        {!query ? (
          <EmptyState title="Search for a medicine">
            Type a brand name such as Advil, Tylenol or Zyrtec.
          </EmptyState>
        ) : status === 'loading' ? (
          <Spinner label="Searching" />
        ) : status === 'error' ? (
          <ErrorState message={error} onRetry={() => setRetryKey((k) => k + 1)} />
        ) : status === 'success' && !results.length ? (
          <EmptyState title="No results found">
            Nothing matched “{query}”. Check the spelling or try another brand name.
          </EmptyState>
        ) : status === 'success' ? (
          <>
            <p className="count" style={{ opacity: typing ? 0.5 : 1 }}>
              {results.length} result{results.length === 1 ? '' : 's'} for “{query}”
            </p>
            <ul className="grid">
              {results.map((r) => (
                <MedicineCard key={r.id} item={r} from={from} />
              ))}
            </ul>
          </>
        ) : null}
      </section>
    </>
  );
}
