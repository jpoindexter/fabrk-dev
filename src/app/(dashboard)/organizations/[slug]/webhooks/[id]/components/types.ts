/**
 * Shared types for webhook detail components
 */

export interface Webhook {
  id: string;
  url: string;
  events: string[];
  secret: string;
  enabled: boolean;
  organization: {
    id: string;
    name: string;
  };
  deliveryCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Delivery {
  id: string;
  event: string;
  payload: Record<string, unknown>;
  status: string;
  statusCode: number | null;
  response: string | null;
  attempts: number;
  nextRetryAt: string | null;
  createdAt: string;
}
