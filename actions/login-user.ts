"use client";
import {authClient} from "@/lib/auth-client";
import { redirect } from "next/navigation";

export async function loginUser(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const { data, error } = await authClient.signIn.email({
        email,
        password,
        callbackURL: "/dashboard",
        rememberMe: false
});

  if(error){
    console.log("Erro ao logar",error);
    redirect("/login")
  }
}
