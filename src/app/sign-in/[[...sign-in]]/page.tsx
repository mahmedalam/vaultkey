import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <main>
      <h1>Sign In</h1>
      <section className="flex-center">
        <SignIn />
      </section>
    </main>
  );
}
