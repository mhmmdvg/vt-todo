<script setup lang="ts">
defineProps<{
  tasks: string;
}>();
</script>

<template>
  <div class="border min-h-64 h-64 rounded-3xl p-8 flex">
    <div class="flex flex-col h-full justify-between">
      <h1 class="text-xl">Today</h1>
      <p class="text-3xl font-semibold">{{ tasks }} Tasks</p>
    </div>
  </div>
</template>
