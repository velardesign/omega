"use server";

import { auth } from "@/lib/auth";
import { userCreateSchema } from "@/schemas/user-create-schema";

export async function createUserAction(formData: unknown) {

    const data = userCreateSchema.parse(formData);

    const response = await auth.api.signUpEmail({
      body: {
        name: data.name,
        email: data.email,
        password: data.password,
      },
    });

    return response;
}