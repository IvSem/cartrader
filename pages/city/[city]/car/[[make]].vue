<script setup>
const route = useRoute();
const { data: cars, refresh } = await useFetchCars(route.params.city, {
  minPrice: route.query.minPrice,
  maxPrice: route.query.maxPrice,
  make: route.params.make,
});

watch(
  () => route.query,
  () => {
    window.location.reload(true);
  }
);
</script>
<template>
  <CarCards v-if="cars && cars.length" :cars="cars" />
  <h1 v-else class="text-3xl text-red-600">No Cars Found With Filters</h1>
</template>
