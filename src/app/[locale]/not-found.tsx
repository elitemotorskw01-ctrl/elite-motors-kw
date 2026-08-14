import { Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className="text-8xl font-bold text-gold mb-2">404</h1>
        <div className="w-20 h-1 bg-gold mx-auto rounded-full mb-6" />
        <div className="w-20 h-20 rounded-full bg-surface-card border border-surface-border flex items-center justify-center mx-auto mb-6">
          <Search size={36} className="text-text-secondary" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-3">Page Not Found</h2>
        <p className="text-text-secondary mb-8 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get you back on track.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="/"
            className="px-6 py-2.5 bg-gold text-black font-semibold rounded-lg hover:bg-gold-dark transition-colors text-sm"
          >
            Back to Home
          </a>
          <a
            href="/en/inventory"
            className="px-6 py-2.5 border border-surface-border text-text-secondary rounded-lg hover:border-gold/50 hover:text-white transition-colors text-sm"
          >
            Browse Inventory
          </a>
        </div>
      </div>
    </div>
  );
}
