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
    <nav class="fixed w-full border-b px-6 py-4">
      <h1 class="text-xl font-semibold">To Do Apps</h1>
    </nav>
  </header>

  <main class="h-screen w-screen py-20 px-52 space-y-6 bg-white">
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
          <Search class="size-6 text-muted-foreground" />
        </span>
      </div>

      <div class="flex items-center">
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

    <div class="flex items-center space-x-2 w-full">
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
        class="flex border rounded-lg p-4 justify-between w-full items-center"
        :class="{ 'bg-gray-50': item.completed }"
      >
        <div class="flex-col flex h-full space-y-5">
          <h3 class="font-semibold text-xl" :class="{ 'line-through text-gray-500': item.completed }">{{ item.title }}</h3>
          <p :class="{ 'text-gray-500': item.completed }">{{ item.description }}</p>
        </div>
        <div class="space-x-3">
          <Button
            variant="destructive"
            size="icon"
            class="rounded-md cursor-pointer"
            @click="taskStore.deleteTask(item.id)"
          >
            <Trash class="size-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            class="rounded-md cursor-pointer"
            @click="openEditDrawer(item.id)"
          >
            <Pencil class="size-4" />
          </Button>
          <Button
            v-if="!item.completed"
            variant="outline"
            size="icon"
            class="rounded-md cursor-pointer"
            @click="taskStore.toggleTaskCompletion(item.id)"
          >
            <Check class="size-4 text-green-500" />
          </Button>
        </div>
      </div>
    </div>
  </main>
</template>