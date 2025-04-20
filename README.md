# Vue 3 To-Do Application

A responsive task management application built with Vue 3, TypeScript, and Tailwind CSS.

## Features

- Create, read, update, and delete tasks
- Mark tasks as complete/incomplete
- Filter tasks by status (All, Completed, Incomplete)
- Search tasks by title and description
- Fully responsive design with mobile-friendly interface
- Floating action button on mobile devices

## Tech Stack

- Vue 3 with Composition API
- TypeScript
- Pinia for state management
- Tailwind CSS for styling
- Lucide icons
- Custom UI components

## Project Setup

### Prerequisites

- Node.js (v16+)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/vue3-todo-app.git
   cd vue3-todo-app
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to the URL shown in the terminal (typically http://localhost:5173)

## Project Structure

```
src/
├── assets/            # Static assets like images, fonts
├── components/
│   └── ui/
│       ├── BoxInformation.vue  # Task statistics component
│       ├── TodoForm.vue        # Form for creating/editing tasks
│       ├── button.ts           # Button component
│       ├── drawer.ts           # Drawer component
│       └── input.ts            # Input component
├── stores/
│   └── task-store.ts  # Pinia store for task management
├── App.vue            # Root component
└── main.ts            # Application entry point
```

## Task Store

The `task-store.ts` file manages the state for tasks. It includes:

- Task CRUD operations
- Task completion toggle
- Filtering and search functionality
- Task statistics

### Store Interface

```typescript
interface ITask {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
}
```

## Components

### BoxInformation

Displays task statistics including total, completed, and incomplete task counts.

### TodoForm

A drawer component for creating new tasks or editing existing ones. Used for both mobile and desktop.

### Main Todo Interface

The main interface includes:
- Search functionality
- Filter buttons
- Task list with completion, edit, and delete options
- Responsive layout that adapts to screen size
- Floating action button on mobile devices

## Responsive Design

The UI adapts to different screen sizes:

- **Mobile**: Compact layout with stacked elements and floating action button
- **Tablet**: Semi-expanded layout with more horizontal space
- **Desktop**: Full layout with optimal spacing and visibility

## Customization

### Styling

The application uses Tailwind CSS for styling. To customize the look and feel:

1. Modify the Tailwind configuration in `tailwind.config.js`
2. Update classes in the Vue components

### Adding New Features

To extend the application:

1. Update the task store with new functionality
2. Add new components or modify existing ones
3. Update the UI to accommodate new features

## Build for Production

```bash
npm run build
# or
yarn build
```

This will generate optimized files in the `dist` directory which can be deployed to any static hosting service.

## License

[MIT](LICENSE)