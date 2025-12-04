/**
 * FABRK COMPONENT
 * Pagination - Page navigation controls
 */

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StyledCardHeader } from "@/components/ui/card";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="border-border bg-card border">
      <StyledCardHeader code="0x00" title="PAGINATION" />
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="text-muted-foreground font-mono text-xs">
            [PAGE]: {currentPage} OF {totalPages}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="h-8 rounded-none font-mono text-xs"
            >
              <ChevronLeft className="mr-1 h-3 w-3" />
              PREV
            </Button>
            <div className="flex gap-1">
              {pages.map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => onPageChange(page)}
                  className="h-8 w-8 rounded-none p-0 font-mono text-xs"
                >
                  {page}
                </Button>
              ))}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="h-8 rounded-none font-mono text-xs"
            >
              NEXT
              <ChevronRight className="ml-1 h-3 w-3" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
