<script setup>
const error = useError();
</script>

<template>
  <div class="h-screen w-full flex flex-col justify-center items-center bg-[#1A2238]">
    <h1 class="text-9xl font-extrabold text-white tracking-widest">{{ error.statusCode }}</h1>
    <div class="bg-[#FF6A3D] px-2 text-sm rounded rotate-12 absolute">Page Not Found</div>
    <p class="text-4xl font-extrabold text-white tracking-widest mt-5">{{ error.message }}</p>
    <button class="mt-5" @click="navigateTo('/')">
      <div
        class="relative inline-block text-sm font-medium text-[#FF6A3D] group active:text-orange-500 focus:outline-none focus:ring"
      >
        <span
          class="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-[#FF6A3D] group-hover:translate-y-0 group-hover:translate-x-0"
        ></span>

        <span class="relative block px-8 py-3 bg-[#1A2238] border border-current">
          <NuxtLink to="/" class="group-hover:text-white transition-colors group-hover:drop-shadow-2xl">
            Go Home
          </NuxtLink>
        </span>
      </div>
    </button>
  </div>
</template>
