import { Category } from "./Category";
import { Task } from "./Task";

export class TaskManager {
    constructor() {
        this.categories = [];
        this.nextCategoryId = 1;
        this.nextTaskId = 1;
    }

    // Load categories and tasks from local storage
    loadFromStorage() {
        const savedCategories = localStorage.getItem('categories');
        if (savedCategories) {
            const parsedCategories = JSON.parse(savedCategories);
            this.categories = parsedCategories.map(categoryData => {
                const category = new Category(categoryData.id, categoryData.title);
                categoryData.tasks.forEach(taskData => {
                    category.addTask(new Task(taskData.id, taskData.text, taskData.date, taskData.status, taskData.details));
                });
                return category;
            });
            this.nextTaskId = Math.max(0, ...parsedCategories.flatMap(category => category.tasks.map(task => task.id))) + 1;
            this.nextCategoryId = Math.max(0, ...parsedCategories.map(category => category.id)) + 1;
        } else {
            this.initializeExampleData();
        }
    }

    // Save categories and tasks to local storage
    saveToStorage() {
        localStorage.setItem('categories', JSON.stringify(this.categories));
    }

    // Add a new category
    addCategory(title) {
        const newCategory = new Category(this.nextCategoryId, title || `Category ${this.nextCategoryId}`);
        this.categories.push(newCategory);
        this.nextCategoryId += 1;
        this.saveToStorage();
    }

    // Remove a category by ID
    removeCategory(categoryId) {
        this.categories = this.categories.filter(category => category.id !== categoryId);
        this.saveToStorage();
    }

    // Update a category's title by ID
    updateCategoryTitle(categoryId, newTitle) {
        const category = this.categories.find(category => category.id === categoryId);
        if (category) {
            category.title = newTitle;
            this.saveToStorage();
        }
    }

    // Add a new task to a category by ID
    addTask(categoryId, taskName, taskDate, status = 'To Do', details = '') {
        const category = this.categories.find(category => category.id === categoryId);
        if (category) {
            const newTask = new Task(this.nextTaskId, taskName, taskDate, status, details);
            category.addTask(newTask);
            this.nextTaskId += 1;
            this.saveToStorage();
        }
    }

    // Remove a task from a category by task ID
    removeTask(categoryId, taskId) {
        const category = this.categories.find(category => category.id === categoryId);
        if (category) {
            category.removeTask(taskId);
            this.saveToStorage();
        }
    }

    // Update a task by ID within a category
    updateTask(categoryId, taskId, updatedTask) {
        const category = this.categories.find(category => category.id === categoryId);
        if (category) {
            category.updateTask(taskId, updatedTask);
            this.saveToStorage();
        }
    }

    // Update task text by task ID within a category
    updateTaskText(categoryId, taskId, newText) {
        const category = this.categories.find(category => category.id === categoryId);
        if (category) {
            category.updateTaskText(taskId, newText);
            this.saveToStorage();
        }
    }

    // Update task date by task ID within a category
    updateTaskDate(categoryId, taskId, newDate) {
        const category = this.categories.find(category => category.id === categoryId);
        if (category) {
            category.updateTaskDate(taskId, newDate);
            this.saveToStorage();
        }
    }

    // Update task status by task ID
    updateTaskStatus(categoryId, taskId, newStatus) {
        const category = this.categories.find(category => category.id === categoryId);
        if (category) {
            const task = category.tasks.find(task => task.id === taskId);
            if (task) {
                task.status = newStatus;
                this.saveToStorage();
            }
        }
    }

    // Update task details by task ID
    updateTaskDetails(categoryId, taskId, newDetails) {
        const category = this.categories.find(category => category.id === categoryId);
        if (category) {
            const task = category.tasks.find(task => task.id === taskId);
            if (task) {
                task.details = newDetails;
                this.saveToStorage();
            }
        }
    }

    // Initialize example data for demonstration
    initializeExampleData() {
        const exampleCategories = [
            {
                id: 1,
                title: 'Category 1',
                tasks: [
                    { id: 1, text: 'Task 1', date: '2024-05-20', status: 'To Do', details: 'Detail 1' },
                    { id: 2, text: 'Task 2', date: '2024-05-21', status: 'In Progress', details: 'Detail 2' },
                    { id: 3, text: 'Task 3', date: '2024-05-22', status: 'Done', details: 'Detail 3' }
                ]
            },
            {
                id: 2,
                title: 'Category 2',
                tasks: [
                    { id: 4, text: 'Task 4', date: '2024-05-20', status: 'To Do', details: '' },
                    { id: 5, text: 'Task 5', date: '2024-05-21', status: 'In Progress', details: 'Detail 4' },
                    { id: 6, text: 'Task 6', date: '2024-05-22', status: 'Done', details: 'Detail 5' }
                ]
            },
            {
                id: 3,
                title: 'Groceries',
                tasks: [
                    { id: 7, text: 'Buy milk', date: '2024-05-25', status: 'To Do', details: 'Detail 6' },
                    { id: 8, text: 'Buy bread', date: '2024-05-26', status: 'To Do', details: 'Detail 7' }
                ]
            },
            {
                id: 4,
                title: 'Fitness',
                tasks: [
                    { id: 9, text: 'Go to gym', date: '2024-05-27', status: 'To Do', details: 'Detail 8' },
                    { id: 10, text: 'Do yoga', date: '2024-05-28', status: 'To Do', details: 'Detail 9' }
                ]
            },
            {
                id: 5,
                title: 'Home Improvement',
                tasks: [
                    { id: 11, text: 'Paint the walls', date: '2024-05-29', status: 'To Do', details: 'Detail 10' },
                    { id: 12, text: 'Fix the leaking faucet', date: '2024-05-30', status: 'To Do', details: 'Detail 11' }
                ]
            }
        ];

        this.categories = exampleCategories.map(categoryData => {
            const category = new Category(categoryData.id, categoryData.title);
            categoryData.tasks.forEach(taskData => {
                category.addTask(new Task(taskData.id, taskData.text, taskData.date, taskData.status, taskData.details));
            });
            return category;
        });

        this.nextCategoryId = 6;
        this.nextTaskId = 13;
    }
}

export default new TaskManager();
