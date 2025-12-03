/**
 * OpenAPI 3.1 Specification for Fabrk API
 *
 * This specification documents all public API endpoints.
 * Use with Swagger UI or other OpenAPI tools.
 */

export const openAPISpec = {
  openapi: "3.1.0",
  info: {
    title: "Fabrk API",
    version: "1.0.0",
    description: "SaaS boilerplate API with authentication, organizations, payments, and more.",
    contact: {
      name: "Fabrk Support",
      url: "https://fabrk.dev",
    },
    license: {
      name: "MIT",
      url: "https://opensource.org/licenses/MIT",
    },
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Development server",
    },
    {
      url: "https://api.fabrk.dev",
      description: "Production server",
    },
  ],
  tags: [
    { name: "Health", description: "Health check endpoints" },
    { name: "Auth", description: "Authentication endpoints" },
    { name: "User", description: "User management endpoints" },
    { name: "Organizations", description: "Organization management" },
    { name: "Members", description: "Organization member management" },
    { name: "Payments", description: "Payment and subscription endpoints" },
    { name: "Webhooks", description: "Webhook management" },
    { name: "Notifications", description: "User notifications" },
    { name: "Admin", description: "Admin-only endpoints" },
  ],
  paths: {
    "/api/health": {
      get: {
        tags: ["Health"],
        summary: "Health check",
        description: "Returns the health status of the API",
        responses: {
          "200": {
            description: "Service is healthy",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: { type: "string", example: "ok" },
                    timestamp: { type: "string", format: "date-time" },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/api/user/profile": {
      get: {
        tags: ["User"],
        summary: "Get user profile",
        description: "Returns the authenticated user profile",
        security: [{ bearerAuth: [] }],
        responses: {
          "200": {
            description: "User profile",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/User" },
              },
            },
          },
          "401": { $ref: "#/components/responses/Unauthorized" },
        },
      },
      patch: {
        tags: ["User"],
        summary: "Update user profile",
        description: "Updates the authenticated user profile",
        security: [{ bearerAuth: [] }],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  image: { type: "string", format: "uri" },
                },
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Updated user profile",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/User" },
              },
            },
          },
          "401": { $ref: "#/components/responses/Unauthorized" },
        },
      },
    },
    "/api/user/delete": {
      delete: {
        tags: ["User"],
        summary: "Delete user account",
        description: "Soft deletes the user account (GDPR compliant)",
        security: [{ bearerAuth: [] }],
        responses: {
          "200": {
            description: "Account deleted successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean" },
                    message: { type: "string" },
                  },
                },
              },
            },
          },
          "401": { $ref: "#/components/responses/Unauthorized" },
        },
      },
    },
    "/api/user/export": {
      get: {
        tags: ["User"],
        summary: "Export user data",
        description: "Exports all user data (GDPR data portability)",
        security: [{ bearerAuth: [] }],
        responses: {
          "200": {
            description: "User data export",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    user: { $ref: "#/components/schemas/User" },
                    organizations: {
                      type: "array",
                      items: { $ref: "#/components/schemas/Organization" },
                    },
                    payments: {
                      type: "array",
                      items: { $ref: "#/components/schemas/Payment" },
                    },
                    auditLogs: {
                      type: "array",
                      items: { $ref: "#/components/schemas/AuditLog" },
                    },
                  },
                },
              },
            },
          },
          "401": { $ref: "#/components/responses/Unauthorized" },
        },
      },
    },
    "/api/organizations": {
      get: {
        tags: ["Organizations"],
        summary: "List organizations",
        description: "Returns all organizations the user is a member of",
        security: [{ bearerAuth: [] }],
        responses: {
          "200": {
            description: "List of organizations",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Organization" },
                },
              },
            },
          },
          "401": { $ref: "#/components/responses/Unauthorized" },
        },
      },
    },
    "/api/organizations/create": {
      post: {
        tags: ["Organizations"],
        summary: "Create organization",
        description: "Creates a new organization",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["name", "slug"],
                properties: {
                  name: { type: "string", minLength: 1, maxLength: 100 },
                  slug: {
                    type: "string",
                    pattern: "^[a-z0-9-]+$",
                    minLength: 3,
                    maxLength: 50,
                  },
                  description: { type: "string", maxLength: 500 },
                },
              },
            },
          },
        },
        responses: {
          "201": {
            description: "Organization created",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Organization" },
              },
            },
          },
          "400": { $ref: "#/components/responses/BadRequest" },
          "401": { $ref: "#/components/responses/Unauthorized" },
          "409": {
            description: "Organization slug already exists",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
              },
            },
          },
        },
      },
    },
    "/api/organizations/{id}": {
      get: {
        tags: ["Organizations"],
        summary: "Get organization",
        description: "Returns organization details",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          "200": {
            description: "Organization details",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Organization" },
              },
            },
          },
          "401": { $ref: "#/components/responses/Unauthorized" },
          "404": { $ref: "#/components/responses/NotFound" },
        },
      },
      patch: {
        tags: ["Organizations"],
        summary: "Update organization",
        description: "Updates organization details (Admin/Owner only)",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  description: { type: "string" },
                  logo: { type: "string", format: "uri" },
                },
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Updated organization",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Organization" },
              },
            },
          },
          "401": { $ref: "#/components/responses/Unauthorized" },
          "403": { $ref: "#/components/responses/Forbidden" },
          "404": { $ref: "#/components/responses/NotFound" },
        },
      },
      delete: {
        tags: ["Organizations"],
        summary: "Delete organization",
        description: "Deletes an organization (Owner only)",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          "200": {
            description: "Organization deleted",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean" },
                  },
                },
              },
            },
          },
          "401": { $ref: "#/components/responses/Unauthorized" },
          "403": { $ref: "#/components/responses/Forbidden" },
          "404": { $ref: "#/components/responses/NotFound" },
        },
      },
    },
    "/api/v1/members": {
      get: {
        tags: ["Members"],
        summary: "List organization members (Public API)",
        description: "Returns members of an organization via API key",
        security: [{ apiKeyAuth: [] }],
        parameters: [
          {
            name: "organizationId",
            in: "query",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          "200": {
            description: "List of members",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/OrganizationMember" },
                },
              },
            },
          },
          "401": { $ref: "#/components/responses/Unauthorized" },
          "403": { $ref: "#/components/responses/Forbidden" },
        },
      },
    },
    "/api/v1/members/invite": {
      post: {
        tags: ["Members"],
        summary: "Invite member (Public API)",
        description: "Invites a new member to an organization via API key",
        security: [{ apiKeyAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["organizationId", "email"],
                properties: {
                  organizationId: { type: "string" },
                  email: { type: "string", format: "email" },
                  role: {
                    type: "string",
                    enum: ["MEMBER", "ADMIN"],
                    default: "MEMBER",
                  },
                },
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Invite sent",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/OrganizationInvite" },
              },
            },
          },
          "401": { $ref: "#/components/responses/Unauthorized" },
          "403": { $ref: "#/components/responses/Forbidden" },
        },
      },
    },
    "/api/notifications": {
      get: {
        tags: ["Notifications"],
        summary: "List notifications",
        description: "Returns user notifications",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "limit",
            in: "query",
            schema: { type: "integer", default: 20 },
          },
          {
            name: "offset",
            in: "query",
            schema: { type: "integer", default: 0 },
          },
        ],
        responses: {
          "200": {
            description: "List of notifications",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Notification" },
                },
              },
            },
          },
          "401": { $ref: "#/components/responses/Unauthorized" },
        },
      },
    },
    "/api/webhooks": {
      get: {
        tags: ["Webhooks"],
        summary: "List webhooks",
        description: "Returns webhooks for the current organization",
        security: [{ bearerAuth: [] }],
        responses: {
          "200": {
            description: "List of webhooks",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Webhook" },
                },
              },
            },
          },
          "401": { $ref: "#/components/responses/Unauthorized" },
        },
      },
      post: {
        tags: ["Webhooks"],
        summary: "Create webhook",
        description: "Creates a new webhook endpoint",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["url", "events"],
                properties: {
                  url: { type: "string", format: "uri" },
                  events: {
                    type: "array",
                    items: { type: "string" },
                    minItems: 1,
                  },
                },
              },
            },
          },
        },
        responses: {
          "201": {
            description: "Webhook created",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Webhook" },
              },
            },
          },
          "401": { $ref: "#/components/responses/Unauthorized" },
        },
      },
    },
    "/api/api-keys": {
      get: {
        tags: ["API Keys"],
        summary: "List API keys",
        description: "Returns API keys for the current organization",
        security: [{ bearerAuth: [] }],
        responses: {
          "200": {
            description: "List of API keys",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/ApiKey" },
                },
              },
            },
          },
          "401": { $ref: "#/components/responses/Unauthorized" },
        },
      },
      post: {
        tags: ["API Keys"],
        summary: "Create API key",
        description: "Creates a new API key. The full key is only shown once.",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["name"],
                properties: {
                  name: { type: "string" },
                  permissions: {
                    type: "array",
                    items: { type: "string", enum: ["read", "write", "admin"] },
                    default: ["read"],
                  },
                  expiresAt: { type: "string", format: "date-time" },
                },
              },
            },
          },
        },
        responses: {
          "201": {
            description: "API key created",
            content: {
              "application/json": {
                schema: {
                  allOf: [
                    { $ref: "#/components/schemas/ApiKey" },
                    {
                      type: "object",
                      properties: {
                        key: {
                          type: "string",
                          description: "Full API key (only shown once)",
                        },
                      },
                    },
                  ],
                },
              },
            },
          },
          "401": { $ref: "#/components/responses/Unauthorized" },
        },
      },
    },
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        description: "JWT token from NextAuth session",
      },
      apiKeyAuth: {
        type: "apiKey",
        in: "header",
        name: "X-API-Key",
        description: "API key for public API access",
      },
    },
    schemas: {
      User: {
        type: "object",
        properties: {
          id: { type: "string" },
          email: { type: "string", format: "email" },
          name: { type: "string", nullable: true },
          image: { type: "string", format: "uri", nullable: true },
          role: { type: "string", enum: ["USER", "ADMIN", "SUPER_ADMIN"] },
          tier: { type: "string" },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
        },
      },
      Organization: {
        type: "object",
        properties: {
          id: { type: "string" },
          name: { type: "string" },
          slug: { type: "string" },
          description: { type: "string", nullable: true },
          logo: { type: "string", format: "uri", nullable: true },
          plan: { type: "string" },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
        },
      },
      OrganizationMember: {
        type: "object",
        properties: {
          id: { type: "string" },
          organizationId: { type: "string" },
          userId: { type: "string" },
          role: { type: "string", enum: ["OWNER", "ADMIN", "MEMBER", "GUEST"] },
          joinedAt: { type: "string", format: "date-time" },
          user: { $ref: "#/components/schemas/User" },
        },
      },
      OrganizationInvite: {
        type: "object",
        properties: {
          id: { type: "string" },
          organizationId: { type: "string" },
          email: { type: "string", format: "email" },
          role: { type: "string" },
          expiresAt: { type: "string", format: "date-time" },
          createdAt: { type: "string", format: "date-time" },
        },
      },
      Notification: {
        type: "object",
        properties: {
          id: { type: "string" },
          type: { type: "string" },
          title: { type: "string" },
          message: { type: "string" },
          read: { type: "boolean" },
          link: { type: "string", nullable: true },
          createdAt: { type: "string", format: "date-time" },
        },
      },
      Webhook: {
        type: "object",
        properties: {
          id: { type: "string" },
          url: { type: "string", format: "uri" },
          events: { type: "array", items: { type: "string" } },
          enabled: { type: "boolean" },
          createdAt: { type: "string", format: "date-time" },
        },
      },
      ApiKey: {
        type: "object",
        properties: {
          id: { type: "string" },
          name: { type: "string" },
          keyPrefix: { type: "string" },
          permissions: { type: "array", items: { type: "string" } },
          lastUsedAt: { type: "string", format: "date-time", nullable: true },
          expiresAt: { type: "string", format: "date-time", nullable: true },
          createdAt: { type: "string", format: "date-time" },
        },
      },
      Payment: {
        type: "object",
        properties: {
          id: { type: "string" },
          amount: { type: "integer", description: "Amount in cents" },
          status: { type: "string" },
          productId: { type: "string", nullable: true },
          createdAt: { type: "string", format: "date-time" },
        },
      },
      AuditLog: {
        type: "object",
        properties: {
          id: { type: "string" },
          action: { type: "string" },
          resource: { type: "string", nullable: true },
          resourceId: { type: "string", nullable: true },
          metadata: { type: "object", nullable: true },
          createdAt: { type: "string", format: "date-time" },
        },
      },
      Error: {
        type: "object",
        properties: {
          error: { type: "string" },
          message: { type: "string" },
          code: { type: "string" },
        },
        required: ["error"],
      },
    },
    responses: {
      BadRequest: {
        description: "Bad request",
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/Error" },
          },
        },
      },
      Unauthorized: {
        description: "Unauthorized - Authentication required",
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/Error" },
          },
        },
      },
      Forbidden: {
        description: "Forbidden - Insufficient permissions",
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/Error" },
          },
        },
      },
      NotFound: {
        description: "Resource not found",
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/Error" },
          },
        },
      },
    },
  },
} as const;

export type OpenAPISpec = typeof openAPISpec;
