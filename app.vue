<script setup>
const store = useStore();
await store.fetchUser();

provideHeadlessUseId(() => useId());
</script>

<template>
  <NuxtLoadingIndicator />

  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
