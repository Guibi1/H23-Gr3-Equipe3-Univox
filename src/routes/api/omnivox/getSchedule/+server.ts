import { error, json, type RequestHandler } from "@sveltejs/kit";

import { fetchSchedulePageHTML, schedulePageToClasses, Semester } from "$lib/server/omnivox";

export const POST = (async ({ request, setHeaders }) => {
    const cookie = await request.json();

    try {
        const html = await fetchSchedulePageHTML(cookie, 2023, Semester.Winter);
        const schedule = schedulePageToClasses(html);

        setHeaders({ "content-type": "application/json" });
        return json(schedule);
    } catch (e) {
        throw error(401, "Invalid cookies.");
    }
}) satisfies RequestHandler;
