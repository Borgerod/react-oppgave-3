"use client";

import { ThemeProvider, useTheme } from "@/contexts/ThemeContext";
import { TodoProvider } from "@/contexts/TodoContext";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import TodoApp from "@/components/TodoApp";

function AppContent() {
  const { theme } = useTheme();

  return (
    <div className={theme === "dark" ? "dark" : ""}>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
        <div className="container mx-auto px-4 py-8">
          <header className="mb-8 flex justify-between items-center">
            <h1 className="text-3xl font-bold">React Context API Demo</h1>
            <ThemeSwitcher />
          </header>

          <main className="flex justify-center">
            <TodoApp />
          </main>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <ThemeProvider>
      <TodoProvider>
        <AppContent />
      </TodoProvider>
    </ThemeProvider>
  );
}

