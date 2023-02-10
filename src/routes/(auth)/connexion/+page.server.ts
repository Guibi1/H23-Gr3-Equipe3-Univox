import * as db from "$lib/server/db";
import { fail, redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";

export const actions = {
    default: async ({ request, cookies }) => {
        const data = await request.formData();
        const da = data.get("da");
        const password = data.get("password");

        if (!da || !password) {
            return fail(400, { da, missing: true });
        }

        const user = await db.compareUserPassword(da.toString(), password.toString());
        if (!user) {
            return fail(401, { da, incorrect: true });
        }

        const token = await db.createToken(user);
        cookies.set("token", token, { path: "/", httpOnly: true });

        return { success: true };
    },
} satisfies Actions;