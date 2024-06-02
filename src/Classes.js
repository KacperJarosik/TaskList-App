export class Category {
    constructor(id, title) {
        this.id = id;
        this.title = title;
        this.tasks = [];
    }

    addTask(task) {
        this.tasks.push(task);
        this.tasks.sort((a, b) => new Date(a.date) - new Date(b.date)); // Sort tasks by date
    }

    removeTask(taskId) {
        this.tasks = this.tasks.filter(task => task.id !== taskId);
    }

    updateTask(taskId, updatedTask) {
        const taskIndex = this.tasks.findIndex(task => task.id === taskId);
        if (taskIndex !== -1) {
            this.tasks[taskIndex] = { ...this.tasks[taskIndex], ...updatedTask };
            this.tasks.sort((a, b) => new Date(a.date) - new Date(b.date)); // Sort tasks by date
        }
    }

    updateTaskText(taskId, newText) {
        const task = this.tasks.find(task => task.id === taskId);
        if (task) {
            task.text = newText;
        }
    }

    updateTaskDate(taskId, newDate) {
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


export class Task {
    constructor(id, text, date, status, details) {
        this.id = id;
        this.text = text;
        this.date = date;
        this.status = status; // Add status field
        this.details = details; // Add details field
    }
}

export class TaskManager {
    constructor() {
        this.categories = [];
        this.nextCategoryId = 1;
        this.nextTaskId = 1;
    }

    loadFromStorage() {
        const savedCategories = localStorage.getItem('categories');
        if (savedCategories) {
            this.categories = JSON.parse(savedCategories).map(categoryData => {
                const category = new Category(categoryData.id, categoryData.title);
                categoryData.tasks.forEach(taskData => {
                    category.addTask(new Task(taskData.id, taskData.text, taskData.date, taskData.status, taskData.details));
                });
                return category;
            });
            this.nextTaskId = JSON.parse(savedCategories).reduce((maxId, categoryData) => {
                return Math.max(maxId, Math.max(...categoryData.tasks.map(task => task.id)));
            }, 0) + 1;
            this.nextCategoryId = Math.max(...JSON.parse(savedCategories).map(categoryData => categoryData.id)) + 1;
        } else {
            this.initializeExampleData();
        }
    }

    saveToStorage() {
        localStorage.setItem('categories', JSON.stringify(this.categories));
    }

    addCategory(title) {
        const newCategory = new Category(this.nextCategoryId, title || `Kategoria ${this.nextCategoryId}`);
        this.categories.push(newCategory);
        this.nextCategoryId += 1;
        this.saveToStorage(); // Save updated categories to storage
    }

    removeCategory(categoryId) {
        this.categories = this.categories.filter(category => category.id !== categoryId);
        this.saveToStorage(); // Save updated categories to storage
    }

    updateCategoryTitle(categoryId, newTitle) {
        const category = this.categories.find(category => category.id === categoryId);
        if (category) {
            category.title = newTitle;
            this.saveToStorage(); // Save updated categories to storage
        }
    }

    addTask(categoryId, taskText, taskDate, status = 'To Do', details = '') {
        const category = this.categories.find(category => category.id === categoryId);
        if (category) {
            const newTask = new Task(this.nextTaskId, taskText, taskDate, status, details);
            category.addTask(newTask);
            this.nextTaskId += 1;
            this.saveToStorage(); // Save updated categories to storage
        }
    }

    removeTask(categoryId, taskId) {
        const category = this.categories.find(category => category.id === categoryId);
        if (category) {
            category.removeTask(taskId);
            this.saveToStorage(); // Save updated categories to storage
        }
    }

    updateTask(categoryId, taskId, updatedTask) {
        const category = this.categories.find(category => category.id === categoryId);
        if (category) {
            category.updateTask(taskId, updatedTask);
            this.saveToStorage(); // Save updated categories to storage
        }
    }

    updateTaskText(categoryId, taskId, newText) {
        const category = this.categories.find(category => category.id === categoryId);
        if (category) {
            category.updateTaskText(taskId, newText);
            this.saveToStorage(); // Save updated categories to storage
        }
    }

    updateTaskDate(categoryId, taskId, newDate) {
        const category = this.categories.find(category => category.id === categoryId);
        if (category) {
            category.updateTaskDate(taskId, newDate);
            this.saveToStorage(); // Save updated categories to storage
        }
    }

    updateTaskStatus(taskId, newStatus) {
        const task = this.tasks.find(task => task.id === taskId);
        if (task) {
            task.status = newStatus;
            this.saveToStorage(); // Save updated categories to storage
        }
    }

    updateTaskDetails(taskId, newDetails) {
        const task = this.tasks.find(task => task.id === taskId);
        if (task) {
            task.details = newDetails;
            this.saveToStorage(); // Save updated categories to storage
        }
    }

    initializeExampleData() {
        const exampleCategories = [
            {
                id: 1,
                title: 'kat1',
                tasks: [
                    { id: 1, text: 'przed1', date: '2024-05-20', status: 'To Do', details: 'Ciupaga od maga' },
                    { id: 2, text: 'przed2', date: '2024-05-21', status: 'In Progress', details: 'Marek bez marek' },
                    { id: 3, text: 'przed3', date: '2024-05-22', status: 'Done', details: 'Moja dusza ulatujeeeeeeeeeeee eeeeeeeeeeeeeeee eeeeeeeeeeeeeeee eeeeeeeeeeeeeeeeeee eeeeeeeeeeeeee eeeeeeeeeeeeeeeee eeeeeeeeeeeeeee eeeeeeeeeeeee eeeeeeeeeeeeeee eeeeeeeee eee eeeee eeeeeeee eeeeeee' }
                ]
            },
            {
                id: 2,
                title: 'kategoria_1',
                tasks: [
                    { id: 4, text: 'zadanie_1', date: '2024-05-20', status: 'To Do', details: '' },
                    { id: 5, text: 'zadanie_2', date: '2024-05-21', status: 'In Progress', details: 'Każdego dnie ktoś zjada jakieś naleśniki' },
                    { id: 6, text: 'zadanie_5', date: '2024-05-22', status: 'Done', details: 'Gdybym był gołębiem to byłbym tak leniwy, że nie chciałoby mi się latać' },
                    { id: 7, text: 'zadanie_4', date: '2024-05-23', status: 'To Do', details: '' },
                    { id: 8, text: 'zadanie_6', date: '2024-05-24', status: 'In Progress', details: 'Task in progress' }
                ]
            },
            {
                id: 3,
                title: 'Groceries',
                tasks: [
                    { id: 9, text: 'Buy milk', date: '2024-05-25', status: 'To Do', details: '1' },
                    { id: 10, text: 'Buy bread', date: '2024-05-26', status: 'To Do', details: '2' }
                ]
            },
            {
                id: 4,
                title: 'Fitness',
                tasks: [
                    { id: 11, text: 'Go to gym', date: '2024-05-27', status: 'To Do', details: '3' },
                    { id: 12, text: 'Do yoga', date: '2024-05-28', status: 'To Do', details: '4' }
                ]
            },
            {
                id: 5,
                title: 'Home Improvement',
                tasks: [
                    { id: 13, text: 'Paint the walls', date: '2024-05-29', status: 'To Do', details: '5' },
                    { id: 14, text: 'Fix the leaking faucet', date: '2024-05-30', status: 'To Do', details: '6' }
                ]
            },
            {
                id: 6,
                title: 'Empty Category 1',
                tasks: []
            },
            {
                id: 7,
                title: 'Empty Category 2',
                tasks: []
            },
            {
                id: 8,
                title: 'Empty Category 3',
                tasks: []
            },
            {
                id: 9,
                title: 'Category with One Sentence',
                tasks: [
                    { id: 15, text: 'Write a single sentence', date: '2024-06-01', status: 'To Do', details: '7' }
                ]
            },
            {
                id: 10,
                title: 'Category with 10 Tasks',
                tasks: [
                    { id: 16, text: 'Task 1', date: '2024-06-01', status: 'To Do', details: '1' },
                    { id: 17, text: 'Task 2', date: '2024-06-02', status: 'To Do', details: '2' },
                    { id: 18, text: 'Task 3', date: '2024-06-03', status: 'To Do', details: '3' },
                    { id: 19, text: 'Task 4', date: '2024-06-04', status: 'To Do', details: '4' },
                    { id: 20, text: 'Task 5', date: '2024-06-05', status: 'To Do', details: '5' },
                    { id: 21, text: 'Task 6', date: '2024-06-06', status: 'To Do', details: '6' },
                    { id: 22, text: 'Task 7', date: '2024-06-07', status: 'To Do', details: '7' },
                    { id: 23, text: 'Task 8', date: '2024-06-08', status: 'To Do', details: '8' },
                    { id: 24, text: 'Task 9', date: '2024-06-09', status: 'To Do', details: '9' },
                    { id: 25, text: 'Task 10', date: '2024-06-10', status: 'To Do', details: '10' }
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
        this.nextCategoryId = 11; // Update the ID for the next category
        this.nextTaskId = 26; // Update the ID for the next task
    }
}

export default new TaskManager();
