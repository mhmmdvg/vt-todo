<script setup lang="ts">
import {
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useTaskStore } from "@/stores/task-store.ts";
import { ref, watch } from "vue";


const emit = defineEmits<{
  (e: 'close'): void;
}>();

const taskStore = useTaskStore()
const taskTitle = ref("");
const taskDescription = ref("");
const isEditing = ref(false);
const editTaskId = ref("");

watch(
  () => taskStore.taskToEdit,
  (newTaskToEdit) => {
    if (newTaskToEdit) {
      taskTitle.value = newTaskToEdit.title;
      taskDescription.value = newTaskToEdit.description;
      editTaskId.value = newTaskToEdit.id;
      isEditing.value = true;
    } else {
      isEditing.value = false;
    }
  },
  { immediate: true }
);

function handleSubmit() {
  if (!taskTitle.value.trim()) {
    alert("Task title is required!");
    return;
  }

  if (isEditing.value && editTaskId.value) {
    taskStore.updateTask(editTaskId.value, taskTitle.value, taskDescription.value);
  } else {
    taskStore.addTask(taskTitle.value, taskDescription.value);
  }

  resetForm();
  emit("close");
}

function resetForm() {
  taskTitle.value = "";
  taskDescription.value = "";
  isEditing.value = false;
  editTaskId.value = "";
  taskStore.clearTaskToEdit();
}
</script>

<template>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>{{ isEditing ? 'Edit Task' : 'Add New Task' }}</DrawerTitle>
      <DrawerDescription>{{ isEditing ? 'Update task details below' : 'Enter task details below' }}</DrawerDescription>
    </DrawerHeader>

    <div class="p-4 flex flex-col space-y-3 w-full">
      <Input type="text" placeholder="Task title" v-model="taskTitle" />
      <Textarea
        class="h-24 min-h-24 max-h-24"
        placeholder="Type your description here."
        v-model="taskDescription"
      />
    </div>

    <DrawerFooter>
      <Button @click="handleSubmit">{{ isEditing ? 'Update' : 'Submit' }}</Button>
      <DrawerClose>
        <Button class="w-full" variant="outline" @click="resetForm">Cancel</Button>
      </DrawerClose>
    </DrawerFooter>
  </DrawerContent>
</template>
