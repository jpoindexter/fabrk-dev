"use client";

import { ComponentShowcaseTemplate } from "@/components/docs";
import { Rating } from "@/components/ui/rating";
import { useState } from "react";
import { Label } from "@/components/ui/label";

export default function RatingPage() {
  const [rating1, setRating1] = useState(3);
  const [rating2, setRating2] = useState(4);
  const [rating3, setRating3] = useState(0);

  return (
    <ComponentShowcaseTemplate
      code="[UI.42]"
      category="Components"
      title="Rating"
      description="A star rating component for collecting user feedback and displaying ratings."
      importCode={`import { Rating } from "@/components/ui/rating"`}
      mainPreview={{
        preview: (
          <div className="space-y-2">
            <Label className="font-mono text-xs text-muted-foreground">
              [RATING]
            </Label>
            <Rating rating={rating1} onRatingChange={setRating1} />
          </div>
        ),
        code: `const [rating, setRating] = useState(3);

<Rating rating={rating} onRatingChange={setRating} />`,
      }}
      variants={[
        {
          title: "With Value Display",
          description: "Rating with numeric value displayed",
          preview: (
            <div className="space-y-2">
              <Label className="font-mono text-xs text-muted-foreground">
                [RATING_WITH_VALUE]
              </Label>
              <Rating
                rating={rating2}
                onRatingChange={setRating2}
                showValue
              />
            </div>
          ),
          code: `<Rating
  rating={rating}
  onRatingChange={setRating}
  showValue
/>`,
        },
        {
          title: "Small Size",
          description: "Compact rating component for tight spaces",
          preview: (
            <div className="space-y-2">
              <Label className="font-mono text-xs text-muted-foreground">
                [SMALL_RATING]
              </Label>
              <Rating
                rating={rating3}
                onRatingChange={setRating3}
                size="sm"
              />
            </div>
          ),
          code: `<Rating
  rating={rating}
  onRatingChange={setRating}
  size="sm"
/>`,
        },
        {
          title: "Large Size",
          description: "Large rating component for emphasis",
          preview: (
            <div className="space-y-2">
              <Label className="font-mono text-xs text-muted-foreground">
                [LARGE_RATING]
              </Label>
              <Rating rating={4} onRatingChange={() => {}} size="lg" />
            </div>
          ),
          code: `<Rating
  rating={rating}
  onRatingChange={setRating}
  size="lg"
/>`,
        },
        {
          title: "Read-Only",
          description: "Display-only rating without interaction",
          preview: (
            <div className="space-y-2">
              <Label className="font-mono text-xs text-muted-foreground">
                [AVERAGE_RATING]
              </Label>
              <Rating rating={4.5} readonly showValue />
            </div>
          ),
          code: `<Rating rating={4.5} readonly showValue />`,
        },
        {
          title: "Disabled",
          description: "Disabled rating component",
          preview: (
            <div className="space-y-2">
              <Label className="font-mono text-xs text-muted-foreground">
                [DISABLED_RATING]
              </Label>
              <Rating rating={3} disabled />
            </div>
          ),
          code: `<Rating rating={3} disabled />`,
        },
        {
          title: "Custom Max Rating",
          description: "Rating with custom maximum value",
          preview: (
            <div className="space-y-2">
              <Label className="font-mono text-xs text-muted-foreground">
                [TEN_STAR_RATING]
              </Label>
              <Rating rating={7} onRatingChange={() => {}} maxRating={10} showValue />
            </div>
          ),
          code: `<Rating
  rating={7}
  onRatingChange={setRating}
  maxRating={10}
  showValue
/>`,
        },
        {
          title: "Terminal Style",
          description: "Rating with terminal-themed container",
          preview: (
            <div className="space-y-2">
              <div className="font-mono text-xs text-muted-foreground">
                [FEEDBACK_RATING]:
              </div>
              <div className="flex items-center gap-4">
                <Rating rating={rating1} onRatingChange={setRating1} />
                <span className="font-mono text-xs text-primary">
                  &gt; {rating1}/5 stars
                </span>
              </div>
            </div>
          ),
          code: `<div className="space-y-2">
  <div className="font-mono text-xs text-muted-foreground">
    [FEEDBACK_RATING]:
  </div>
  <Rating rating={rating} onRatingChange={setRating} />
</div>`,
        },
      ]}
      props={[
        {
          name: "rating",
          type: "number",
          default: "0",
          description: "Current rating value (supports decimals for read-only)",
        },
        {
          name: "onRatingChange",
          type: "(rating: number) => void",
          default: "undefined",
          description: "Callback fired when rating is changed",
        },
        {
          name: "maxRating",
          type: "number",
          default: "5",
          description: "Maximum rating value (number of stars)",
        },
        {
          name: "size",
          type: '"sm" | "md" | "lg"',
          default: '"md"',
          description: "Size of the star icons",
        },
        {
          name: "readonly",
          type: "boolean",
          default: "false",
          description: "Display-only mode without interaction",
        },
        {
          name: "disabled",
          type: "boolean",
          default: "false",
          description: "Disable rating interaction",
        },
        {
          name: "showValue",
          type: "boolean",
          default: "false",
          description: "Display numeric rating value next to stars",
        },
        {
          name: "className",
          type: "string",
          default: "undefined",
          description: "Additional CSS classes for the container",
        },
      ]}
      accessibility={[
        "Interactive buttons for each star with proper type='button'",
        "Hover effects provide visual feedback for selection",
        "Disabled state prevents interaction and reduces opacity",
        "Keyboard support through native button focus",
        "Read-only mode removes interactive elements",
        "Visual feedback with scale animation on hover",
      ]}
      next={{ title: "Rich Text Editor", href: "/docs/components/rich-text-editor" }}
    />
  );
}
