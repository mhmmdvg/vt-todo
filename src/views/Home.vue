<script setup lang="ts">
import BoxInformation from "@/components/ui/BoxInformation.vue";
import { Check, Pencil, Plus, Search, Trash } from "lucide-vue-next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Drawer } from "@/components/ui/drawer";
import TodoForm from "@/components/ui/TodoForm.vue";
import { useTaskStore } from "@/stores/task-store.ts";
import { ref } from "vue";

const FILTERS = ["All", "Completed", "Incomplete"];

const isDrawerOpen = ref(false);
const taskStore = useTaskStore();

function openEditDrawer(taskId: string) {
  taskStore.setTaskToEdit(taskId);
  isDrawerOpen.value = true;
}

function closeDrawer() {
  isDrawerOpen.value = false;
  taskStore.clearTaskToEdit();
}

function openAddDrawer() {
  taskStore.clearTaskToEdit();
  isDrawerOpen.value = true;
}
</script>

<template>
  <header>
    <nav class="fixed w-full border-b px-4 sm:px-6 py-4 bg-white z-10">
      <h1 class="text-xl font-semibold">To Do Apps</h1>
    </nav>
  </header>

  <main class="min-h-screen w-full pt-20 pb-20 sm:pb-12 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24 space-y-4 sm:space-y-6 bg-white">
    <BoxInformation :tasks="taskStore.taskStats" />

    <!-- Toolbar -->
    <div class="flex items-center justify-between w-full">
      <div class="relative rounded-lg border p-2 w-full max-w-sm items-center">
        <Input
          id="search"
          type="text"
          placeholder="Search..."
          class="pl-8 w-full h-full active:ring-0 active:outline-none border-0 shadow-none"
          @input="(e: any) => taskStore.setSearchQuery(e.target.value)"
        />
        <span
          class="absolute start-0 inset-y-0 flex items-center justify-center px-2"
        >
          <Search class="size-5 text-muted-foreground" />
        </span>
      </div>

      <!-- Desktop Add Button - Hidden on mobile -->
      <div class="hidden sm:flex items-center">
        <Drawer v-model:open="isDrawerOpen">
          <Button
            variant="default"
            size="icon"
            class="rounded-full cursor-pointer"
            @click="openAddDrawer"
          >
            <Plus class="size-4" />
          </Button>

          <TodoForm @close="closeDrawer" />
        </Drawer>
      </div>
    </div>

    <div class="flex flex-wrap items-center gap-2 w-full">
      <Button
        v-for="filter in FILTERS"
        :key="filter"
        :variant="taskStore.activeFilter === filter.toLowerCase() ? 'default' : 'outline'"
        size="sm"
        class="shadow-none cursor-pointer"
        @click="taskStore.setFilter(filter.toLowerCase())"
      >
        {{ filter }}
      </Button>
    </div>

    <!-- Content -->
    <div class="flex flex-col space-y-3">
      <div
        v-for="item in taskStore.filteredTasks"
        :key="item.id"
        class="flex flex-col sm:flex-row border rounded-lg p-3 sm:p-4 justify-between w-full items-start sm:items-center gap-4"
        :class="{ 'bg-gray-50': item.completed }"
      >
        <div class="flex-col flex h-full space-y-2 sm:space-y-3 w-full sm:w-auto">
          <h3 class="font-semibold text-lg sm:text-xl" :class="{ 'line-through text-gray-500': item.completed }">{{ item.title }}</h3>
          <p class="text-sm sm:text-base" :class="{ 'text-gray-500': item.completed }">{{ item.description }}</p>
        </div>
        <div class="flex space-x-2 sm:space-x-3 self-end sm:self-auto">
          <Button
            variant="destructive"
            size="icon"
            class="rounded-md cursor-pointer w-8 h-8 sm:w-10 sm:h-10"
            @click="taskStore.deleteTask(item.id)"
          >
            <Trash class="size-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            class="rounded-md cursor-pointer w-8 h-8 sm:w-10 sm:h-10"
            @click="openEditDrawer(item.id)"
          >
            <Pencil class="size-4" />
          </Button>
          <Button
            v-if="!item.completed"
            variant="outline"
            size="icon"
            class="rounded-md cursor-pointer w-8 h-8 sm:w-10 sm:h-10"
            @click="taskStore.toggleTaskCompletion(item.id)"
          >
            <Check class="size-4 text-green-500" />
          </Button>
        </div>
      </div>
    </div>
  </main>

  <!-- Floating Add Button -->
    <Button
      variant="default"
      class="sm:hidden fixed bottom-6 right-6 rounded-full w-14 h-14 shadow-lg cursor-pointer z-20"
      @click="openAddDrawer"
    >
      <Plus class="size-6" />
    </Button>
  
</template>