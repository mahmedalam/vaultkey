import { navbarLinks } from "@/constants";
import { UserButton } from "@clerk/nextjs";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

export default function Navbar() {
  return (
    <header className="bg-primary text-primary-foreground body-font">
      <div className="container mx-auto flex flex-wrap gap-4 px-5 py-4 items-center">
        <Link
          href="/"
          className="mr-auto md:mr-0 text-3xl lg:text-4xl font-bold"
        >
          VaultKey
        </Link>
        <nav className="hidden md:flex m-auto items-center text-base justify-center font-semibold transition-opacity">
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
            <span className="hidden lg:block">Add Password</span>
          </Button>
        </Link>
        <span className="size-7">
          <UserButton />
        </span>
      </div>
    </header>
  );
}
