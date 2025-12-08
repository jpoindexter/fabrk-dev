import path from "node:path";

/**
 * Prisma 7 Configuration
 * The database URL is now configured here for Prisma Migrate
 * instead of in the schema.prisma file
 */
export default {
  schema: path.join(__dirname, "schema.prisma"),
};
