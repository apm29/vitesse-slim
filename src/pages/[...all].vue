<script setup>
const router = useRouter();
</script>

<template>
  <main p="x4 y10" text="center teal-700 dark:gray-200" bg-surface h-screen>
    <div text-4xl>
      <div i-carbon-warning inline-block />
    </div>
    <router-view />
    <div>
      <button btn text-sm m="3 t8" @click="router.back()">返回</button>
    </div>
  </main>
</template>
