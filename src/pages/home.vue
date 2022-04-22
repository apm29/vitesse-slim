<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
</script>

<template>
  <img alt="Vue logo" src="../assets/logo.png" m-auto my-12 />
  <HelloWorld msg="Hello Vue 3 + Vite" />
  <button btn @click="router.back">Back</button>
</template>
