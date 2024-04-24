<script setup>
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue';
import { ChevronDownIcon } from '@heroicons/vue/20/solid';

const solutions = [
  {
    name: 'Insights',
    description: 'Measure actions your users take',
    href: '##',
    icon: `
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="48" height="48" rx="8" fill="#FFEDD5" />
        <path
          d="M24 11L35.2583 17.5V30.5L24 37L12.7417 30.5V17.5L24 11Z"
          stroke="#FB923C"
          stroke-width="2"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M16.7417 19.8094V28.1906L24 32.3812L31.2584 28.1906V19.8094L24 15.6188L16.7417 19.8094Z"
          stroke="#FDBA74"
          stroke-width="2"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M20.7417 22.1196V25.882L24 27.7632L27.2584 25.882V22.1196L24 20.2384L20.7417 22.1196Z"
          stroke="#FDBA74"
          stroke-width="2"
        />
      </svg>
    `,
  },
  {
    name: 'Automations',
    description: 'Create your own targeted content',
    href: '##',
    icon: `
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="48" height="48" rx="8" fill="#FFEDD5" />
        <path
          d="M28.0413 20L23.9998 13L19.9585 20M32.0828 27.0001L36.1242 34H28.0415M19.9585 34H11.8755L15.9171 27"
          stroke="#FB923C"
          stroke-width="2"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M18.804 30H29.1963L24.0001 21L18.804 30Z"
          stroke="#FDBA74"
          stroke-width="2"
        />
      </svg>
    `,
  },
  {
    name: 'Reports',
    description: 'Keep track of your growth',
    href: '##',
    icon: `
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="48" height="48" rx="8" fill="#FFEDD5" />
        <rect x="13" y="32" width="2" height="4" fill="#FDBA74" />
        <rect x="17" y="28" width="2" height="8" fill="#FDBA74" />
        <rect x="21" y="24" width="2" height="12" fill="#FDBA74" />
        <rect x="25" y="20" width="2" height="16" fill="#FDBA74" />
        <rect x="29" y="16" width="2" height="20" fill="#FB923C" />
        <rect x="33" y="12" width="2" height="24" fill="#FB923C" />
      </svg>
    `,
  },
];

const route = useRoute();
const router = useRouter();
const city = ref('');

const { makes } = useCars();
const priceRange = ref({
  min: '',
  max: '',
});

const modal = ref({
  make: false,
  location: false,
  price: false,
});

const updateModal = (key) => {
  for (const modalKey in modal.value) {
    if (modalKey !== key) {
      modal.value[modalKey] = false;
    }
  }
  modal.value[key] = !modal.value[key];
};

const priceRangeText = computed(() => {
  const minPrice = route.query.minPrice;
  const maxPrice = route.query.maxPrice;

  if (!minPrice && !maxPrice) return 'Any';
  else if (!minPrice && maxPrice) {
    return `< $${maxPrice}`;
  } else if (minPrice && !maxPrice) {
    return `> $${minPrice}`;
  } else {
    return `$${minPrice}-$${maxPrice}`;
  }
});

const onChangeLocation = () => {
  if (!city.value) return;
  navigateTo(`/city/${city.value}/car/${route.params.make}`);
  updateModal('location');
  city.value = '';
};

const onChangeMake = (make) => {
  updateModal('make');
  navigateTo(`/city/${route.params.city}/car/${make}`);
};

const onPriceChange = () => {
  updateModal('price');
  if (priceRange.value.min && priceRange.value.max) {
    if (priceRange.value.min > priceRange.value.max) {
      return;
    }
    router.push({
      query: {
        minPrice: priceRange.value.min,
        maxPrice: priceRange.value.max,
      },
    });
  }
};

const escapeKeyHandler = (e) => {
  if (e.key === 'Escape') {
    modal.value = {
      make: false,
      location: false,
      price: false,
    };
  }
};

onMounted(() => {
  document.addEventListener('keydown', escapeKeyHandler);
});

