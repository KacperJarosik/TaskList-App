import { firestore } from "../firebase";
import { collection, doc, setDoc, deleteDoc, updateDoc, getDocs } from "firebase/firestore";
import { Category} from "../Structs/Category";
import { Task} from "../Structs/Task";

const database = firestore;

export async function createCategory(userId, categoryTitle) {
    try {
        console.log(categoryTitle);
        const userRef = doc(database,"users",userId);
        const categoryRef = collection(userRef,"categories");
        const newCategoryRef =doc(categoryRef);
        const categoryData  ={name: categoryTitle}
        await setDoc(newCategoryRef,categoryData);
        return newCategoryRef.id;
    } catch (error) {
        console.error("Error creating category: ", error);
        throw error;
    }
}


export async function createTask(userId, categoryId,  taskText, taskDate, status, details) {
    try {
      
         console.log(categoryId);

        const userRef = doc(database,"users",userId);
        console.log("userref: " + userRef);

        const categoryRef = doc(userRef,"categories",categoryId.id);
        console.log("categoryref: "+ categoryRef);
        const taskRef = collection(categoryRef,"tasks");
        console.log("taskref: "+ taskRef);
        const newTaskRef = doc(taskRef);
        const taskData = {name: taskText,date:taskDate,status: status, details:details}
        await setDoc(newTaskRef,taskData);
        console.log("createTask: "+newTaskRef.id);
        return newTaskRef.id; 
    } catch (error) {
        console.error("Error creating task: ", error);
        throw error;
    }
}

// funkcja usuwa określoną kategorię dla danego użytkownika i tworzy referencję do dokumentu kategorii danego użytkownika i usuwa ten dokument.
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

//funkcja usuwa określone zadanie z określonej kategorii dla danego użytkownika i tworzy referencje do dokumentu zadania w określonej kategorii użytkownika i usuwa ten dokument
export async function deleteTask(userId, categoryId, taskId) {
    try {
        const taskRef = doc(database, "users", userId, "categories", categoryId, "tasks", taskId);
        console.log("taskreftest:" +taskRef);
        await deleteDoc(taskRef);
        console.log("Task deleted with ID: ", taskId);
    } catch (error) {
        console.error("Error deleting task: ", error);
        throw error;
    }
}

//funkcja aktualizuje tytuł określonej kategorii dla danego użytkownika i tworzy referencję do dokumentu kategorii dla danego użytkownika i aktualizuje jego tytuł na podany
export async function updateCategory(userId, categoryId, newCategoryTitle) {
    try {
        const categoryRef = doc(database, "users", userId, "categories", categoryId);
        await updateDoc(categoryRef, {
            name: newCategoryTitle
        });
        console.log("Category updated with ID: ", categoryId);
    } catch (error) {
        console.error("Error updating category: ", error);
        throw error;
    }
}

// funkcja aktualizuje określone zadanie w określonej kategorii dla danego użytkownika
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

//funkcja pobiera wszystkie kategorie dla danego użytkownika, zwraca tablicę zawierającą wszystkie pobrane kategorie wraz z ich identyfikatorami
export async function fetchCategories(userId) {
    try {
        const categoriesRef = collection(database, "users", userId, "categories");
        const querySnapshot = await getDocs(categoriesRef);
        const categories = [];
        
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const category  = new Category(doc.id,data.name);
            categories.push(category);
        })
        return categories;
    } catch (error) {
        console.error("Error fetching categories: ", error);
        throw error;
    }
}

// funkcja pobiera wszystkie zadania z określonej kategorii dla danego użytkownika, zwraca tablice zawierającą wszystkie pobrane zadania wraz z ich identyfikatorami
export async function fetchTasks(userId, categoryId) {
    try {
        const tasksRef = collection(database, "users", userId, "categories", categoryId, "tasks");
        const querySnapshot = await getDocs(tasksRef);
        const tasks = [];
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const task  = new Task(doc.id,data.name,data.date,data.status,data.details);
            tasks.push(task);
        });
        return tasks;
    } catch (error) {
        console.error("Error fetching tasks: ", error);
        throw error;
    }
}
