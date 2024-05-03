<script setup>
const route = useRoute();
const { data: car } = await useFetchCar(route.params.id);
const user = useSupabaseUser();
const { toTitleCase } = useUtilities();
definePageMeta({
  layout: 'custom',
});
useHead({
  title: `${toTitleCase(route.params.name)}`,
});
</script>
<template>
  <CarDetailHero :car="car" />
  <CarDetailAttributes :features="car.features" />
  <CarDetailDescription :description="car.description" />
  <CarDetailContact v-if="user !== undefined && user.id !== car.listerId" />
  <div
    v-if="user && user.id === car.listerId"
    @click="navigateTo(`/profile/listings/view/${car.id}`)"
    class="bg-blue-400 text-white px-10 py-3 rounded mt-4 inline-block cursor-pointer"
  >
    View Message for this enveriment
  </div>
  <div
    v-if="!user"
    @click="navigateTo('/login')"
    class="bg-blue-400 text-white px-10 py-3 rounded mt-4 inline-block cursor-pointer"
  >
    Login for submit message
  </div>
</template>
