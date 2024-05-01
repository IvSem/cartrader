<script setup>
const route = useRoute();

const message = reactive({
  name: '',
  email: '',
  phone: '',
  message: '',
});
const disabledButton = computed(() => {
  for (let key in message) {
    if (!message[key]) return true;
  }
  return false;
});

const errorMessage = ref('');
const successMessage = ref('');

const onSubmit = async () => {
  try {
    const response = await $fetch(`/api/car/listings/${route.params.id}/message`, {
      method: 'POST',
      body: message,
    });

    for (let key in message) {
      message[key] = '';
    }
    successMessage.value = 'Message sent';
    errorMessage.value = '';
  } catch (error) {
    errorMessage.value = error.statusMessage;
    successMessage.value = '';
  } finally {
  }
};
</script>

<template>
  <div class="mt-10">
    <div class="flex w-[600px] justify-between">
      <input type="text" class="border p-1" placeholder="Name" v-model="message.name" />
      <input type="text" class="border p-1" placeholder="Email" v-model="message.email" />
      <input type="text" class="border p-1" placeholder="Phone" v-model="message.phone" />
    </div>
    <div class="flex mt-4 w-[600px]">
      <textarea class="border p-1 w-full" placeholder="Message" v-model="message.message"></textarea>
    </div>
    <p v-if="errorMessage" class="text-red-400 mt-10">{{ errorMessage }}</p>
    <p v-if="successMessage" class="text-green-400 mt-10">{{ successMessage }}</p>

    <button
      class="bg-blue-400 text-white px-10 py-3 rounded mt-4 disabled:bg-blue-100"
      @click="onSubmit"
      :disabled="disabledButton"
    >
      Submit
    </button>
  </div>
</template>
