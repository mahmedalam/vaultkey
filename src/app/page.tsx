"use client";

import PasswordCard from "@/components/password-card";
import env from "@/env";
import { useUser } from "@clerk/nextjs";
import { LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";

export default function HomePage() {
  const { user, isLoaded } = useUser();
  const [passwords, setPasswords] = useState<TPassword[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoaded) return;

    async function fetchPasswords() {
      const response = await fetch(
        `${env.baseUrl}/api/passwords?user_id=${user?.id}`,
      );
      const { passwords } = (await response.json()) as {
        passwords: TPassword[];
      };
      setPasswords(passwords);
      setLoading(false);
    }

    fetchPasswords();
  }, [isLoaded, user?.id]);

  const handleDelete = (id: number) => {
    setPasswords((prevPasswords) =>
      prevPasswords.filter((password) => password.id !== id),
    );
  };

  return (
    <main>
      <h1>VaultKey Password Manager</h1>
      <section>
        {loading && <LoaderCircle className="animate-spin size-11 mx-auto" />}
        {!loading && !passwords.length && (
          <p className="text-xl text-muted-foreground text-center">
            No passwords found
          </p>
        )}
        {passwords.map((password) => (
          <PasswordCard
            key={password.id}
            {...password}
            onDelete={handleDelete}
          />
        ))}
      </section>
    </main>
  );
}
