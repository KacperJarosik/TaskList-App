import {Task} from "./Task";

export class Category {
constructor(id, title) {
        this.id = id;
        this.title = title;
        this.tasks = [];

    }

   async addTask(task) {
        this.tasks.push(task);
        this.tasks.sort((a, b) => new Date(a.date) - new Date(b.date)); // Sort tasks by date
    }

    async removeTask(taskId) {
        this.tasks = this.tasks.filter(task => task.id !== taskId);

    }

    async updateTask(taskId, updatedTask) {
        const taskIndex = this.tasks.findIndex(task => task.id === taskId);
        if (taskIndex !== -1) {
            this.tasks[taskIndex] = { ...this.tasks[taskIndex], ...updatedTask };
            this.tasks.sort((a, b) => new Date(a.date) - new Date(b.date)); // Sort tasks by date

        }
    }

    async updateTaskText(taskId, newText) {
        const task = this.tasks.find(task => task.id === taskId);
        if (task) {
            task.text = newText;

        }
    }

    async updateTaskDate(taskId, newDate) {
        const task = this.tasks.find(task => task.id === taskId);
        if (task) {
            task.date = newDate;
            this.tasks.sort((a, b) => new Date(a.date) - new Date(b.date)); // Sort tasks by date
        }
    }

    // New method to sort tasks by date in ascending order
    sortTasksByDateASC() {
        this.tasks.sort((a, b) => new Date(a.date) - new Date(b.date));
    }

    // New method to sort tasks by date in descending order
    sortTasksByDateDESC() {
        this.tasks.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    // New method to sort tasks by name in ascending order
    sortTasksByNameASC() {
        this.tasks.sort((a, b) => a.text.localeCompare(b.text));
    }

    // New method to sort tasks by name in descending order
    sortTasksByNameDESC() {
        this.tasks.sort((a, b) => b.text.localeCompare(a.text));
    }
    
}
export function useCategory(id, title) {

return new Category(id, title);
}