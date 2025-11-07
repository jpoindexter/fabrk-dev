import { Loader2 } from "lucide-react";

/**
 * Root Loading Component
 * Shown while pages are loading
 */
export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white">
      <div className="text-center">
        <Loader2 className="mx-auto h-12 w-12 animate-spin text-[#007AFF]" />
        <p className="mt-4 text-sm text-[#666666]">Loading...</p>
      </div>
    </div>
  );
}
