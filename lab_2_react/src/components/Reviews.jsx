import { useEffect, useState } from 'react';

// Номер варіанта = порядковий номер у журналі групи
const VARIANT = 18;
const API_URL = `https://jsonplaceholder.typicode.com/posts/${VARIANT}/comments`;

function Reviews() {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Запит виконується один раз при монтуванні ([] — порожній масив залежностей)
    const controller = new AbortController();

    fetch(API_URL, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json();
      })
      .then((data) => setComments(data))
      .catch((err) => {
        if (err.name !== 'AbortError') setError(err.message);
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, []);

  return (
    <section
      id="reviews"
      className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-lg shadow-black/30"
    >
      <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-white">
        <span className="font-mono text-brand-400">05.</span> Відгуки роботодавців
      </h2>

      {loading && <p className="text-slate-400">Завантаження відгуків…</p>}
      {error && (
        <p role="alert" className="text-red-400">
          Не вдалося завантажити відгуки: {error}
        </p>
      )}

      <div className="space-y-4">
        {comments.map((comment) => (
          <article
            key={comment.id}
            className="rounded-xl border border-slate-800 bg-slate-950/60 p-5 transition duration-300 hover:border-brand-500/60 hover:shadow-xl hover:shadow-brand-500/10"
          >
            <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
              <h3 className="text-lg font-semibold capitalize text-white">{comment.name}</h3>
              <span className="shrink-0 rounded-full bg-brand-500/15 px-3 py-0.5 font-mono text-xs text-brand-300">
                {comment.email}
              </span>
            </div>
            <p className="mt-3 leading-relaxed text-slate-300">{comment.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Reviews;
