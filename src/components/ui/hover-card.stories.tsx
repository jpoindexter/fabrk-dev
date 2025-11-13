import type { Meta, StoryObj } from "@storybook/react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./hover-card";
import { Button } from "./button";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { CalendarDays } from "lucide-react";

const meta = {
  title: "UI/Hover Card",
  component: HoverCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof HoverCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link">@username</Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex justify-between space-x-4">
          <Avatar>
            <AvatarImage src="https://github.com/vercel.png" />
            <AvatarFallback>VC</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h4 className="text-sm font-bold">@username</h4>
            <p className="text-sm text-muted-foreground">
              The React Framework created and maintained by @vercel.
            </p>
            <div className="flex items-center pt-2">
              <CalendarDays className="mr-2 h-4 w-4 opacity-70" />
              <span className="text-xs text-muted-foreground">
                Joined December 2021
              </span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
};

export const UserProfile: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="outline">Hover for profile</Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="space-y-2">
          <h4 className="text-sm font-bold">John Doe</h4>
          <p className="text-sm text-muted-foreground">
            Full-stack developer passionate about building great user
            experiences with modern web technologies.
          </p>
          <div className="flex gap-4 text-xs text-muted-foreground">
            <div>
              <span className="font-bold text-foreground">1.2K</span> Followers
            </div>
            <div>
              <span className="font-bold text-foreground">342</span> Following
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
};

export const QuickInfo: Story = {
  render: () => (
    <div className="space-y-2">
      <p className="text-sm">
        Hover over the{" "}
        <HoverCard>
          <HoverCardTrigger asChild>
            <span className="font-bold text-primary cursor-pointer underline">
              highlighted text
            </span>
          </HoverCardTrigger>
          <HoverCardContent>
            <p className="text-sm">
              This is additional context that appears when you hover. Perfect
              for tooltips with rich content!
            </p>
          </HoverCardContent>
        </HoverCard>{" "}
        to see more information.
      </p>
    </div>
  ),
};
