<script setup>
definePageMeta({
  layout: 'custom',
});
useHead({
  title: 'Create a New Listing',
});

const { makes } = useCars();
const user = useSupabaseUser();
const supabase = useSupabaseClient();
const submitButton = ref(null);

const info = useState('adInfo', () => {
  return {
    make: '',
    model: '',
    year: '',
    miles: '',
    price: '',
    city: '',
    seats: '',
    features: '',
    description: '',
    image: null,
  };
});

const errorMessage = ref('');

const onChangeInput = (data, name) => {
  info.value[name] = data;

  if (name === 'image') {
    clearFormFlag.value = false;
  }
};

const inputs = [
  {
    id: 1,
    title: 'Model *',
    name: 'model',
    placeholder: 'Civic',
  },
  {
    id: 2,
    title: 'Year *',
    name: 'year',
    placeholder: '2019',
  },
  {
    id: 3,
    title: 'Price *',
    name: 'price',
    placeholder: '$0.00',
  },
  {
    id: 4,
    title: 'Miles *',
    name: 'miles',
    placeholder: '10000',
  },
  {
    id: 5,
    title: 'City *',
    name: 'city',
    placeholder: 'Austin',
  },
  {
    id: 6,
    title: 'Number of Seats *',
    name: 'seats',
    placeholder: '5',
  },
  {
    id: 7,
    title: 'Features *',
    name: 'features',
    placeholder: 'Leather Interior, No Accidents',
  },
];

const isButtonDisabled = computed(() => {
  for (let key in info.value) {
    if (!info.value[key]) return true;
  }

  return false;
});

const handleSubmit = async () => {
  submitButton.value.disabled = true;
  const fileName = Math.floor(Math.random() * 10000000000000);
  const { data, error } = await supabase.storage.from('images').upload('public/' + fileName, info.value.image);
  if (error) {
    return (errorMessage.value = 'Cannot upload image');
  }
  const body = {
    ...info.value,
    city: info.value.city.toLocaleLowerCase(),
    features: info.value.features.split(', '),
    numberOfSeats: parseInt(info.value.seats),
    miles: parseInt(info.value.miles),
    price: parseInt(info.value.price),
    year: parseInt(info.value.year),
    name: `${info.value.make} ${info.value.model}`,
    listerId: user.value.id,
    image: data.path,
  };
  delete body.seats;

  try {
    const response = await $fetch('/api/car/listings', {
      method: 'POST',
      body: body,
    });
    info.value = {
      make: '',
      model: '',
      year: '',
      miles: '',
      price: '',
      city: '',
      seats: '',
      features: '',
      description: '',
      image: null,
    };
    clearFormFlag.value = true;
    navigateTo('/profile/listings');
  } catch (error) {
    errorMessage.value = error.statusMessage;
    await supabase.storage.from('images').remove(data.path);
  }
};

const clearFormFlag = ref(false);
</script>

<template>
  <div>
    <div class="mt-24">
      <h1 class="text-6xl">Create a New Listing</h1>
    </div>
    <div class="shadow rounded p-3 mt-5 flex flex-wrap justify-between">
      <CarAdSelect title="Make *" :options="makes" name="make" @change-input="onChangeInput" />
      <CarAdInput
        v-for="input in inputs"
        :key="input.id"
        :title="input.title"
        :name="input.name"
        :placeholder="input.placeholder"
        @change-input="onChangeInput"
      />
      <CarAdTextarea title="Description *" name="description" placeholder="" @change-input="onChangeInput" />
      <CarAdImage @change-input="onChangeInput" :clearForm="clearFormFlag" />
      <div class="text-center w-full">
        <button
          :disabled="isButtonDisabled"
          @click="handleSubmit"
          class="bg-blue-400 w-full mt-2 rounded text-white p-3 disabled:bg-blue-200"
          ref="submitButton"
        >
          Submit
        </button>

        <p class="mt-3 text-red-400" v-if="errorMessage">{{ errorMessage }}</p>
      </div>
    </div>
  </div>
</template>
