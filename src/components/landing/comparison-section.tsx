import { Check, X } from "lucide-react";

export function ComparisonSection() {
  const features = [
    {
      name: "Authentication (Email + OAuth)",
      manual: false,
      fabrk: true,
      time: "8 hours",
    },
    {
      name: "Stripe Payments Integration",
      manual: false,
      fabrk: true,
      time: "12 hours",
    },
    {
      name: "Database Schema + ORM",
      manual: false,
      fabrk: true,
      time: "6 hours",
    },
    {
      name: "Email System (Templates + Sending)",
      manual: false,
      fabrk: true,
      time: "4 hours",
    },
    {
      name: "25+ UI Components",
      manual: false,
      fabrk: true,
      time: "20 hours",
    },
    {
      name: "TypeScript Configuration",
      manual: false,
      fabrk: true,
      time: "3 hours",
    },
    {
      name: "Dashboard Templates",
      manual: false,
      fabrk: true,
      time: "8 hours",
    },
    {
      name: "Dark Mode + Theme System",
      manual: false,
      fabrk: true,
      time: "5 hours",
    },
    {
      name: "Security Best Practices",
      manual: false,
      fabrk: true,
      time: "4 hours",
    },
    {
      name: "Production Deployment Config",
      manual: false,
      fabrk: true,
      time: "3 hours",
    },
  ];

  return (
    <section className="bg-background px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-black text-foreground">
            Why Build From Scratch?
          </h2>
          <p className="text-lg font-bold text-muted-foreground">
            See how much time and effort Fabrk saves you
          </p>
        </div>

        <div className="overflow-hidden rounded-brutal border-2 border-brutal bg-white shadow-brutal">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-brutal bg-muted">
                <th className="px-6 py-4 text-left text-sm font-black uppercase tracking-wide text-foreground">
                  Feature
                </th>
                <th className="border-l-2 border-brutal px-6 py-4 text-center text-sm font-black uppercase tracking-wide text-foreground">
                  Manual Setup
                </th>
                <th className="border-l-2 border-brutal bg-primary px-6 py-4 text-center text-sm font-black uppercase tracking-wide text-primary-foreground">
                  Fabrk
                </th>
              </tr>
            </thead>
            <tbody>
              {features.map((feature, index) => (
                <tr
                  key={index}
                  className={`border-b-2 border-brutal transition-colors hover:bg-muted/50 ${
                    index % 2 === 0 ? "bg-background" : "bg-muted/20"
                  }`}
                >
                  <td className="px-6 py-4 text-sm font-bold text-foreground">
                    <div>{feature.name}</div>
                    <div className="mt-1 text-xs font-bold text-muted-foreground">
                      Time: {feature.time}
                    </div>
                  </td>
                  <td className="border-l-2 border-brutal px-6 py-4 text-center">
                    {feature.manual ? (
                      <Check className="inline-block h-6 w-6 text-green-600" />
                    ) : (
                      <X className="inline-block h-6 w-6 text-red-600" />
                    )}
                  </td>
                  <td className="border-l-2 border-brutal bg-primary/5 px-6 py-4 text-center">
                    {feature.fabrk ? (
                      <Check className="inline-block h-6 w-6 text-primary" />
                    ) : (
                      <X className="inline-block h-6 w-6 text-red-600" />
                    )}
                  </td>
                </tr>
              ))}
              <tr className="border-t-2 border-brutal bg-muted">
                <td className="px-6 py-4 text-sm font-black uppercase text-foreground">
                  Total Time Investment
                </td>
                <td className="border-l-2 border-brutal px-6 py-4 text-center text-lg font-black text-red-600">
                  73+ hours
                </td>
                <td className="border-l-2 border-brutal bg-primary px-6 py-4 text-center text-lg font-black text-primary-foreground">
                  0 hours
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm font-bold text-muted-foreground">
            Start building your unique features on day one. Skip the boring
            boilerplate.
          </p>
        </div>
      </div>
    </section>
  );
}
