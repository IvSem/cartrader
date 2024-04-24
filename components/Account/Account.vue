<script setup>
const supabase = useSupabaseClient();

const loading = ref(true);
const username = ref('');
const website = ref('');
const avatar_path = ref('');

loading.value = true;
const user = useSupabaseUser();

const { data } = await supabase
  .from('profiles')
  .select(`username, website, avatar_url`)
  .eq('id', user.value.id)
  .single();

if (data) {
  username.value = data.username;
  website.value = data.website;
  avatar_path.value = data.avatar_url;
}

loading.value = false;

async function updateProfile() {
  try {
    loading.value = true;
    const user = useSupabaseUser();

    const updates = {
      id: user.value.id,
      username: username.value,
      website: website.value,
      avatar_url: avatar_path.value,
      updated_at: new Date(),
    };

    const { error } = await supabase.from('profiles').upsert(updates, {
      returning: 'minimal', // Don't return the value after inserting
    });
    if (error) throw error;
  } catch (error) {
    alert(error.message);
  } finally {
    loading.value = false;
  }
}

async function signOut() {
  try {
    loading.value = true;
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    navigateTo('/');
  } catch (error) {
    alert(error.message);
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <form class="flex flex-col gap-5 container mt-10" @submit.prevent="updateProfile">
    <AccountAvatar v-model:path="avatar_path" @upload="updateProfile" :size="10" />

    <div>
      <label for="email">Email</label>
      <input id="email" type="text" :value="user.email" disabled />
    </div>
    <div>
      <label for="username">Username</label>
      <input id="username" type="text" v-model="username" />
    </div>
    <div>
      <label for="website">Website</label>
      <input id="website" type="url" v-model="website" />
    </div>

    <div>
      <input
        type="submit"
        class="button primary block"
        :value="loading ? 'Loading ...' : 'Update'"
        :disabled="loading"
      />
    </div>

    <div>
      <button class="button block" @click="signOut" :disabled="loading">Sign Out</button>
    </div>
  </form>
</template>

<style scoped>
html,
body {
  --custom-font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans,
    Droid Sans, Helvetica Neue, sans-serif;
  --custom-bg-color: #101010;
  --custom-panel-color: #222;
  --custom-box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.8);
  --custom-color: #fff;
  --custom-color-brand: #24b47e;
  --custom-color-secondary: #666;
  --custom-border: 1px solid #333;
  --custom-border-radius: 5px;
  --custom-spacing: 5px;

  padding: 0;
  margin: 0;

  background-color: #101010;
}

* {
  color: #fff;
  box-sizing: border-box;
}

html,
body,
#__next {
  height: 100vh;
  width: 100vw;
  overflow-x: hidden;
}

/* Grid */

.container {
  width: 90%;
  margin-left: auto;
  margin-right: auto;
}

.row {
  position: relative;
  width: 100%;
}

.row [class^='col'] {
  float: left;
  margin: 0.5rem 2%;
  min-height: 0.125rem;
}

.col-1,
.col-2,
.col-3,
.col-4,
.col-5,
.col-6,
.col-7,
.col-8,
.col-9,
.col-10,
.col-11,
.col-12 {
  width: 96%;
}

.col-1-sm {
  width: 4.33%;
}

.col-2-sm {
  width: 12.66%;
}

.col-3-sm {
  width: 21%;
}

.col-4-sm {
  width: 29.33%;
}

.col-5-sm {
  width: 37.66%;
}

.col-6-sm {
  width: 46%;
}

.col-7-sm {
  width: 54.33%;
}

.col-8-sm {
  width: 62.66%;
}

.col-9-sm {
  width: 71%;
}

.col-10-sm {
  width: 79.33%;
}

.col-11-sm {
  width: 87.66%;
}

.col-12-sm {
  width: 96%;
}

.row::after {
  content: '';
  display: table;
  clear: both;
}

.hidden-sm {
  display: none;
}

@media only screen and (min-width: 33.75em) {
  /* 540px */
  .container {
    width: 80%;
  }
}

