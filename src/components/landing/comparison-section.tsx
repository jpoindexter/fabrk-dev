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
          <h2 className="mb-4 text-3xl font-semibold text-foreground">
            Why Build From Scratch?
          </h2>
          <p className="text-lg font-normal text-muted-foreground">
            See how much time and effort Fabrk saves you
          </p>
        </div>

        <div className="overflow-hidden rounded-lg border border-border bg-card shadow-sm">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-background">
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                  Feature
                </th>
                <th className="border-l border-border px-6 py-4 text-center text-sm font-semibold text-foreground">
                  Manual Setup
                </th>
                <th className="border-l border-border bg-primary/5 px-6 py-4 text-center text-sm font-semibold text-primary">
                  Fabrk
                </th>
              </tr>
            </thead>
            <tbody>
              {features.map((feature, index) => (
                <tr
                  key={index}
                  className="border-b border-border transition-colors hover:bg-background bg-background"
                >
                  <td className="px-6 py-4 text-sm font-normal text-foreground">
                    <div className="font-medium">{feature.name}</div>
                    <div className="mt-1 text-xs font-normal text-muted-foreground">
                      Time: {feature.time}
                    </div>
                  </td>
                  <td className="border-l border-border px-6 py-4 text-center">
                    {feature.manual ? (
                      <Check className="inline-block h-5 w-5 text-success" />
                    ) : (
                      <X className="inline-block h-5 w-5 text-destructive" />
                    )}
                  </td>
                  <td className="border-l border-border bg-primary/5 px-6 py-4 text-center">
                    {feature.fabrk ? (
                      <Check className="inline-block h-5 w-5 text-primary" />
                    ) : (
                      <X className="inline-block h-5 w-5 text-destructive" />
                    )}
                  </td>
                </tr>
              ))}
              <tr className="border-t border-border bg-background">
                <td className="px-6 py-4 text-sm font-semibold text-foreground">
                  Total Time Investment
                </td>
                <td className="border-l border-border px-6 py-4 text-center text-base font-semibold text-destructive">
                  73+ hours
                </td>
                <td className="border-l border-border bg-primary/10 px-6 py-4 text-center text-base font-semibold text-primary">
                  0 hours
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm font-normal text-muted-foreground">
            Start building your unique features on day one. Skip the boring
            boilerplate.
          </p>
        </div>
      </div>
    </section>
  );
}
