import { firestore } from "../firebase";
import { collection, doc, setDoc, deleteDoc, updateDoc, getDocs } from "firebase/firestore";

const database = firestore;
// Function to create a new category for a user and return the ID of the new category
export async function createCategory(userId, categoryTitle) {
    try {
        const categoriesRef = collection(database, "users", userId, "categories");
        const categoryDocRef = await addDoc(categoriesRef, {
            title: categoryTitle
        });
        console.log("Category created with ID: ", categoryDocRef.id);
        return categoryDocRef.id;
    } catch (error) {
        console.error("Error creating category: ", error);
        throw error;
    }
}

// Function to create a new task in a specific category for a user and return the ID of the new task
export async function createTask(userId, categoryId, taskId, taskText, taskDate) {
    try {
        const tasksRef = collection(database, "users", userId, "categories", categoryId, "tasks");
        await setDoc(doc(tasksRef, taskId), {
            id: taskId,
            text: taskText,
            date: taskDate
        });
        console.log("Task created with ID: ", taskId);
        return taskId;
    } catch (error) {
        console.error("Error creating task: ", error);
        throw error;
    }
}

// Function to delete a specific category for a user
export async function deleteCategory(userId, categoryId) {
    try {
        const categoryRef = doc(database, "users", userId, "categories", categoryId);
        await deleteDoc(categoryRef);
        console.log("Category deleted with ID: ", categoryId);
    } catch (error) {
        console.error("Error deleting category: ", error);
        throw error;
    }
}

// Function to delete a specific task from a specific category for a user
export async function deleteTask(userId, categoryId, taskId) {
    try {
        const taskRef = doc(database, "users", userId, "categories", categoryId, "tasks", taskId);
        await deleteDoc(taskRef);
        console.log("Task deleted with ID: ", taskId);
    } catch (error) {
        console.error("Error deleting task: ", error);
        throw error;
    }
}

// Function to update the title of a specific category for a user
export async function updateCategory(userId, categoryId, newCategoryTitle) {
    try {
        const categoryRef = doc(database, "users", userId, "categories", categoryId);
        await updateDoc(categoryRef, {
            title: newCategoryTitle
        });
        console.log("Category updated with ID: ", categoryId);
    } catch (error) {
        console.error("Error updating category: ", error);
        throw error;
    }
}

// Function to update a specific task in a specific category for a user
export async function updateTask(userId, categoryId, taskId, newData) {
    try {
        const taskRef = doc(database, "users", userId, "categories", categoryId, "tasks", taskId);
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
        const categoriesRef = collection(database, "users", userId, "categories");
        const querySnapshot = await getDocs(categoriesRef);
        const categories = [];
        querySnapshot.forEach((doc) => {
            categories.push({ id: doc.id, ...doc.data() });
        });
        return categories;
    } catch (error) {
        console.error("Error fetching categories: ", error);
        throw error;
    }
}

// Function to fetch all tasks from a specific category for a user and return an array of tasks with their IDs
export async function fetchTasks(userId, categoryId) {
    try {
        const tasksRef = collection(database, "users", userId, "categories", categoryId, "tasks");
        const querySnapshot = await getDocs(tasksRef);
        const tasks = [];
        querySnapshot.forEach((doc) => {
            tasks.push({ id: doc.id, ...doc.data() });
        });
        return tasks;
    } catch (error) {
        console.error("Error fetching tasks: ", error);
        throw error;
    }
}
