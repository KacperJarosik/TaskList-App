import { Category } from "./Category";
import { Task } from "./Task";
import { fetchCategories, fetchTasks } from "../contexts/DatabaseHandler";
import { AuthContext } from "../contexts/AuthContext";
import { createTask, createCategory, deleteTask, deleteCategory,updateCategory,updateTask } from "../contexts/DatabaseHandler";

export class User {
    constructor(uid, name, email) {
        this.uid = uid;
        this.name = name;
        this.email = email;
    }
}
export class TaskManager {
    constructor(currentUser) {
        this.currentUser = new User(localStorage.getItem("uid"),localStorage.getItem("name"),localStorage.getItem("email"));
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
           // this.initializeExampleData();
        }
    }

    // Save categories and tasks to local storage
    saveToStorage() {
        localStorage.setItem('categories', JSON.stringify(this.categories));
    }

    async loadFromFirebase() {
        try {
            console.log(this.currentUser);
            // Check if the current user object or its UID is missing
            if (!this.currentUser || !this.currentUser.uid) {
                throw new Error("Blad masz w load from firebase not logged in or UID is missing");
            }
            // Retrieve the UID of the current user
            const uid = this.currentUser.uid;
             // Fetch all categories belonging to the current user
            const savedCategories = await fetchCategories(uid);
            // Check if categories were successfully fetched and if there are any categories
            if (savedCategories && savedCategories.length > 0) {
                // Create an array of promises to fetch tasks for each category
                const categoriesPromises = savedCategories.map(async categoryData => {
                    // Create a new Category object for each fetched category
                    const category = new Category(categoryData.id, categoryData.title);
                    // Fetch tasks belonging to the current category
                    category.tasks = await fetchTasks(uid, category.id);
                    return category;
                });
                // Resolve all category promises to get an array of populated Category objects
                this.categories = await Promise.all(categoriesPromises);
                // Determine the next available task ID based on fetched categories
                this.nextTaskId = savedCategories.reduce((maxId, categoryData) => {
                    // Find the maximum task ID among all fetched tasks
                    return Math.max(maxId, ...categoryData.tasks.map(task => task.id));
                }, 0) + 1;
                // Determine the next available category ID based on fetched categories
                this.nextCategoryId = Math.max(...savedCategories.map(categoryData => categoryData.id)) + 1;
            } else {
                console.log("No categories found or error related to fetching");
            }
        } catch (error) {
            console.error("Error loading data from Firebase: ", error);
        }
    }

    async addCategory(title) {
        const newCategory = new Category(this.nextCategoryId, title || `Kategoria ${this.nextCategoryId}`);
        this.categories.push(newCategory);
        this.nextCategoryId += 1;
        this.saveToStorage(); // Save updated categories to storage
        console.log("addCategoryTaskManager" + newCategory);
        createCategory(localStorage.getItem("uid"), newCategory.title).then(id => {newCategory.id =id},window.location.reload());
    }

    async removeCategory(categoryId) {
        this.categories = this.categories.filter(category => category.id !== categoryId);
        this.saveToStorage(); // Save updated categories to storage
        console.log("TaskManager->removeCategory: "+categoryId);
        await deleteCategory(localStorage.getItem("uid"),categoryId);

    }

    async updateCategoryTitle(categoryId, newTitle) {
        const category = this.categories.find(category => category.id === categoryId);
        if (category) {
            category.title = newTitle;
            this.saveToStorage(); // Save updated categories to storage
            await updateCategory(localStorage.getItem("uid"),categoryId,newTitle);

        }
    }

   async addTask(categoryId, taskText, taskDate, status = 'To Do', details = '') {
        const category = this.categories.find(category => category.id === categoryId);
        console.log("addtask category: "+ category);
        if (category) {
            const newTask = new Task(2, taskText, taskDate, status, details);
           // this.nextTaskId += 1;
            this.saveToStorage(); // Save updated categories to storage
            const taskid =  await createTask(localStorage.getItem("uid"), category,taskText,taskDate,status,details); // Add task to database
            newTask.id = taskid;
            console.log("addtask: "+newTask.id);
        }
    }

    async removeTask(categoryId, taskId) {
        const category = this.categories.find(category => category.id === categoryId);
        if (category) {
           // category.removeTask(taskId);
            await deleteTask(localStorage.getItem("uid"), categoryId, taskId);
            this.saveToStorage(); // Save updated categories to storage
        }
    }

    async updateTask(categoryId, taskId, updatedTask) {
        const category = this.categories.find(category => category.id === categoryId);
        if (category) {
           // category.updateTask(taskId, updatedTask);
            await updateTask(localStorage.getItem("uid"),categoryId,taskId,updatedTask);
            this.saveToStorage(); // Save updated categories to storage

        }
    }

    // Update task text by task ID within a category
    updateTaskText(categoryId, taskId, newText) {
        const category = this.categories.find(category => category.id === categoryId);
        if (category) {
            category.updateTaskText(taskId, newText);
            this.saveToStorage(); // Save updated categories to storage

        }
    }

    // Update task date by task ID within a category
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
const taskManagerInstance = new TaskManager();
export default taskManagerInstance;
