<script setup>
//const { cars } = useCars();
const favorite = useLocalStorage('favorite', {});

const handleFavorite = (id) => {
  if (id in favorite.value) {
    delete favorite.value[id];
  } else {
    favorite.value = {
      ...favorite.value,
      [id]: true,
    };
  }
};

const props = defineProps({
  cars: Array,
});
</script>

<template>
  <div class="w-full">
    <ClientOnly>
      <CarCard v-for="car in cars" :key="car.id" :car="car" @favore="handleFavorite" :favored="car.id in favorite" />
    </ClientOnly>
  </div>
</template>
