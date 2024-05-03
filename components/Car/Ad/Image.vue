<script setup>
const props = defineProps({
  clearForm: Boolean,
});

const image = useState('carImage', () => {
  return {
    preview: null,
    image: null,
  };
});

const emits = defineEmits(['changeInput']);

const onImageUpload = (event) => {
  const input = event.target;
  if (input.files) {
    const reader = new FileReader();
    reader.onload = (e) => {
      image.value.preview = e.target.result;
    };
    image.value.image = input.files[0];
    reader.readAsDataURL(input.files[0]);
    emits('changeInput', input.files[0], 'image');
  }
};

const resetImage = () => {
  image.value = {
    preview: null,
    image: null,
  };
};

watch(
  () => props.clearForm,
  (newValue) => {
    if (newValue) {
      resetImage();
    }
  }
);
</script>

<template>
  <div class="col-md-5 offset-md-1 mt-2 w-[100%]">
    <label for="" class="text-cyan-500 mb-1 text-sm">Image*</label>
    <form class="mt-2" @submit.prevent>
      <div class="form-group">
        <div class="relative w-80 border border-dashed">
          <input
            id="file-input"
            type="file"
            accept="image/*"
            class="opacity-0 absolute top-0 left-0 w-full h-full cursor-pointer pointer-events-none hidden"
            @change="onImageUpload"
          />
          <label for="file-input" class="w-full h-full text-center py-3 cursor-pointer inline-block"
            >Browser File</label
          >
        </div>
        <div class="border p-2 mt-3 w-56 relative" v-if="image.preview">
          <img :src="image.preview" class="max-w-full h-full" />

          <button
            class="w-6 h-6 bg-red-500 flex items-center justify-center text-white rounded-full leading-none absolute top-0 right-0 hover:bg-red-400"
            @click="resetImage"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" class="w-3 h-3 inline-block fill-current">
              <path
                d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z"
              />
            </svg>
          </button>
        </div>
      </div>
    </form>
  </div>
</template>
