import { AlertTriangle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function MaintenancePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-6">
      <div className="mx-auto max-w-2xl text-center">
        {/* Maintenance Icon */}
        <div className="mb-8 flex justify-center">
          <div className="rounded-full bg-yellow-100 p-6">
            <AlertTriangle className="h-16 w-16 text-yellow-600" />
          </div>
        </div>

        {/* Maintenance Message */}
        <h1 className="mb-4 text-4xl font-bold text-black">
          Scheduled Maintenance
        </h1>
        <p className="mb-8 text-lg text-[#666666]">
          We're performing scheduled maintenance to improve your experience.
          We'll be back shortly.
        </p>

        {/* Estimated Time */}
        <div className="mb-8 inline-flex items-center gap-2 rounded-lg bg-[#F7F7F7] px-6 py-3">
          <Clock className="h-5 w-5 text-[#666666]" />
          <span className="text-sm font-semibold text-black">
            Expected downtime: ~15 minutes
          </span>
        </div>

        {/* Status Updates */}
        <div className="mb-8">
          <p className="mb-4 text-sm text-[#666666]">
            Want to stay updated?
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href="https://discord.gg/fabrk"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-[#007AFF] hover:underline"
            >
              Join Discord for live updates
            </a>
            <span className="text-[#CCCCCC]">•</span>
            <a
              href="https://twitter.com/fabrk"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-[#007AFF] hover:underline"
            >
              Follow us on Twitter
            </a>
          </div>
        </div>

        {/* What's Being Improved */}
        <div className="mt-12 rounded-lg border border-black/10 bg-[#F7F7F7] p-8 text-left">
          <h3 className="mb-4 text-lg font-bold text-black">
            What we're working on:
          </h3>
          <ul className="space-y-2 text-sm text-[#666666]">
            <li className="flex items-start gap-2">
              <span className="mt-1 text-[#007AFF]">•</span>
              <span>Database performance optimizations</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 text-[#007AFF]">•</span>
              <span>Security updates</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 text-[#007AFF]">•</span>
              <span>New features coming soon</span>
            </li>
          </ul>
        </div>

        {/* Contact Support */}
        <div className="mt-12 border-t border-black/10 pt-8">
          <p className="mb-2 text-sm text-[#666666]">
            Urgent issue? Contact support:
          </p>
          <a
            href="mailto:support@fabrk.dev"
            className="text-sm font-semibold text-[#007AFF] hover:underline"
          >
            support@fabrk.dev
          </a>
        </div>
      </div>
    </div>
  );
}
