/**
 * ✅ FABRK COMPONENT
 * Footer Data and Constants
 * Production-ready ✓
 */

import { CreditCard, Github, Linkedin, Lock, MessageSquare, Shield, Twitter, Youtube } from "lucide-react";

export const footerLinks = {
  product: [
    { label: "Boilerplate", href: "/boilerplate" },
    { label: "Components", href: "/components" },
    { label: "Templates", href: "/templates", badge: "New" },
    { label: "Blocks", href: "/blocks" },
    { label: "Pricing", href: "/pricing" },
    { label: "Roadmap", href: "/roadmap" },
  ],
  resources: [
    { label: "Documentation", href: "/docs" },
    { label: "Tutorials", href: "/tutorials" },
    { label: "Blog", href: "/blog" },
    { label: "Changelog", href: "/changelog", badge: "Updated" },
    { label: "API Reference", href: "/docs/api" },
  ],
  company: [
    { label: "About", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Press Kit", href: "/press" },
    { label: "Partners", href: "/partners" },
    { label: "Contact", href: "/contact" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "License", href: "/license" },
    { label: "Security", href: "/security" },
    { label: "GDPR", href: "/gdpr" },
  ],
};

export const socialLinks = [
  { icon: Github, href: "https://github.com/jpoindexter/fabrk", label: "GitHub" },
  { icon: Twitter, href: "https://twitter.com/fabrk", label: "Twitter" },
  { icon: MessageSquare, href: "https://discord.gg/fabrk", label: "Discord" },
  { icon: Linkedin, href: "https://linkedin.com/company/fabrk", label: "LinkedIn" },
  { icon: Youtube, href: "https://youtube.com/@fabrk", label: "YouTube" },
];

export const trustBadges = [
  { icon: Shield, label: "SOC 2 Compliant" },
  { icon: Lock, label: "SSL Secured" },
  { icon: CreditCard, label: "PCI Compliant" },
];