onUnmounted(() => {
  document.removeEventListener('keydown', escapeKeyHandler);
});
</script>
<template>
  <div class="shadow border w-64 mr-10 z-30 min-h-[190px]">
    <Popover v-slot="{ open }" class="relative">
      <div class="p-5 flex items-center justify-between border-b">
        <h3 class="">Location</h3>
        <PopoverButton
          :class="open ? 'text-white bg-orange-700' : 'text-white/90 bg-orange-500'"
          class="group inline-flex items-center rounded-md px-3 py-2 text-base font-medium hover:bg-orange-700 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 transition-colors"
        >
          <span> {{ route.params.city }}</span>
        </PopoverButton>
      </div>

      <transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="translate-y-1 opacity-0"
        enter-to-class="translate-y-0 opacity-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="translate-y-0 opacity-100"
        leave-to-class="translate-y-1 opacity-0"
      >
        <PopoverPanel class="absolute border shadow left-56 p-5 top-1 -m-1 bg-white dark:bg-black">
          <div class="overflow-hidden rounded-lg shadow-lg">
            <input type="text" class="border p-1 rounded dark:text-black" v-model="city" />
            <PopoverButton
              class="bg-blue-400 w-full mt-2 rounded text-white p-1 hover:bg-blue-800 transition-colors"
              @click="onChangeLocation"
            >
              Apply
            </PopoverButton>
          </div>
        </PopoverPanel>
      </transition>
    </Popover>

    <!--<h3>Make</h3>
      <h3 class="text-blue-400 dark:text-blue-300 capitalize cursor-pointer" @click="updateModal('make')">
        {{ route.params.make || 'Any' }}
      </h3>

      <div
        v-if="modal.make"
        class="absolute border shadow left-56 p-5 top-1 -m-1 bg-white dark:bg-black flex flex-wrap justify-between w-[600px]"
      >
        <h4 v-for="make in makes" :key="make" class="w-1/3" @click="onChangeMake(make)">
          {{ make }}
        </h4>
      </div>-->

    <Popover v-slot="{ open }" class="p-5 flex justify-between relative border-b">
      <div class="flex items-center justify-between gap-x-1 w-full">
        <h3 class="">Make</h3>
        <PopoverButton
          :class="open ? 'text-white bg-orange-700' : 'text-white/90 bg-orange-500'"
          class="group inline-flex items-center rounded-md px-3 py-2 text-base font-medium hover:bg-orange-700 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 transition-colors"
        >
          <span> {{ route.params.make || 'Any' }}</span>
        </PopoverButton>
      </div>

      <transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="translate-y-1 opacity-0"
        enter-to-class="translate-y-0 opacity-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="translate-y-0 opacity-100"
        leave-to-class="translate-y-1 opacity-0"
      >
        <PopoverPanel
          class="absolute border shadow left-56 p-5 top-1 -m-1 bg-white dark:bg-black flex flex-wrap justify-between w-[600px]"
        >
          <PopoverButton as="h3" v-for="make in makes" :key="make" class="w-1/3" @click="onChangeMake(make)">
            <span class="hover:underline cursor-pointer"> {{ make }}</span>
          </PopoverButton>
        </PopoverPanel>
      </transition>
    </Popover>

    <Popover v-slot="{ open }" class="p-5 flex justify-between relative border-b">
      <div class="flex items-center justify-between gap-x-1 w-full">
        <h3 class="">Price</h3>
        <PopoverButton
          :class="open ? 'text-blue-500 ' : 'text-blue-700/90 '"
          class="group inline-flex items-center text-base font-medium hover:text-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue/75 transition-colors"
        >
          <span> {{ priceRangeText }}</span>
        </PopoverButton>
      </div>

      <transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="translate-y-1 opacity-0"
        enter-to-class="translate-y-0 opacity-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="translate-y-0 opacity-100"
        leave-to-class="translate-y-1 opacity-0"
      >
        <PopoverPanel class="absolute border shadow left-56 p-5 top-1 -m-1 bg-white dark:bg-black">
          <input
            class="border p-1 rounded mb-2 dark:text-black"
            type="number"
            name="minPrice"
            id="min-price"
            placeholder="Min"
            v-model="priceRange.min"
          />
          <input
            class="border p-1 rounded dark:text-black"
            type="number"
            name="maxPrice"
            id="max-price"
            placeholder="Max"
            v-model="priceRange.max"
          />

          <PopoverButton
            class="bg-blue-400 w-full mt-2 rounded text-white p-1 hover:bg-blue-800 transition-colors"
            @click="onPriceChange"
          >
            Apply
          </PopoverButton>
        </PopoverPanel>
      </transition>
    </Popover>
    <!--<div class="p-5 flex justify-between relative border-b">
      <h3>Price</h3>
      <h3 class="text-blue-400 dark:text-blue-300 capitalize cursor-pointer" @click="updateModal('price')">
        {{ priceRangeText }}
      </h3>

      <div v-if="modal.price" class="absolute border shadow left-56 p-5 top-1 -m-1 bg-white dark:bg-black">
        <input
          class="border p-1 rounded mb-2 dark:text-black"
          type="number"
          name="minPrice"
          id="min-price"
          placeholder="Min"
          v-model="priceRange.min"
        />
        <input
          class="border p-1 rounded dark:text-black"
          type="number"
          name="maxPrice"
          id="max-price"
          placeholder="Max"
          v-model="priceRange.max"
        />

        <button
          class="bg-blue-400 w-full mt-2 rounded text-white p-1 hover:bg-blue-800 transition-colors"
          @click="onPriceChange"
        >
          Apply
        </button>
      </div>
    </div>-->
  </div>
</template>
