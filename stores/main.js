import { defineStore } from 'pinia';

export const useStore = defineStore('main', () => {
  const supabase = useSupabaseClient();
  const userData = useSupabaseUser();

  const errorMsg = ref('');
  const successMsg = ref('');
  const loading = ref(false);
  const isLoggedIn = ref(false);
  const user = ref(null);

  const fetchUser = async () => {
    if (userData.value) {
      const { data } = await supabase
        .from('profiles')
        .select(`username, website, avatar_url`)
        .eq('id', userData.value.id)
        .single();

      if (data) {
        user.value = {
          ...data,
        };
        isLoggedIn.value = true;
        const downloadImage = async () => {
          try {
            const { data: userData, error } = await supabase.storage.from('avatars').download(user.value.avatar_url);
            if (error) throw error;
            user.value.src = URL.createObjectURL(userData);
          } catch (error) {}
        };
        downloadImage();
      }
    }
    return;
  };

  const signUpUser = async (email, password) => {
    try {
      errorMsg.value = '';
      loading.value = true;
      let { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });
      if (!error) {
        fetchUser();
        navigateTo('/');
        successMsg.value = 'Your succes restrarion!';
        setTimeout(() => {
          successMsg.value = '';
        }, 1000);
      }
      console.log('data', data);
      if (error) throw error;
    } catch (error) {
      errorMsg.value = error.error_description || error.message;
    } finally {
      loading.value = false;
    }
  };

  const signIn = async (email, password) => {
    try {
      errorMsg.value = '';
      loading.value = true;
      let { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      if (!error) {
        fetchUser();
        successMsg.value = 'Your succes logined!';
        navigateTo('/');
        setTimeout(() => {
          successMsg.value = '';
        }, 1000);
      }
      if (error) throw error;
    } catch (error) {
      errorMsg.value = error.error_description || error.message;
    } finally {
      loading.value = false;
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      $reset();
      navigateTo('/');
    } catch (error) {
      console.log('error', error.message);
    }
  };

  const $reset = () => {
    loading.value = false;
    errorMsg.value = '';
    successMsg.value = '';
    user.value = null;
    isLoggedIn.value = false;
  };
  return { user, isLoggedIn, fetchUser, signOut, signIn, loading, errorMsg, successMsg, $reset, signUpUser };
});
