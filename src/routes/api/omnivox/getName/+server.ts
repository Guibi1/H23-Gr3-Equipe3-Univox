import * as omnivox from "$lib/server/omnivox";
import { error, json, type RequestHandler } from "@sveltejs/kit";

export const POST = (async ({ request, setHeaders }) => {
    const cookie = await request.json();

    try {
        const html = await omnivox.fetchSchedulePageHTML(cookie, 2023, omnivox.Semester.Winter);
        const name = omnivox.schedulePageToName(html);

        setHeaders({ "content-type": "application/json" });
        return json(name);
    } catch (e) {
        throw error(401, "Invalid cookies.");
    }
}) satisfies RequestHandler;
