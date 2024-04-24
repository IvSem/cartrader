<script setup>
const city = ref('');
const cityError = ref(false);
const handleSearch = () => {
  if (!city.value) {
    return (cityError.value = true);
  }
  navigateTo(`/city/${city.value}/car`);
};
</script>
<template>
  <div class="z-10 absolute w-full h-full flex flex-col justify-center items-center">
    <div class="text-center">
      <h1 class="text-8xl font-serif mb-10 text-white">Find your car</h1>
    </div>
    <div
      class="w-full max-w-[1000px] bg-white rounded-full my-3 overflow-hidden text-2xl font-serif flex justify-between drop-shadow-2xl mx-auto"
    >
      <form action="#" @submit.prevent="handleSearch" class="flex w-full">
        <input
          type="text"
          class="py-3 flex-grow px-5 w-full text-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all rounded-l-full dark:text-black"
          :class="cityError ? 'border-2 border-red-500' : 'border-2 border-transparent'"
          placeholder="Search by city..."
          v-model="city"
        />
        <button class="bg-sky-400 px-10 text-white hover:bg-sky-500 transition-colors" type="submit">Search</button>
      </form>
    </div>
  </div>
</template>
