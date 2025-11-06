import { Check, X } from "lucide-react";

export function ComparisonSection() {
  const comparisons = [
    { feature: "Time to Launch", diy: "3-4 weeks", shipfast: "Days", supastarter: "Days", fabrk: "Hours" },
    { feature: "Price", diy: "$0", shipfast: "$199", supastarter: "$349", fabrk: "$79" },
    { feature: "TypeScript", diy: true, shipfast: false, supastarter: true, fabrk: true },
    { feature: "Database", diy: "Your choice", shipfast: "MongoDB", supastarter: "PostgreSQL", fabrk: "PostgreSQL" },
    { feature: "File Count", diy: "1000+", shipfast: "500+", supastarter: "800+", fabrk: "161" },
    { feature: "Components", diy: "0", shipfast: "30-50", supastarter: "100+", fabrk: "80+" },
    { feature: "Next.js Version", diy: "15", shipfast: "13/14", supastarter: "14", fabrk: "15" },
    { feature: "Data Table", diy: false, shipfast: true, supastarter: true, fabrk: true },
    { feature: "Updates", diy: "None", shipfast: "Lifetime", supastarter: "Lifetime", fabrk: "Lifetime" },
  ];

  const renderCell = (value: string | boolean) => {
    if (typeof value === "boolean") {
      return value ? (
        <Check className="mx-auto h-5 w-5 text-green-600" strokeWidth={3} />
      ) : (
        <X className="mx-auto h-5 w-5 text-red-500" strokeWidth={3} />
      );
    }
    return <span className="text-sm font-medium text-[#333333]">{value}</span>;
  };

  return (
    <section className="bg-white px-6 py-24">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold text-black">
            How Fabrk Stacks Up
          </h2>
          <p className="text-lg text-[#666666]">
            We're not just cheaper—we're better.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            {/* Header Row */}
            <thead>
              <tr className="border-b-2 border-black">
                <th className="p-4 text-left">
                  <span className="text-sm font-semibold text-[#666666]">Feature</span>
                </th>
                <th className="p-4 text-center">
                  <span className="text-sm font-semibold text-[#666666]">DIY</span>
                </th>
                <th className="p-4 text-center">
                  <span className="text-sm font-semibold text-[#666666]">ShipFast</span>
                </th>
                <th className="p-4 text-center">
                  <span className="text-sm font-semibold text-[#666666]">Supastarter</span>
                </th>
                <th className="bg-[#007AFF]/5 p-4 text-center">
                  <span className="text-sm font-bold text-[#007AFF]">Fabrk</span>
                </th>
              </tr>
            </thead>

            {/* Body Rows */}
            <tbody>
              {comparisons.map((row, idx) => (
                <tr
                  key={idx}
                  className="border-b border-black/10 transition-colors hover:bg-[#F7F7F7]"
                >
                  <td className="p-4">
                    <span className="text-sm font-semibold text-black">{row.feature}</span>
                  </td>
                  <td className="p-4 text-center">{renderCell(row.diy)}</td>
                  <td className="p-4 text-center">{renderCell(row.shipfast)}</td>
                  <td className="p-4 text-center">{renderCell(row.supastarter)}</td>
                  <td className="bg-[#007AFF]/5 p-4 text-center font-bold">
                    {renderCell(row.fabrk)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* CTA Below Table */}
        <div className="mt-12 text-center">
          <p className="mb-4 text-lg text-[#333333]">
            <span className="font-bold text-black">60-77% cheaper</span> than competitors.
            <span className="ml-2">Same quality. Better stack.</span>
          </p>
          <a
            href="#pricing"
            className="inline-block rounded-lg bg-[#007AFF] px-8 py-3 text-lg font-semibold text-white shadow-lg transition-all hover:bg-[#0066CC] hover:shadow-xl"
          >
            Get Started - $79
          </a>
        </div>
      </div>
    </section>
  );
}
