<script setup>
import { Switch } from '@headlessui/vue';
const colorMode = useColorMode();
const enabled = ref(false);

const toogleTheme = () => {
  if (colorMode.preference === 'dark') {
    colorMode.preference = 'light';
    return;
  }
  if (colorMode.preference === 'light') {
    colorMode.preference = 'dark';
    return;
  }
};
</script>

<template>
  <ClientOnly>
    <Switch
      v-model="enabled"
      @click="
        () => {
          if ($colorMode.preference === 'light') {
            $colorMode.preference = 'dark';
            return;
          }
          if ($colorMode.preference === 'dark') {
            $colorMode.preference = 'light';
            return;
          }
        }
      "
      :class="enabled ? 'bg-teal-900' : 'bg-teal-700'"
      class="relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
    >
      <span class="sr-only">Use setting</span>
      <span
        aria-hidden="true"
        :class="enabled ? 'translate-x-9' : 'translate-x-0'"
        class="pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out"
      />
    </Switch>
  </ClientOnly>
</template>
