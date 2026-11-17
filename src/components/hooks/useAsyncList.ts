import { useEffect, useRef, useState } from "react";

/**
 * Fetch-on-mount/dependency-change with loading + error state, so a
 * rejected promise surfaces an error instead of leaving `data` at `null`
 * (and whatever skeleton that gates) forever. Re-fetches whenever `deps`
 * changes, or when `refresh()` is called manually (e.g. after a mutation).
 *
 * Each result is stored with the deps + refresh count it was fetched for. A
 * result for older deps is treated as "still loading" (data and error null),
 * so changing deps shows the loading state at once without setting state
 * synchronously inside the effect.
 */
export function useAsyncList<T>(
  fetcher: () => Promise<T>,
  deps: React.DependencyList
): { data: T | null; error: string | null; refresh: () => void } {
  const [tick, setTick] = useState(0);
  const [result, setResult] = useState<{
    deps: React.DependencyList;
    tick: number;
    data: T | null;
    error: string | null;
  } | null>(null);

  // Ref so the effect below only re-runs on `deps`/`tick`, not on every
  // render caused by an inline fetcher function identity changing. Assigned
  // in its own effect (not during render) — it always runs before the effect
  // further down, since effects commit in declaration order.
  const fetcherRef = useRef(fetcher);
  useEffect(() => {
    fetcherRef.current = fetcher;
  });

  useEffect(() => {
    let cancelled = false;
    const forDeps = deps;
    const forTick = tick;
    fetcherRef
      .current()
      .then((data) => {
        if (!cancelled) setResult({ deps: forDeps, tick: forTick, data, error: null });
      })
      .catch(() => {
        if (!cancelled) setResult({ deps: forDeps, tick: forTick, data: null, error: "Couldn't load this. Please try again." });
      });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, tick]);

  const current =
    result !== null &&
    result.tick === tick &&
    result.deps.length === deps.length &&
    result.deps.every((d, i) => Object.is(d, deps[i]));

  return {
    data: current ? result.data : null,
    error: current ? result.error : null,
    refresh: () => setTick((t) => t + 1),
  };
}
