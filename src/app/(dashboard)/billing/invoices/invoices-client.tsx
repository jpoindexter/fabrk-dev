"use client";

import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { toast } from "sonner";

interface InvoicesClientProps {
  paymentId: string;
}

export function InvoicesClient({ paymentId }: InvoicesClientProps) {
  const handleDownload = async () => {
    // TODO: Generate and download invoice PDF
    toast.info("Invoice download feature coming soon");
  };

  return (
    <Button variant="ghost" size="sm" onClick={handleDownload}>
      <Download className="h-4 w-4 mr-2" />
      Download
    </Button>
  );
}
