<template>
  <div bg-surface text-center h-screen>
    <router-link link to="/home" m-auto>HOME</router-link>
    <div class="count" prose>
      {{ store.count }}
    </div>
    <button btn block m-auto my-3 @click="store.count++">
      <div i-mdi-plus text-2xl></div>
      ADD
    </button>
    <button btn block m-auto my-3 @click="handleAxios">Axios</button>
  </div>
</template>
<script setup>
import { useAppStore } from "~/store";
import { remote } from "~/composables";
const store = useAppStore();
const handleAxios = function () {
  remote.postForm({
    url: "/test",
    silent: true,
  });
};
</script>
<style scoped lang="scss">
.count {
  @apply text-red-500 text-4xl my-12;
}
</style>
