<template>
  <div class="count" prose>
    {{ count }}
  </div>
  <van-button @click="store.increment">
    <div i-mdi-plus text-2xl></div>
    ADD
  </van-button>
  <router-link to="/home" bg-orange-500 text-white px-4 py-4 block>HOME</router-link>
</template>
<script setup>
import { useAppStore } from "../store";
const store = useAppStore();
const count = computed(() => store.count);
</script>
<style scoped lang="scss">
.count {
  @apply text-red-500 text-4xl my-12;
}
</style>
