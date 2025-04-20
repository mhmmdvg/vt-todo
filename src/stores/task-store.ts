import { defineStore } from "pinia";
import { computed, ref } from "vue";

export interface ITask {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: number;
}

export const useTaskStore = defineStore("tasks", () => {
  const tasks = ref<ITask[]>([]);
  const activeFilter = ref("all");
  const searchQuery = ref("");
  const taskToEdit = ref<ITask | null>(null);


  const initializeTasks = () => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      try {
        tasks.value = JSON.parse(storedTasks);
      } catch (error) {
        console.error("Error parsing tasks from localStorage:", error);
        tasks.value = [];
      }
    }
  };

  initializeTasks();

  const saveTasksToLocalStorage = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks.value));
  };

  const addTask = (title: string, description: string) => {
    if (!title.trim()) return null;

    const newTask: ITask = {
      id: generateId(),
      title: title.trim(),
      description: description.trim(),
      completed: false,
      createdAt: Date.now(),
    };

    tasks.value.push(newTask);
    saveTasksToLocalStorage();
    return newTask;
  };

  const deleteTask = (id: string) => {
    tasks.value = tasks.value.filter((task) => task.id !== id);
    saveTasksToLocalStorage();
  };

  const toggleTaskCompletion = (id: string) => {
    const task = tasks.value.find((task) => task.id === id);
    if (task) {
      task.completed = !task.completed;
      saveTasksToLocalStorage();
    }
  };

  const updateTask = (id: string, title: string, description: string) => {
    if (!title.trim()) return false;

    const task = tasks.value.find((task) => task.id === id);
    if (task) {
      task.title = title.trim();
      task.description = description.trim();
      saveTasksToLocalStorage();
      return true;
    }
    return false;
  };

  const setTaskToEdit = (id: string) => {
    taskToEdit.value = tasks.value.find((task) => task.id === id) || null;
  };

  const clearTaskToEdit = () => {
    taskToEdit.value = null;
  };

  const setFilter = (filter: string) => {
    activeFilter.value = filter;
  };

  const setSearchQuery = (query: string) => {
    searchQuery.value = query;

    console.log("check", query)
    console.log("check 2", searchQuery.value)

  };

  const generateId = (): string => {
    return Math.random().toString(36).substring(2, 9);
  };

  const filteredTasks = computed(() => {
    let result = [...tasks.value];

    if (activeFilter.value === "completed") {
      result = result.filter((task) => task.completed);
    } else if (activeFilter.value === "incomplete") {
      result = result.filter((task) => !task.completed);
    }

    if (searchQuery.value.trim()) {
      const query = searchQuery.value.toLowerCase();
      result = result.filter(
        (task) =>
          task.title.toLowerCase().includes(query) ||
          task.description.toLowerCase().includes(query),
      );
    }

    return result.sort((a, b) => b.createdAt - a.createdAt);
  });

  const taskStats = computed(() => {
    const completed = tasks.value.filter((task) => task.completed).length;
    const total = tasks.value.length;
    return `${completed}/${total}`;
  });

  return {
    // State
    tasks,
    activeFilter,
    searchQuery,
    taskToEdit,

    // Actions
    addTask,
    deleteTask,
    toggleTaskCompletion,
    updateTask,
    setTaskToEdit,
    clearTaskToEdit,
    setFilter,
    setSearchQuery,

    // Getters
    filteredTasks,
    taskStats,
  };
});
