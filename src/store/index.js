import { defineStore } from "pinia";
import { localToken } from "~/composables";

export const useAppStore = defineStore("app-state", {
  state: () => {
    return { token: localToken, count: 0 };
  },
  actions: {
  },
});
