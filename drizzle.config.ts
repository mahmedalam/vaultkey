import env from "@/env";
import { Config } from "drizzle-kit";

export default {
  out: "./src/db/migrations",
  schema: "./src/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: env.dbUrl,
  },
} satisfies Config;
