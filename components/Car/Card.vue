<script setup>
import heartFilled from '@/assets/img/icons/heartFilled.png';
import heartOutline from '@/assets/img/icons/heartOutline.png';

const props = defineProps({
  car: Object,
  favored: Boolean,
});

const emit = defineEmits(['favore']);
const config = useRuntimeConfig();
</script>

<template>
  <div
    class="relative border w-full overflow-hidden mb-5 cursor-pointer h-[200px] hover:shadow-2xl transition-shadow dark:shadow-blue-50"
    @click="navigateTo(`/car/${car.name}-${car.id}`)"
  >
    <img
      :src="favored ? heartFilled : heartOutline"
      class="absolute right-5 top-2 z-20 w-7"
      alt=""
      @click.stop="emit('favore', car.id)"
    />

    <div class="flex h-full">
      <img
        :src="`${config.public.supabase.url}/storage/v1/object/public/images/${car.image}`"
        alt=""
        class="w-[300px] h-full object-cover"
      />
      <div class="p-4 flex flex-col justify-between min-w-0">
        <div>
          <h1 class="text-2xl text-blue-700 dark:text-blue-300">{{ car.name }}</h1>
          <p class="text-gray-700 dark:text-inherit line-clamp-3">{{ car.description }}</p>

          <NuxtLink :to="`/car/${car.name}-${car.id}`" class="text-blue-600 hover:underline">Read More...</NuxtLink>
        </div>
        <h1 class="mt-1 text-xl">$ {{ car.price }}</h1>
      </div>
    </div>
  </div>
</template>
