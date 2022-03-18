<template>
  <responsive-observer>
    <provide-polacoms>
      <router-view />
    </provide-polacoms>
  </responsive-observer>
</template>

<script setup lang="ts">
  // Components
  import { ResponsiveObserver, ProvidePolacoms } from 'polacoms';
</script>
