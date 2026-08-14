function SkeletonCard() {
  return (
    <div className="bg-surface-card border border-surface-border rounded-xl overflow-hidden animate-pulse">
      <div className="aspect-[4/3] bg-surface-dark" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-surface-dark rounded w-3/4" />
        <div className="h-3 bg-surface-dark rounded w-1/2" />
        <div className="h-5 bg-surface-dark rounded w-1/3" />
      </div>
    </div>
  );
}

export default function InventoryLoading() {
  return (
    <section className="min-h-screen bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="mb-8 animate-pulse">
          <div className="h-9 bg-surface-dark rounded w-64 mb-3" />
          <div className="w-20 h-1 bg-gold/30 rounded-full mb-3" />
          <div className="h-4 bg-surface-dark rounded w-40" />
        </div>
        <div className="flex gap-8">
          <aside className="hidden lg:block w-72 flex-shrink-0">
            <div className="bg-surface-card border border-surface-border rounded-xl p-5 space-y-4 animate-pulse">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="space-y-2 pb-4 border-b border-surface-border">
                  <div className="h-4 bg-surface-dark rounded w-20" />
                  <div className="h-3 bg-surface-dark rounded w-full" />
                  <div className="h-3 bg-surface-dark rounded w-3/4" />
                </div>
              ))}
            </div>
          </aside>
          <div className="flex-1 min-w-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {Array.from({ length: 6 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
