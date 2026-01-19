"use server";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function loginUser(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

    const result = await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    });

    if (!result) {
        console.log(result);
        redirect("/login")
    }

  // Redireciona apenas se o login for bem-sucedido
  redirect("/dashboard");
}
