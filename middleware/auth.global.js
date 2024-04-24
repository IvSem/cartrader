//export default defineNuxtRouteMiddleware((to, from) => {
//  if (to.path.includes('account')) {
//    const user = useSupabaseUser();
//    if (!user.value) {
//      return navigateTo('/login');
//    }
//  }
//});

export default defineNuxtRouteMiddleware((to, from) => {
  const protectedRoutes = ['account', 'profile'];
  const user = useSupabaseUser();

  if (protectedRoutes.some((route) => to.path.includes(route))) {
    if (!user.value) {
      return navigateTo('/login');
    }
  }
  if (to.path.includes('login') && user.value) {
    return navigateTo('/');
  }
  if (to.path.includes('register') && user.value) {
    return navigateTo('/');
  }
});
