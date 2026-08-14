export default function VehicleDetailLoading() {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="h-4 bg-surface-dark rounded w-48 mb-6 animate-pulse" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="aspect-[16/10] rounded-xl bg-surface-dark animate-pulse" />
            <div className="space-y-4 animate-pulse">
              <div className="flex gap-3">
                <div className="h-8 w-20 bg-surface-dark rounded-lg" />
                <div className="h-8 w-20 bg-surface-dark rounded-lg" />
              </div>
              <div className="h-8 bg-surface-dark rounded w-2/3" />
              <div className="h-8 bg-surface-dark rounded w-1/3" />
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-16 bg-surface-card border border-surface-border rounded-lg" />
                ))}
              </div>
            </div>
            <div className="space-y-3 animate-pulse">
              <div className="h-6 bg-surface-dark rounded w-32" />
              <div className="w-16 h-1 bg-gold/30 rounded-full" />
              <div className="h-4 bg-surface-dark rounded w-full" />
              <div className="h-4 bg-surface-dark rounded w-5/6" />
              <div className="h-4 bg-surface-dark rounded w-4/6" />
            </div>
          </div>
          <div className="lg:col-span-1">
            <div className="bg-surface-card border border-surface-border rounded-xl p-6 space-y-4 animate-pulse">
              <div className="h-5 bg-surface-dark rounded w-3/4" />
              <div className="h-12 bg-surface-dark rounded-lg" />
              <div className="h-12 bg-surface-dark rounded-lg" />
              <div className="h-12 bg-surface-dark rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