@media only screen and (min-width: 45em) {
  /* 720px */
  .col-1 {
    width: 4.33%;
  }

  .col-2 {
    width: 12.66%;
  }

  .col-3 {
    width: 21%;
  }

  .col-4 {
    width: 29.33%;
  }

  .col-5 {
    width: 37.66%;
  }

  .col-6 {
    width: 46%;
  }

  .col-7 {
    width: 54.33%;
  }

  .col-8 {
    width: 62.66%;
  }

  .col-9 {
    width: 71%;
  }

  .col-10 {
    width: 79.33%;
  }

  .col-11 {
    width: 87.66%;
  }

  .col-12 {
    width: 96%;
  }

  .hidden-sm {
    display: block;
  }
}

@media only screen and (min-width: 60em) {
  /* 960px */
  .container {
    width: 75%;
    max-width: 60rem;
  }
}

/* Forms */

label {
  display: block;
  margin: 5px 0;
  color: #666;
  font-size: 0.8rem;
  text-transform: uppercase;
}

input {
  width: 100%;
  border-radius: 5px;
  border: 1px solid #333;
  padding: 8px;
  font-size: 0.9rem;
  background-color: #101010;
  color: #fff;
}

input[disabled] {
  color: #666;
}

/* Utils */

.block {
  display: block;
  width: 100%;
}

.inline-block {
  display: inline-block;
  width: 100%;
}

.flex {
  display: flex;
}

.flex.column {
  flex-direction: column;
}

.flex.row {
  flex-direction: row;
}

.flex.flex-1 {
  flex: 1 1 0;
}

.flex-end {
  justify-content: flex-end;
}

.flex-center {
  justify-content: center;
}

.items-center {
  align-items: center;
}

.text-sm {
  font-size: 0.8rem;
  font-weight: 300;
}

.text-right {
  text-align: right;
}

.font-light {
  font-weight: 300;
}

.opacity-half {
  opacity: 50%;
}

/* Button */

button,
.button {
  color: #fff;
  border: 1px solid #333;
  background-color: #101010;
  display: inline-block;
  text-align: center;
  border-radius: 5px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  text-align: center;
  font-size: 0.9rem;
  text-transform: uppercase;
}

button.primary,
.button.primary {
  background-color: #24b47e;
  border: 1px solid #24b47e;
}

/* Widgets */

.card {
  width: 100%;
  display: block;
  border: 1px solid #333;
  border-radius: 5px;
  padding: 5px;
}

.avatar {
  border-radius: 5px;
  overflow: hidden;
  max-width: 100%;
}

.avatar.image {
  object-fit: cover;
}

.avatar.no-image {
  background-color: #333;
  border: 1px solid rgb(200, 200, 200);
  border-radius: 5px;
}

.footer {
  position: absolute;
  max-width: 100%;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-flow: row;
  border-top: 1px solid #333;
  background-color: #101010;
}

.footer div {
  padding: 5px;
  display: flex;
  align-items: center;
  width: 100%;
}

.footer div > img {
  height: 20px;
  margin-left: 10px;
}

.footer > div:first-child {
  display: none;
}

.footer > div:nth-child(2) {
  justify-content: left;
}

@media only screen and (min-width: 60em) {
  /* 960px */
  .footer > div:first-child {
    display: flex;
  }

  .footer > div:nth-child(2) {
    justify-content: center;
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

.mainHeader {
  width: 100%;
  font-size: 1.3rem;
  margin-bottom: 20px;
}

.avatarPlaceholder {
  border: 1px solid #333;
  border-radius: 5px;
  width: 35px;
  height: 35px;
  background-color: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
}

.form-widget {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-widget > .button {
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background-color: #444444;
  text-transform: none !important;
  transition: all 0.2s ease;
}

.form-widget .button:hover {
  background-color: #2a2a2a;
}

.form-widget .button > .loader {
  width: 17px;
  animation: spin 1s linear infinite;
  filter: invert(1);
}
</style>
