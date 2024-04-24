<template>
  <div class="wrapper">
    <AppNavBar />

    <main class="flex-auto">
      <slot />
    </main>

    <AppFooter />

    <div class="fixed bottom-10 right-5 z-50">
      <SwitchTheme />
    </div>
  </div>
</template>
