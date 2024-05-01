<script setup>
const route = useRoute();

const { data: car } = await useFetchCar(route.params.id);
//const { cars } = useCars();
//const user = useSupabaseUser()
const { toTitleCase } = useUtilities();
definePageMeta({
  layout: 'custom',
});
useHead({
  title: `${toTitleCase(route.params.name)}`,
});

//const car = computed(() => {
//	return cars.find((car) => {
//		return car.id === parseInt(route.params.id);
//	});
//});

//if (!car.value) {
//	throw createError({
//		status: '404',
//		message: `Car with ID ${route.params.id} does not exist`,
//	});
//}
</script>
<template>
  <CarDetailHero :car="car" />
  <CarDetailAttributes :features="car.features" />
  <CarDetailDescription :description="car.description" />
  <CarDetailContact />
</template>
