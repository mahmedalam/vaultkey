import { db } from "@/db";

import { passwordsTable } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { NextRequest } from "next/server";

// GET all passwords for a user
export async function GET(request: NextRequest) {
  const { userId, redirectToSignIn } = await auth();
  if (!userId) {
    return redirectToSignIn();
  }

  const searchParams = request.nextUrl.searchParams;
  const id = Number(searchParams.get("id"));

  if (id) {
    const password = (
      await db
        .select()
        .from(passwordsTable)
        .where(
          and(eq(passwordsTable.id, id), eq(passwordsTable.userId, userId)),
        )
    )[0] as TPassword;

    return Response.json({ password });
  }

  const passwords = await db
    .select()
    .from(passwordsTable)
    .where(eq(passwordsTable.userId, userId));

  return Response.json({ passwords });
}

// POST a new password
export async function POST(request: NextRequest) {
  const { userId, redirectToSignIn } = await auth();
  if (!userId) {
    return redirectToSignIn();
  }

  const { title, url, username, password, note, category, security_level } =
    await request.json();

  const insertedPassword = await db.insert(passwordsTable).values({
    userId,
    title,
    url,
    username,
    password,
    note,
    category,
    securityLevel: security_level,
  });

  return Response.json({ insertedPassword });
}

// PUT an existing password
export async function PUT(request: NextRequest) {
  const { userId, redirectToSignIn } = await auth();
  if (!userId) {
    return redirectToSignIn();
  }

  const { id, title, url, username, password, note, category, security_level } =
    await request.json();

  const updatedPassword = await db
    .update(passwordsTable)
    .set({
      title,
      url,
      username,
      password,
      note,
      category,
      securityLevel: security_level,
      updatedAt: new Date().toISOString(),
    })
    .where(and(eq(passwordsTable.id, id), eq(passwordsTable.userId, userId)));

  return Response.json({ updatedPassword });
}

// DELETE a password
export async function DELETE(request: NextRequest) {
  const { userId, redirectToSignIn } = await auth();
  if (!userId) {
    return redirectToSignIn();
  }

  const searchParams = request.nextUrl.searchParams;
  const id = Number(searchParams.get("id"));

  const deletedPassword = await db
    .delete(passwordsTable)
    .where(and(eq(passwordsTable.id, id), eq(passwordsTable.userId, userId)));

  return Response.json({ deletedPassword });
}
