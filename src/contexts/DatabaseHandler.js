import { firestore } from "../firebase";
import { collection, doc, setDoc, deleteDoc, updateDoc, getDocs } from "firebase/firestore";
import { Category} from "../Structs/Category";
import { Task} from "../Structs/Task";

const database = firestore;

// Function to create a new category for a user
export async function createCategory(userId, categoryTitle) {
    try {
        // Get a reference to the user document
        const userRef = doc(database,"users",userId);
        // Reference to the 'categories' collection within the user document
        const categoryRef = collection(userRef,"categories");
        // Create a new document reference within the 'categories' collection
        const newCategoryRef =doc(categoryRef);
        // Data to be stored in the new category document
        const categoryData  ={title: categoryTitle}
        // Set the data for the new category document
        await setDoc(newCategoryRef,categoryData);
        return newCategoryRef.id;
    } catch (error) {
        console.error("Error creating category: ", error);
        throw error;
    }
}

// Function to create a new task within a specified category for a user
export async function createTask(userId, categoryId,  taskText, taskDate, status, details) {
    try {
        // Get a reference to the user document      
        const userRef = doc(database,"users",userId);
        // Get a reference to the specific category document
        const categoryRef = doc(userRef,"categories",categoryId.id);
        // Reference to the 'tasks' collection within the category document
        const taskRef = collection(categoryRef,"tasks");
        // Create a new document reference within the 'tasks' collection
        const newTaskRef = doc(taskRef);
        // Data to be stored in the new task document
        const taskData = {text: taskText,date:taskDate,status: status, details:details}
        // Set the data for the new task document
        await setDoc(newTaskRef,taskData);
        return newTaskRef.id; 
    } catch (error) {
        console.error("Error creating task: ", error);
        throw error;
    }
}

// Function to delete a specific category for a user
export async function deleteCategory(userId, categoryId) {
    try {
        // Reference to the specific category document
        const categoryRef = doc(database, "users", userId, "categories", categoryId);
        // Delete the category document
        await deleteDoc(categoryRef);
        console.log("Category deleted with ID: ", categoryId);
    } catch (error) {
        console.error("Error deleting category: ", error);
        throw error;
    }
}

// Function to delete a task from a specific category for a user
export async function deleteTask(userId, categoryId, taskId) {
    try {
         // Reference to the specific task document within the category
        const taskRef = doc(database, "users", userId, "categories", categoryId, "tasks", taskId);
        console.log("taskreftest:" +taskRef);
        // Delete the task document
        await deleteDoc(taskRef);
        console.log("Task deleted with ID: ", taskId);
    } catch (error) {
        console.error("Error deleting task: ", error);
        throw error;
    }
}

// Function to update the title of a specific category for a user
// Function to update the title of a specific category for a user
export async function updateCategory(userId, categoryId, newCategoryTitle) {
    try {
         // Reference to the specific category document
        const categoryRef = doc(database, "users", userId, "categories", categoryId);
        // Update the title of the category document
        await updateDoc(categoryRef, {
            title: newCategoryTitle
        });
        console.log("Category updated with ID: ", categoryId);
    } catch (error) {
        console.error("Error updating category: ", error);
        throw error;
    }
}

// Function to update a specific task within a category for a user
export async function updateTask(userId, categoryId, taskId, newData) {
    try {
        // Reference to the specific task document within the category
        const taskRef = doc(database, "users", userId, "categories", categoryId, "tasks", taskId);
        // Update the task document with new data
        await updateDoc(taskRef, newData);
        console.log("Task updated with ID: ", taskId);
    } catch (error) {
        console.error("Error updating task: ", error);
        throw error;
    }
}

// Function to fetch all categories for a user and return an array of categories with their IDs
export async function fetchCategories(userId) {
    try {
         // Reference to the 'categories' collection within the user document
        const categoriesRef = collection(database, "users", userId, "categories");
        // Get all documents from the 'categories' collection
        const querySnapshot = await getDocs(categoriesRef);
        const categories = [];
        // Iterate through each document and create Category objects
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const category  = new Category(doc.id,data.title);
            categories.push(category);
        })
        return categories;
    } catch (error) {
        console.error("Error fetching categories: ", error);
        throw error;
    }
}

// Function to fetch all tasks from a specific category for a user and return an array of tasks with their IDs
export async function fetchTasks(userId, categoryId) {
    try {
        // Reference to the 'tasks' collection within the specific category
        const tasksRef = collection(database, "users", userId, "categories", categoryId, "tasks");
        // Get all documents from the 'tasks' collection
        const querySnapshot = await getDocs(tasksRef);
        const tasks = [];

        // Iterate through each document and create Task objects
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const task  = new Task(doc.id,data.text,data.date,data.status,data.details);
            tasks.push(task);
        });
        return tasks;
    } catch (error) {
        console.error("Error fetching tasks: ", error);
        throw error;
    }
}
