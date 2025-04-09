# Password Manager with Next.js 15, NeonDB and Clerk

## Project Overview
- A secure password manager built with Next.js 15
- NeonDB (PostgreSQL) for database storage
- Clerk for authentication and user management
- End-to-end encryption for password security
- Responsive UI with modern design

## Tech Stack
- **Frontend**: Next.js 15, React, TailwindCSS
- **Backend**: Next.js API routes/Server Actions
- **Database**: NeonDB (PostgreSQL)
- **Authentication**: Clerk
- **Encryption**: Web Crypto API
- **ORM**: Prisma
- **Styling**: TailwindCSS, shadcn/ui
- **Form Handling**: React Hook Form, zod

## Project Setup Steps

### 1. Setup Next.js 15 Project
```bash
npx create-next-app@latest password-manager
cd password-manager
```

Select the following options during setup:
- TypeScript: Yes
- ESLint: Yes
- Tailwind CSS: Yes
- src/ directory: Yes
- App Router: Yes
- Import alias: Yes (Keep default @/*)

### 2. Install Required Dependencies
```bash
npm install @clerk/nextjs @prisma/client react-hook-form zod @hookform/resolvers nanoid
npm install -D prisma
```

### 3. Setup Clerk Authentication
- Create account at clerk.dev
- Set up application and get API keys
- Add to your `.env.local` file:
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_***
CLERK_SECRET_KEY=sk_***
```

- Set up Clerk provider in your `src/app/layout.tsx` file

### 4. Setup NeonDB
- Create account at neon.tech
- Create a new PostgreSQL database
- Get connection string and add to `.env` file:
```
DATABASE_URL="postgresql://username:password@hostname/database"
```

### 5. Setup Prisma
```bash
npx prisma init
```

Update schema.prisma with database models for password storage.

## Database Schema

```prisma
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Vault {
  id          String     @id @default(cuid())
  name        String
  userId      String  
  createdAt   DateTime   @default(now())
  updatedAt   DateTime   @updatedAt
  passwords   Password[]
}

model Password {
  id          String   @id @default(cuid())
  title       String
  username    String?
  email       String?
  password    String   // Will store encrypted password
  website     String?
  notes       String?
  vaultId     String
  vault       Vault    @relation(fields: [vaultId], references: [id], onDelete: Cascade)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  @@index([vaultId])
}
```

Then run:
```bash
npx prisma generate
npx prisma db push
```

## Encryption Strategy

1. **Key Derivation**: Derive an encryption key from the user's master password using PBKDF2
2. **Encryption**: Use AES-GCM for password encryption
3. **Storage**: Only store encrypted passwords, never raw passwords

## Key Features to Implement

1. User authentication with Clerk
2. Create/manage password vaults
3. Add/edit/delete passwords
4. Password generator
5. Search and filtering
6. Password strength checker
7. Auto logout after inactivity
8. Copy to clipboard functionality