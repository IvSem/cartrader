<script setup>
//const supabase = useSupabaseClient();
const store = useStore();

const email = ref('');
const password = ref('');
//const errorMsg = ref('');
//const successMsg = ref('');
//const loading = ref(false);

//const signUpUser = async () => {
//  try {
//    errorMsg.value = '';
//    loading.value = true;
//    let { data, error } = await supabase.auth.signUp({
//      email: email.value,
//      password: password.value,
//    });
//    if (!error) {
//      navigateTo('/');
//      successMsg.value = 'Your succes restrarion!';
//    }
//    console.log('data', data);
//    if (error) throw error;
//  } catch (error) {
//    errorMsg.value = error.error_description || error.message;
//  } finally {
//    loading.value = false;
//  }
//};
</script>

<template>
  <div
    class="mt-10 relative mx-auto w-full max-w-md bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:rounded-xl sm:px-10"
  >
    <div class="w-full">
      <div class="text-center">
        <h1 class="text-3xl font-semibold text-gray-900">Sign Up</h1>
        <p class="mt-2 text-gray-500">Sign yp below to access your account</p>
      </div>
      <div class="mt-5">
        <form action="" @submit.prevent="store.signUpUser(email, password)">
          <div class="relative mt-6">
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email Address"
              class="peer mt-1 w-full border-b-2 dark:text-black border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
              autocomplete="NA"
              v-model="email"
            />
            <label
              for="email"
              class="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800"
              >Email Address</label
            >
          </div>
          <div class="relative mt-6">
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              v-model="password"
              class="peer peer dark:text-black mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
            />
            <label
              for="password"
              class="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800"
              >Password</label
            >
          </div>
          <p v-if="store.errorMsg" class="text-red-500 pt-2">{{ store.errorMsg }}</p>
          <p v-if="store.successMsg" class="text-green-500 pt-2">{{ store.successMsg }}</p>

          <div class="my-6">
            <button
              type="submit"
              class="w-full rounded-md bg-black px-3 py-4 text-white focus:bg-gray-600 focus:outline-none disabled:bg-gray-600 transition-colors"
              :disabled="store.loading"
            >
              {{ store.loading ? 'Loading...' : 'Sign Up' }}
            </button>
          </div>

          <div class="text-center text-sm text-gray-500">
            have an account yet?
            <NuxtLink
              to="/login"
              class="font-semibold text-blue-600 hover:underline focus:text-gray-800 focus:outline-none"
            >
              Log In
            </NuxtLink>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
