"use client";

import { AlertTriangle } from "lucide-react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center mx-auto mb-6">
          <AlertTriangle size={36} className="text-red-400" />
        </div>
        <h1 className="text-2xl font-bold text-white mb-3">Something went wrong</h1>
        <p className="text-text-secondary mb-8 leading-relaxed">
          An unexpected error occurred. Please try again or return to the homepage.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={reset}
            className="px-6 py-2.5 bg-gold text-black font-semibold rounded-lg hover:bg-gold-dark transition-colors text-sm"
          >
            Try Again
          </button>
          <a
            href="/"
            className="px-6 py-2.5 border border-surface-border text-text-secondary rounded-lg hover:border-gold/50 hover:text-white transition-colors text-sm"
          >
            Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}
