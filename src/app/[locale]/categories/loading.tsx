export default function CategoriesLoading() {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="text-center mb-14 animate-pulse">
          <div className="h-10 bg-surface-dark rounded w-72 mx-auto mb-4" />
          <div className="h-4 bg-surface-dark rounded w-64 mx-auto" />
          <div className="w-20 h-1 bg-gold/30 mx-auto rounded-full mt-6" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="bg-surface-card border border-surface-border rounded-2xl p-8 animate-pulse">
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-surface-dark" />
                <div className="h-5 bg-surface-dark rounded w-24" />
                <div className="h-3 bg-surface-dark rounded w-36" />
                <div className="h-7 bg-surface-dark rounded-full w-32" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
