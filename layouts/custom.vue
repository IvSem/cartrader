<template>
  <div class="wrapper">
    <AppNavBar />

    <main class="flex-auto">
      <div class="mx-auto mt-4 max-w-7xl space-y-4 px-4 xs:px-8 sm:px-10 lg:px-16 pb-16"><slot /></div>
    </main>

    <AppFooter />

    <div class="fixed bottom-10 right-5 z-50">
      <SwitchTheme />
    </div>
  </div>
</template>
