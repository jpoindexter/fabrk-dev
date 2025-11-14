/**
 * ✅ FABRK COMPONENT
 * Drawer Stories - Bottom sheet drawers for mobile-first interactions
 *
 * @see https://github.com/emilkowalski/vaul
 * @see https://ui.shadcn.com/docs/components/drawer
 */

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import type { Meta, StoryObj } from "@storybook/nextjs";
import {
  MapPin,
  MessageCircle,
  Plus,
  Settings,
  Share2,
  ShoppingCart,
  Star,
  User,
} from "lucide-react";

const meta: Meta<typeof Drawer> = {
  title: "UI/Overlays/Drawer",
  component: Drawer,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Drawer>;

/**
 * Default drawer - swipe up from bottom
 */
export const Default: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Open Drawer</Button>
      </DrawerTrigger>
      <DrawerContent aria-label="Example drawer">
        <DrawerHeader>
          <DrawerTitle>Drawer Title</DrawerTitle>
          <DrawerDescription>This is a drawer that slides up from the bottom.</DrawerDescription>
        </DrawerHeader>
        <div className="p-4">
          <p className="text-sm text-muted-foreground">
            Drawer content goes here. Swipe down or click outside to close.
          </p>
        </div>
        <DrawerFooter>
          <Button>Submit</Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
};

/**
 * Form in drawer
 */
export const FormDrawer: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>
          <Plus className="mr-2 size-4" />
          Add Contact
        </Button>
      </DrawerTrigger>
      <DrawerContent aria-label="Add contact form">
        <DrawerHeader>
          <DrawerTitle>Add New Contact</DrawerTitle>
          <DrawerDescription>Fill in the details below to add a new contact.</DrawerDescription>
        </DrawerHeader>
        <div className="space-y-4 p-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="John Doe" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="john@example.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" type="tel" placeholder="+1 (555) 123-4567" />
          </div>
        </div>
        <DrawerFooter>
          <Button>Save Contact</Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
};

/**
 * Shopping cart drawer
 */
export const ShoppingCartDrawer: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" className="relative">
          <ShoppingCart className="mr-2 size-4" />
          Cart
          <Badge variant="secondary" className="ml-2">
            3
          </Badge>
        </Button>
      </DrawerTrigger>
      <DrawerContent aria-label="Shopping cart">
        <DrawerHeader>
          <DrawerTitle>Shopping Cart</DrawerTitle>
          <DrawerDescription>3 items in your cart</DrawerDescription>
        </DrawerHeader>
        <ScrollArea className="max-h-[400px]">
          <div className="space-y-4 p-4">
            {[
              { name: "Wireless Headphones", price: 99.99, qty: 1 },
              { name: "USB-C Cable", price: 19.99, qty: 2 },
              { name: "Phone Case", price: 29.99, qty: 1 },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between rounded-lg border p-3">
                <div className="flex-1">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-muted-foreground">Qty: {item.qty}</p>
                </div>
                <p className="font-semibold">${item.price}</p>
              </div>
            ))}
            <Separator />
            <div className="flex items-center justify-between">
              <p className="text-lg font-semibold">Total</p>
              <p className="text-lg font-bold">$169.96</p>
            </div>
          </div>
        </ScrollArea>
        <DrawerFooter>
          <Button className="w-full">Checkout</Button>
          <DrawerClose asChild>
            <Button variant="outline">Continue Shopping</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
};

/**
 * User profile drawer
 */
export const ProfileDrawer: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="ghost" size="sm">
          <User className="mr-2 size-4" />
          Profile
        </Button>
      </DrawerTrigger>
      <DrawerContent aria-label="User profile">
        <DrawerHeader>
          <div className="flex items-center gap-3">
            <div className="flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <span className="text-lg font-semibold">JD</span>
            </div>
            <div>
              <DrawerTitle>John Doe</DrawerTitle>
              <DrawerDescription>john.doe@example.com</DrawerDescription>
            </div>
          </div>
        </DrawerHeader>
        <div className="space-y-1 p-4">
          <Button variant="ghost" className="w-full justify-start">
            <User className="mr-2 size-4" />
            Edit Profile
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Settings className="mr-2 size-4" />
            Settings
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Share2 className="mr-2 size-4" />
            Share Profile
          </Button>
          <Separator className="my-2" />
          <Button variant="ghost" className="w-full justify-start text-destructive">
            Sign Out
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  ),
};

/**
 * Location selection drawer
 */
export const LocationDrawer: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">
          <MapPin className="mr-2 size-4" />
          Select Location
        </Button>
      </DrawerTrigger>
      <DrawerContent aria-label="Select location">
        <DrawerHeader>
          <DrawerTitle>Choose Your Location</DrawerTitle>
          <DrawerDescription>Select a city to see available services</DrawerDescription>
        </DrawerHeader>
        <ScrollArea className="max-h-[400px]">
          <div className="space-y-2 p-4">
            {[
              { city: "New York", state: "NY", available: true },
              { city: "Los Angeles", state: "CA", available: true },
              { city: "Chicago", state: "IL", available: true },
              { city: "Houston", state: "TX", available: false },
              { city: "Phoenix", state: "AZ", available: true },
              { city: "Philadelphia", state: "PA", available: true },
            ].map((location, i) => (
              <button
                key={i}
                className="flex w-full items-center justify-between rounded-lg border p-3 text-left hover:bg-accent disabled:cursor-not-allowed disabled:opacity-50"
                disabled={!location.available}
              >
                <div>
                  <p className="font-medium">{location.city}</p>
                  <p className="text-sm text-muted-foreground">{location.state}</p>
                </div>
                {!location.available && <Badge variant="secondary">Coming Soon</Badge>}
              </button>
            ))}
          </div>
        </ScrollArea>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
};

