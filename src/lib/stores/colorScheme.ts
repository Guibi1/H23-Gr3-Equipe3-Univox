import { writable } from "svelte/store";

export type ColorScheme = "light" | "dark";

function createColorSchemeStore() {
    const { subscribe, set: setStore } = writable<ColorScheme>("dark");

    function set(color: ColorScheme) {
        setStore(color);
        fetch("/api/colorScheme", {
            method: "PUT",
            body: color,
        });

        if (typeof document !== "undefined") {
            document.documentElement.setAttribute("data-colorScheme", color);
        }
    }

    function toggle() {
        let color;
        subscribe((c) => (color = c))();
        set(color === "dark" ? "light" : "dark");
    }

    return {
        subscribe,
        setInitial: setStore,
        set,
        toggle,
    };
}

const colorScheme = createColorSchemeStore();
export default colorScheme;

function createColorSchemeIsDark() {
    const { subscribe, set } = writable<boolean>(true);
    colorScheme.subscribe((color) => set(color === "dark"));

    return {
        subscribe,
        set: (isDark: boolean) => colorScheme.set(isDark ? "dark" : "light"),
    };
}

export const colorSchemeIsDark = createColorSchemeIsDark();