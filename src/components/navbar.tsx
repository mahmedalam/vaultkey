import { navbarLinks } from "@/constants";
import { UserButton } from "@clerk/nextjs";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

export default function Navbar() {
  return (
    <header className="bg-primary text-primary-foreground body-font">
      <div className="container mx-auto flex flex-wrap gap-4 px-5 py-4 flex-col md:flex-row items-center">
        <Link href="/" className="text-4xl font-bold">
          VaultKey
        </Link>
        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center font-semibold transition-opacity">
          {navbarLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="mr-6 hover:opacity-75"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <Link href="/add-password">
          <Button variant="secondary">
            <Plus />
            Add Password
          </Button>
        </Link>
        <span className="size-7">
          <UserButton />
        </span>
      </div>
    </header>
  );
}
