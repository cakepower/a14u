import React, { useEffect, useMemo, useState } from "react";

type ImageItem = {
  filename: string;
  relative_url?: string;
  url?: string;
  bytes?: number;
  mtime?: string;
};

type ApiResponse = {
  count: number;
  offset: number;
  limit: number;
  results: ImageItem[];
};

function formatBytes(bytes?: number) {
  if (bytes == null) return "";
  const units = ["B", "KB", "MB", "GB"];
  let size = bytes;
  let i = 0;
  while (size >= 1024 && i < units.length - 1) {
    size = size / 1024;
    i += 1;
  }
  return `${size.toFixed(i === 0 ? 0 : 1)} ${units[i]}`;
}

function formatDate(iso?: string) {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleString();
}

export default function GeneratedImagesGallery() {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // 페이지네이션/정렬
  const [limit, setLimit] = useState<number>(12);
  const [offset, setOffset] = useState<number>(0);
  const [sort, setSort] = useState<string>("-mtime");
  
  // 모달(큰 보기)
  const [selected, setSelected] = useState<ImageItem | null>(null);

  const queryString = useMemo(() => {
    const qs = new URLSearchParams({
      limit: String(limit),
      offset: String(offset),
      sort,
    });
    return qs.toString();
  }, [limit, offset, sort]);

  useEffect(() => {
    let cancelled = false;
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);

    async function fetchImages() {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`/api/generated-images?${queryString}`, {
          method: "GET",
          headers: { Accept: "application/json" },
          credentials: "same-origin",
        });

        if (!res.ok) {
          const text = await res.text().catch(() => "");
          throw new Error(`API ${res.status} ${res.statusText}${text ? ` - ${text}` : ""}`);
        }

        const json = (await res.json()) as ApiResponse;
        if (!cancelled) setData(json);
      } catch (e: any) {
        if (!cancelled) setError(e?.message ?? "Failed to fetch images.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchImages();
    return () => {
      cancelled = true;
      window.removeEventListener('resize', handleResize);
    };
  }, [queryString]);

  const results = data?.results ?? [];
  const total = data?.count ?? 0;

  const canPrev = offset > 0;
  const canNext = offset + limit < total;
  const [loaded, setLoaded] = React.useState(false);

  // 같은 도메인이면 relative_url 우선 사용 (없으면 url fallback)
  const resolveSrc = (item: ImageItem) => item.relative_url ?? item.url ?? "";

  return (
    <div style={{ padding: 16, maxWidth: 1200, margin: "0 auto" }}>
      {!isMobile && ( <h2 style={{ marginBottom: 12 }}>Generated Images</h2> )}

      {/* Controls */}
      {!isMobile && (
      <div
        style={{
          display: "flex",
          gap: 12,
          flexWrap: "wrap",
          alignItems: "center",
          marginBottom: 12,
        }}
      >
        <label>
          Sort&nbsp;
          <select value={sort} onChange={(e) => { setOffset(0); setSort(e.target.value); }}>
            <option value="-mtime">Newest</option>
            <option value="mtime">Oldest</option>
            <option value="name">Name A→Z</option>
            <option value="-name">Name Z→A</option>
          </select>
        </label>

        <label>
          Page size&nbsp;
          <select value={limit} onChange={(e) => { setOffset(0); setLimit(Number(e.target.value)); }}>
            <option value={8}>8</option>
            <option value={30}>30</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </label>

        <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
          <button
            onClick={() => setOffset((o) => Math.max(0, o - limit))}
            disabled={!canPrev || loading}
          >
            Prev
          </button>
          <button
            onClick={() => setOffset((o) => o + limit)}
            disabled={!canNext || loading}
          >
            Next
          </button>
        </div>
      </div>
      )}

      {/* Status */}
      <div style={{ marginBottom: 12 }}>
        {loading && <div>Loading...</div>}
        {error && <div style={{ color: "crimson" }}>{error}</div>}
        {!loading && !error && (
          <div style={{ display: 'none', color: "#555" }}>
            Showing {Math.min(total, offset + 1)}–{Math.min(total, offset + results.length)} of {total}
          </div>
        )}
      </div>

      {/* Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: 12,
        }}
      >
        {results.map((item, index) => {
          const src = resolveSrc(item);
          const eagerCount = isMobile ? 1 : 8;
          const isEager = index < eagerCount;
          const isHighPriority = index < 6;
          return (
            <div
              key={item.filename}
              style={{
                border: "1px solid #ddd",
                borderRadius: 12,
                overflow: "hidden",
                background: "#fff",
                cursor: "pointer",
              }}
              onClick={() => setSelected(item)}
              title={item.filename}
            >
              <div style={{ aspectRatio: 1, background: "#f3f3f3" }}>
                {src ? (
                  <img
                    src={src}
                    alt={item.alt ?? item.filename}
                    loading={isEager ? "eager" : "lazy"}
                    fetchPriority={isHighPriority ? "high" : "auto"}
                    decoding="async"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                      opacity: loaded ? 1 : 0,
                      transition: "opacity 220ms ease",
                      background: "rgba(255,255,255,0.04)",
                    }}
                    onLoad={() => setLoaded(true)}
                    onError={(e) => {
                      // 이미지가 깨지는 경우를 빠르게 확인하기 위해 콘솔 로그
                      console.warn("Image load failed:", item.filename, src);
                      (e.currentTarget as HTMLImageElement).style.opacity = "0.3";
                    }}
                  />
                ) : (
                  <div style={{ padding: 12, color: "#666" }}>No URL</div>
                )}
              </div>

              <div style={{ padding: 10 }}>
                <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 6 }}>
                  {item.filename}
                </div>
                <div style={{ fontSize: 12, color: "#666" }}>
                  {formatBytes(item.bytes)}
                </div>
                <div style={{ fontSize: 12, color: "#666" }}>
                  {formatDate(item.mtime)}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty */}
      {!loading && !error && results.length === 0 && (
        <div style={{ marginTop: 20, color: "#666" }}>
          No images found in media/generated_images.
        </div>
      )}

      {/* Modal */}
      {selected && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setSelected(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.55)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 16,
            zIndex: 1000,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#fff",
              borderRadius: 12,
              maxWidth: 1100,
              width: "100%",
              maxHeight: "90vh",
              overflow: "auto",
              padding: 12,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <div style={{ fontWeight: 700 }}>{selected.filename}</div>
              <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
                <button onClick={() => setSelected(null)}>Close</button>
              </div>
            </div>

            <div style={{ background: "#f3f3f3", borderRadius: 10, overflow: "hidden" }}>
              <img
                src={resolveSrc(selected)}
                alt={selected.filename}
                onClick={() => setSelected(null)}
                style={{ width: "60%", height: "auto", display: "block" }}
              />
            </div>

            <div style={{ padding: "10px 2px", fontSize: 13, color: "#444" }}>
              <div>Size: {formatBytes(selected.bytes)}</div>
              <div>Modified: {formatDate(selected.mtime)}</div>
              <div style={{ wordBreak: "break-all" }}>
                URL: {resolveSrc(selected)}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
