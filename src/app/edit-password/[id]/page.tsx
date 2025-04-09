import PasswordForm from "@/components/password-form";

export default async function EditPasswordPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <main>
      <h1>Edit Password</h1>
      <section>
        <PasswordForm id={Number(id)} />
      </section>
    </main>
  );
}
