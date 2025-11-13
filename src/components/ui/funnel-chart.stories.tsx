import type { Meta, StoryObj } from "@storybook/react";
import { FunnelChart } from "./funnel-chart";

const meta: Meta<typeof FunnelChart> = {
  title: "UI/FunnelChart",
  component: FunnelChart,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof FunnelChart>;

const salesFunnelData = [
  { label: "Visitors", value: 10000 },
  { label: "Product Views", value: 5000 },
  { label: "Add to Cart", value: 2000 },
  { label: "Checkout", value: 800 },
  { label: "Purchase", value: 500 },
];

const leadFunnelData = [
  { label: "Website Visits", value: 50000 },
  { label: "Sign Ups", value: 5000 },
  { label: "Qualified Leads", value: 1000 },
  { label: "Demos Scheduled", value: 300 },
  { label: "Deals Closed", value: 50 },
];

export const Default: Story = {
  args: {
    data: salesFunnelData,
  },
};

export const WithoutPercentages: Story = {
  args: {
    data: salesFunnelData,
    showPercentages: false,
  },
};

export const SalesFunnel: Story = {
  render: () => (
    <div className="w-[700px] p-6 rounded-brutal border-brutal bg-card">
      <h3 className="font-bold text-center mb-6">E-commerce Sales Funnel</h3>
      <FunnelChart data={salesFunnelData} width={600} height={400} />
      <div className="mt-6 pt-4 border-t-2 border-brutal grid grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-muted-foreground">Overall Conversion</p>
          <p className="text-2xl font-black">5%</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Total Revenue</p>
          <p className="text-2xl font-black">$45,000</p>
        </div>
      </div>
    </div>
  ),
};

export const LeadGeneration: Story = {
  render: () => (
    <div className="w-[700px] p-6 rounded-brutal border-brutal bg-card">
      <h3 className="font-bold text-center mb-6">B2B Lead Generation Funnel</h3>
      <FunnelChart data={leadFunnelData} width={600} height={450} />
      <div className="mt-6 pt-4 border-t-2 border-brutal">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-xs text-muted-foreground">Lead-to-Demo</p>
            <p className="text-lg font-black">30%</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Demo-to-Close</p>
            <p className="text-lg font-black">16.7%</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Overall</p>
            <p className="text-lg font-black">0.1%</p>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const MarketingFunnel: Story = {
  render: () => {
    const marketingData = [
      { label: "Impressions", value: 1000000 },
      { label: "Clicks", value: 50000 },
      { label: "Landing Page", value: 30000 },
      { label: "Sign Up", value: 3000 },
      { label: "Active Users", value: 1500 },
    ];

    return (
      <div className="w-[700px] p-6 rounded-brutal border-brutal bg-card">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold">Campaign Performance</h3>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">CTR:</span>
            <span className="text-sm font-bold">5%</span>
          </div>
        </div>
        <FunnelChart data={marketingData} width={600} height={400} />
      </div>
    );
  },
};

export const SmallFunnel: Story = {
  render: () => (
    <div className="w-[400px] p-4 rounded-brutal border-brutal bg-card">
      <h3 className="font-bold text-sm text-center mb-4">Checkout Flow</h3>
      <FunnelChart
        data={[
          { label: "Cart", value: 1000 },
          { label: "Shipping", value: 750 },
          { label: "Payment", value: 600 },
          { label: "Complete", value: 550 },
        ]}
        width={350}
        height={250}
        showPercentages={false}
      />
    </div>
  ),
};
