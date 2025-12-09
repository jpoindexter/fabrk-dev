'use client';

import { ComponentShowcaseTemplate } from '@/components/docs';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function TablePage() {
  return (
    <ComponentShowcaseTemplate
      code="[UI.25]"
      title="Table"
      description="A semantic table component with header, body, footer, and caption support for displaying structured data."
      importCode={`import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";`}
      mainPreview={{
        preview: (
          <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Invoice</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Method</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">INV001</TableCell>
                <TableCell>Paid</TableCell>
                <TableCell>Credit Card</TableCell>
                <TableCell className="text-right">$250.00</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">INV002</TableCell>
                <TableCell>Pending</TableCell>
                <TableCell>PayPal</TableCell>
                <TableCell className="text-right">$150.00</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">INV003</TableCell>
                <TableCell>Unpaid</TableCell>
                <TableCell>Bank Transfer</TableCell>
                <TableCell className="text-right">$350.00</TableCell>
              </TableRow>
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={3}>Total</TableCell>
                <TableCell className="text-right">$750.00</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        ),
        code: `<Table>
  <TableCaption>A list of your recent invoices.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead>Invoice</TableHead>
      <TableHead>Status</TableHead>
      <TableHead>Method</TableHead>
      <TableHead className="text-right">Amount</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell className="font-medium">INV001</TableCell>
      <TableCell>Paid</TableCell>
      <TableCell>Credit Card</TableCell>
      <TableCell className="text-right">$250.00</TableCell>
    </TableRow>
    {/* More rows... */}
  </TableBody>
  <TableFooter>
    <TableRow>
      <TableCell colSpan={3}>Total</TableCell>
      <TableCell className="text-right">$750.00</TableCell>
    </TableRow>
  </TableFooter>
</Table>`,
      }}
      variants={[
        {
          title: 'Simple Table',
          description: 'Basic table without caption or footer',
          preview: (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>John Doe</TableCell>
                  <TableCell>john@example.com</TableCell>
                  <TableCell>Admin</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Jane Smith</TableCell>
                  <TableCell>jane@example.com</TableCell>
                  <TableCell>User</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Bob Johnson</TableCell>
                  <TableCell>bob@example.com</TableCell>
                  <TableCell>Editor</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          ),
          code: `<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Email</TableHead>
      <TableHead>Role</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>John Doe</TableCell>
      <TableCell>john@example.com</TableCell>
      <TableCell>Admin</TableCell>
    </TableRow>
  </TableBody>
</Table>`,
        },
        {
          title: 'Selected Rows',
          description: 'Highlight specific rows using data-state',
          preview: (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Laptop</TableCell>
                  <TableCell>$999</TableCell>
                  <TableCell>15</TableCell>
                </TableRow>
                <TableRow data-state="selected">
                  <TableCell>Keyboard</TableCell>
                  <TableCell>$79</TableCell>
                  <TableCell>42</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Mouse</TableCell>
                  <TableCell>$29</TableCell>
                  <TableCell>103</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          ),
          code: `<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Product</TableHead>
      <TableHead>Price</TableHead>
      <TableHead>Stock</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow data-state="selected">
      <TableCell>Keyboard</TableCell>
      <TableCell>$79</TableCell>
      <TableCell>42</TableCell>
    </TableRow>
  </TableBody>
</Table>`,
        },
        {
          title: 'Responsive Table',
          description: 'Scrollable table container for mobile',
          preview: (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">#ORD-001</TableCell>
                  <TableCell>Alice Cooper</TableCell>
                  <TableCell>Premium Plan</TableCell>
                  <TableCell>1</TableCell>
                  <TableCell>Completed</TableCell>
                  <TableCell className="text-right">$99.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">#ORD-002</TableCell>
                  <TableCell>Bob Dylan</TableCell>
                  <TableCell>Starter Plan</TableCell>
                  <TableCell>2</TableCell>
                  <TableCell>Processing</TableCell>
                  <TableCell className="text-right">$98.00</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          ),
          code: `<Table>
  <TableHeader>
    <TableRow>
      <TableHead>ID</TableHead>
      <TableHead>Customer</TableHead>
      <TableHead>Product</TableHead>
      <TableHead>Quantity</TableHead>
      <TableHead>Status</TableHead>
      <TableHead className="text-right">Total</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {/* Rows with horizontal scroll on mobile */}
  </TableBody>
</Table>`,
        },
      ]}
      props={[
        {
          name: 'className',
          type: 'string',
          description: 'Additional CSS classes',
        },
      ]}
      accessibility={[
        'Uses semantic HTML table elements (table, thead, tbody, tfoot)',
        "TableHead elements have scope='col' by default for screen readers",
        'TableCaption provides accessible description of table content',
        'Responsive wrapper prevents horizontal overflow on mobile',
        'Hover states on rows improve visual feedback',
        'Selected rows use data-state attribute for styling',
      ]}
      previous={{ title: 'Tooltip', href: '/docs/components/tooltip' }}
      next={{ title: 'Empty State', href: '/docs/components/empty-state' }}
    />
  );
}
