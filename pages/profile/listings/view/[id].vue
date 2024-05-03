<script setup>
definePageMeta({
  layout: 'custom',
});

const route = useRoute();

const { data: messages } = useFetch(`/api/car/listings/${route.params.id}/message`);
</script>

<template>
  <div class="rounded shadow mt-20">
    <CarMessageCard
      v-if="messages && messages.length > 0"
      v-for="message in messages"
      :key="message.id"
      :message="message"
    />

    <h1 v-else>Not message</h1>
  </div>
</template>
