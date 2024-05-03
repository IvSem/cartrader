<script setup>
const props = defineProps({
  car: Object,
});
const config = useRuntimeConfig();
const supabase = useSupabaseClient();
const username = ref('');
const avatarUrl = ref('');
const src = ref('');

const { data } = await supabase
  .from('profiles')
  .select(`username, website, avatar_url`)
  .eq('id', props.car.listerId)
  .single();

if (data) {
  username.value = data.username;
  avatarUrl.value = data.avatar_url;
}

const downloadImage = async () => {
  try {
    const { data, error } = await supabase.storage.from('avatars').download(avatarUrl.value);
    if (error) throw error;
    src.value = URL.createObjectURL(data);
  } catch (error) {
    console.error('Error downloading image: ', error.message);
  }
};
downloadImage();
</script>

<template>
  <div class="mt-10">
    <img
      :src="`${config.public.supabase.url}/storage/v1/object/public/images/${car.image}`"
      class="w-full h-80 object-contain"
      alt=""
    />

    <div class="flex gap-x-2 items-center mt-10">
      <p>Created at :</p>
      <div class="flex gap-x-2 items-center">
        <div class="w-10 h-10 rounded-full overflow-hidden relative bg-gray-400">
          <img :src="src" class="absolute w-full h-full object-cover" alt="" />
        </div>
        <p class="text-lg font-bold text-black">{{ username }}</p>
      </div>
    </div>

    <h1 class="text-4xl">{{ car.name }}</h1>
    <div class="text-slate-500 flex text-lg mt-3 border-b pb-5 justify-between">
      <div class="flex">
        <p class="mr-2">{{ car.numberOfSeats }} seats</p>
        <p class="mr-2">|</p>
        <p class="mr-2">{{ car.miles }} miles</p>
      </div>
      <div>
        <p class="text-slate-500 text-lg">
          City:
          <span
            class="font-bold underline cursor-pointer hover:text-blue-500 transition-colors"
            @click="navigateTo(`/city/${car.city}/car`)"
            >{{ car.city }}</span
          >
        </p>
      </div>
      <div>
        <p class="font-bold text-2xl">$ {{ car.price }}</p>
      </div>
    </div>
  </div>
</template>
