import { firestore } from "../firebase";
import { collection, doc, setDoc, deleteDoc, updateDoc, getDocs } from "firebase/firestore";

const database = firestore;

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

// funkcja tworzy nowa zadanie w określonej kategorii dla danego użytkownika i zwraca identyfikator nowo dodanego zadania
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
            title: newCategoryTitle
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
            categories.push({ id: doc.id, ...doc.data() });
        });
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
            tasks.push({ id: doc.id, ...doc.data() });
        });
        return tasks;
    } catch (error) {
        console.error("Error fetching tasks: ", error);
        throw error;
    }
}
