"use client";

import { ComponentShowcaseTemplate } from "@/components/docs";
import { Progress } from "@/components/ui/progress";
import { useState, useEffect } from "react";

export default function ProgressPage() {
  // For demo purposes
  const [progress, setProgress] = useState(13);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ComponentShowcaseTemplate
      code="[UI.16]"
      category="Components"
      title="Progress"
      description="Displays an indicator showing the completion progress of a task, typically displayed as a progress bar."
      importCode={`import { Progress } from "@/components/ui/progress"`}
      mainPreview={{
        preview: <Progress value={66} />,
        code: `<Progress value={66} />`,
      }}
      variants={[
        {
          title: "0% Complete",
          description: "Progress bar at 0%, showing the starting state.",
          preview: <Progress value={0} />,
          code: `<Progress value={0} />`,
        },
        {
          title: "25% Complete",
          description: "Progress bar at 25% completion.",
          preview: <Progress value={25} />,
          code: `<Progress value={25} />`,
        },
        {
          title: "50% Complete",
          description: "Progress bar at 50% completion, halfway done.",
          preview: <Progress value={50} />,
          code: `<Progress value={50} />`,
        },
        {
          title: "75% Complete",
          description: "Progress bar at 75% completion, almost finished.",
          preview: <Progress value={75} />,
          code: `<Progress value={75} />`,
        },
        {
          title: "100% Complete",
          description: "Progress bar at 100%, fully completed.",
          preview: <Progress value={100} />,
          code: `<Progress value={100} />`,
        },
        {
          title: "Animated Progress",
          description: "Progress bar with animated state change.",
          preview: <Progress value={progress} />,
          code: `const [progress, setProgress] = useState(13);

useEffect(() => {
  const timer = setTimeout(() => setProgress(66), 500);
  return () => clearTimeout(timer);
}, []);

<Progress value={progress} />`,
        },
      ]}
      props={[
        {
          name: "value",
          type: "number",
          default: "0",
          description: "The progress value between 0 and 100.",
        },
        {
          name: "max",
          type: "number",
          default: "100",
          description: "The maximum progress value.",
        },
        {
          name: "className",
          type: "string",
          description: "Additional CSS classes to apply to the progress bar.",
        },
      ]}
      accessibility={[
        "Built on Radix UI Progress primitive for full accessibility",
        "Properly announces progress percentage to screen readers",
        "Uses aria-valuenow, aria-valuemin, and aria-valuemax attributes",
        "Smooth transition animation for value changes",
        "Visual indicator uses transform for better performance",
      ]}
      previous={{ title: "Alert", href: "/docs/components/alert" }}
      next={{ title: "Loading", href: "/docs/components/loading" }}
    />
  );
}
