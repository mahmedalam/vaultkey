import "server-only";

import env from "@/env";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

const sql = neon(env.dbUrl);
export const db = drizzle({ client: sql });
