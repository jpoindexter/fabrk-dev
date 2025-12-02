import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  FileText,
  CheckCircle2,
  XCircle,
  Clock,
} from "lucide-react";
import { InvoicesClient } from "./invoices-client";

export const metadata = {
  title: "Invoices | Fabrk",
  description: "View and download your payment invoices and receipts",
};

export default async function InvoicesPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  // Fetch user's payments from database
  const payments = await prisma.payment.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 50, // Show last 50 payments
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "succeeded":
        return <Badge variant="default">Paid</Badge>;
      case "failed":
        return <Badge variant="outline">Failed</Badge>;
      default:
        return <Badge variant="secondary">Pending</Badge>;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount / 100);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(new Date(date));
  };

  return (
    <div className="container mx-auto max-w-6xl px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <Link href="/billing">
          <Button variant="ghost" size="sm" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Billing
          </Button>
        </Link>
        <h1 className="text-4xl font-semibold tracking-tight mb-2">Invoices & Receipts</h1>
        <p className="text-muted-foreground text-lg">
          View and download your payment history
        </p>
      </div>

      {/* Invoices Table */}
      {payments.length === 0 ? (
        <Card>
          <CardContent className="pt-6 text-center space-y-4">
            <FileText className="h-12 w-12 mx-auto text-muted-foreground" />
            <div>
              <h3 className="font-semibold mb-1">No invoices yet</h3>
              <p className="text-sm text-muted-foreground">
                Your payment history will appear here once you make a purchase
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Payment History</CardTitle>
            <CardDescription>
              Showing {payments.length} transaction{payments.length !== 1 ? "s" : ""}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Invoice</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell className="font-medium">
                      {formatDate(payment.createdAt)}
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">
                          {payment.productId || "One-time purchase"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Invoice #{payment.stripeId?.slice(-8)}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono">
                      {formatCurrency(payment.amount)}
                    </TableCell>
                    <TableCell>{getStatusBadge(payment.status)}</TableCell>
                    <TableCell className="text-right">
                      <InvoicesClient paymentId={payment.id} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Information Cards */}
      <div className="grid md:grid-cols-2 gap-6 mt-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Invoice Details
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <p>
              Each invoice includes:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Transaction date and amount</li>
              <li>Payment method used</li>
              <li>Invoice number for records</li>
              <li>Billing information</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5" />
              Email Receipts
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            <p>
              We automatically send email receipts for all successful payments. Check
              your inbox at <strong>{session.user.email}</strong> for copies of your
              receipts.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
