<script setup>
const route = useRoute();
const { toTitleCase } = useUtilities();

useHead({
  title: `${route.params.make ? toTitleCase(route.params.make) : 'Cars'} in ${route.params.city}`,
});

definePageMeta({
  layout: 'custom',
});
</script>

<template>
  <div class="mt-32 flex items-start">
    <CarSideBar />
    <NuxtPage />
  </div>
</template>