/**
 * Comments/feedback drawer
 */
export const CommentsDrawer: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">
          <MessageCircle className="mr-2 size-4" />
          Comments
          <Badge variant="secondary" className="ml-2">
            12
          </Badge>
        </Button>
      </DrawerTrigger>
      <DrawerContent aria-label="Comments">
        <DrawerHeader>
          <DrawerTitle>Comments</DrawerTitle>
          <DrawerDescription>12 comments on this post</DrawerDescription>
        </DrawerHeader>
        <ScrollArea className="max-h-[400px]">
          <div className="space-y-4 p-4">
            {[
              { user: "Alice Johnson", comment: "Great post! Very helpful.", time: "2 hours ago" },
              { user: "Bob Smith", comment: "Thanks for sharing this.", time: "5 hours ago" },
              { user: "Carol White", comment: "Interesting perspective.", time: "1 day ago" },
            ].map((comment, i) => (
              <div key={i} className="space-y-2 rounded-lg border p-3">
                <div className="flex items-center gap-2">
                  <div className="flex size-8 items-center justify-center rounded-full bg-muted">
                    <span className="text-xs font-medium">{comment.user[0]}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{comment.user}</p>
                    <p className="text-xs text-muted-foreground">{comment.time}</p>
                  </div>
                </div>
                <p className="text-sm">{comment.comment}</p>
              </div>
            ))}
          </div>
        </ScrollArea>
        <div className="border-t p-4">
          <div className="flex gap-2">
            <Input placeholder="Add a comment..." />
            <Button>Post</Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  ),
};

/**
 * Product details drawer
 */
export const ProductDetailsDrawer: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>View Details</Button>
      </DrawerTrigger>
      <DrawerContent aria-label="Product details">
        <DrawerHeader>
          <DrawerTitle>Premium Wireless Headphones</DrawerTitle>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Star className="size-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">4.5</span>
            </div>
            <span className="text-sm text-muted-foreground">(127 reviews)</span>
          </div>
        </DrawerHeader>
        <ScrollArea className="max-h-[400px]">
          <div className="space-y-4 p-4">
            <div className="flex aspect-video items-center justify-center rounded-lg bg-muted">
              <p className="text-sm text-muted-foreground">Product Image</p>
            </div>
            <div>
              <p className="text-2xl font-bold">$299.99</p>
              <p className="text-sm text-muted-foreground">Free shipping on orders over $50</p>
            </div>
            <div>
              <h4 className="mb-2 font-semibold">Features</h4>
              <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
                <li>Active Noise Cancellation</li>
                <li>30-hour battery life</li>
                <li>Bluetooth 5.0</li>
                <li>Premium sound quality</li>
              </ul>
            </div>
          </div>
        </ScrollArea>
        <DrawerFooter>
          <Button className="w-full">Add to Cart</Button>
          <DrawerClose asChild>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
};

/**
 * Filter options drawer
 */
export const FilterDrawer: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">
          <Settings className="mr-2 size-4" />
          Filters
        </Button>
      </DrawerTrigger>
      <DrawerContent aria-label="Filter options">
        <DrawerHeader>
          <DrawerTitle>Filter Products</DrawerTitle>
          <DrawerDescription>Refine your search results</DrawerDescription>
        </DrawerHeader>
        <ScrollArea className="max-h-[400px]">
          <div className="space-y-6 p-4">
            <div>
              <h4 className="mb-3 font-semibold">Price Range</h4>
              <div className="space-y-2">
                {["Under $50", "$50 - $100", "$100 - $200", "Over $200"].map((range) => (
                  <label key={range} className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">{range}</span>
                  </label>
                ))}
              </div>
            </div>
            <Separator />
            <div>
              <h4 className="mb-3 font-semibold">Category</h4>
              <div className="space-y-2">
                {["Electronics", "Clothing", "Home & Garden", "Sports"].map((category) => (
                  <label key={category} className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">{category}</span>
                  </label>
                ))}
              </div>
            </div>
            <Separator />
            <div>
              <h4 className="mb-3 font-semibold">Rating</h4>
              <div className="space-y-2">
                {["4+ Stars", "3+ Stars", "2+ Stars"].map((rating) => (
                  <label key={rating} className="flex items-center gap-2">
                    <input type="radio" name="rating" />
                    <span className="text-sm">{rating}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>
        <DrawerFooter>
          <Button className="w-full">Apply Filters</Button>
          <DrawerClose asChild>
            <Button variant="outline">Clear All</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
};

/**
 * Simple confirmation drawer
 */
export const ConfirmationDrawer: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="destructive">Delete Item</Button>
      </DrawerTrigger>
      <DrawerContent aria-label="Confirm deletion">
        <DrawerHeader>
          <DrawerTitle>Are you sure?</DrawerTitle>
          <DrawerDescription>
            This action cannot be undone. This will permanently delete the item.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <Button variant="destructive">Delete</Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
};
