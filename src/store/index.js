import { defineStore } from "pinia";

export const useAppStore = defineStore("app-state", {
  state: () => {
    return { count: 0 };
  },
  actions: {
    increment() {
      this.count++;
    },
  },
});
