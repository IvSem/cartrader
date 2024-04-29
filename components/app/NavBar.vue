<script setup>
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue';
import { ChevronDownIcon } from '@heroicons/vue/20/solid';

const router = useRouter();
const store = useStore();
</script>

<template>
  <header
    class="sticky w-full top-0 z-50 space-x-1 flex justify-between items-center p-4 shadow-md bg-white dark:bg-slate-600 transition-colors"
  >
    <NuxtLink @click="router.push('/')" class="font-mono text-3xl text-black dark:text-white cursor-pointer">
      Cartrader
    </NuxtLink>

    <div v-if="store.isLoggedIn" class="flex gap-x-2 items-center">
      <div class="w-10 h-10 rounded-full overflow-hidden relative bg-gray-400">
        <img v-if="store.user.src" :src="store.user.src" alt="" class="absolute w-full h-full object-cover" />
        <img v-else src="~/assets/img/icons/heartFilled.png" alt="" />
      </div>

      <Menu as="div" class="relative inline-block text-left">
        <div>
          <MenuButton
            class="inline-flex w-full justify-center rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
          >
            {{ store.user.username }}
            <ChevronDownIcon class="-mr-1 ml-2 h-5 w-5 text-violet-200 hover:text-violet-100" aria-hidden="true" />
          </MenuButton>
        </div>

        <transition
          enter-active-class="transition duration-100 ease-out"
          enter-from-class="transform scale-95 opacity-0"
          enter-to-class="transform scale-100 opacity-100"
          leave-active-class="transition duration-75 ease-in"
          leave-from-class="transform scale-100 opacity-100"
          leave-to-class="transform scale-95 opacity-0"
        >
          <MenuItems
            class="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
          >
            <div class="px-1 py-1">
              <MenuItem v-slot="{ active }">
                <button
                  :class="[
                    active ? 'bg-violet-500 text-white' : 'text-gray-900',
                    'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                  ]"
                  @click="navigateTo('/account')"
                >
                  Account
                </button>
              </MenuItem>
            </div>
            <div class="px-1 py-1">
              <MenuItem v-slot="{ active }">
                <button
                  :class="[
                    active ? 'bg-orange-500 text-white' : 'text-gray-900',
                    'group flex w-full items-center rounded-md px-2 py-2 text-sm bg-orange-400',
                  ]"
                  @click="store.signOut"
                >
                  Log Out
                </button>
              </MenuItem>
            </div>
          </MenuItems>
        </transition>
      </Menu>
    </div>
    <div v-else class="flex gap-x-2">
      <NuxtLink to="/login" class="p-2 bg-orange-400 hover:bg-orange-500 transition-colors rounded text-black"
        >Log In</NuxtLink
      >
      <NuxtLink to="/register" class="p-2 bg-green-400 hover:bg-green-500 transition-colors rounded text-black"
        >Sign Up</NuxtLink
      >
    </div>
  </header>
</template>
