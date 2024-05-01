<script setup>
definePageMeta({
  layout: 'custom',
});

const route = useRoute();

const { data: messages } = useFetch(`/api/car/listings/${route.params.id}/message`);
console.log(':>  messages:', messages.value);
</script>

<template>
  <div class="rounded shadow mt-20">
    <CarMessageCard v-for="message in messages" :key="message.id" :message="message" />
  </div>
</template>
