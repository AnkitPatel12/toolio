import { atom } from "recoil";

export const sidebarState = atom({
    key: "sidebarState",
    default: {
        projectsOpen: true,
        toolStoreOpen: true,
    }
});