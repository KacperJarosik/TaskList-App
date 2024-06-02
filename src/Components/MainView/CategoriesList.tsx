import {Category, TaskManager} from '../../Classes.js';
import { useEffect, useRef, useState } from "react";

// Load data from storage
// TaskManager.loadFromStorage();
// Get categories from the TaskManager

// Render the CategoriesList component
//var categories = TaskManager.categories;

function CategoriesList() {

    const [isSearchInputVisible, setIsSearchInputVisible] = useState(false); // State to manage search input visibility
    const searchInputRef = useRef(null); // Reference to the search input

    const handleSearchButtonClick = () => {
        setIsSearchInputVisible(true); // Show search input
    };

    const handleClickOutside = (event) => {
        if (searchInputRef.current && !searchInputRef.current.contains(event.target)) {
            setIsSearchInputVisible(false); // Hide search input
        }
    };
    const [categories, setCategories] = useState<Category[]>([]);
    const [taskManager, setTaskManager] = useState<TaskManager|null>(null);

    useEffect(() => {
        async function initializeTaskManager() {
            const tm = new TaskManager(); // Assuming TaskManager is a class that can be instantiated
            await tm.loadFromFirebase(); // Load data from Firebase
            setTaskManager(tm); // Store the instance of TaskManager with loaded data
            setCategories(tm.categories); // Update categories in state for rendering
            console.log(tm.categories);
          }
          initializeTaskManager();
          
        if (isSearchInputVisible) {
            document.addEventListener('mousedown', handleClickOutside);
            if (searchInputRef.current) {
                searchInputRef.current.focus(); // Focus on the search input
            }
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isSearchInputVisible]);

    const handleDeleteCategory = (categoryId) => {
        TaskManager.removeCategory(categoryId);
        TaskManager.saveToStorage();
        window.location.reload(); // Refresh the page to update the list
    };

    return (
        <>
            <h3>Lista kategorii</h3>
            <div className="categoryButtons">
                {!isSearchInputVisible && (
                    <button className="SearchButton" type="button" onClick={handleSearchButtonClick}>Wyszukaj</button>
                )}
                {isSearchInputVisible && (
                    <input ref={searchInputRef} type="text" className="SearchInput" placeholder="Wyszukaj"/>
                )}
                <button className="AddButton" type="submit">Dodaj</button>
            </div>
            <table className="table">
                <thead>
                <tr>
                    <th>Kategoria</th>
                    <th>Liczba zadań</th>
                </tr>
                </thead>
                <tbody>
                {categories.map(category => (
                    <tr key={category.id}>
                        <td>{category.title}</td>
                        <td className="CategoryModifiers">
                            {category.tasks.length}
                            <button className="DeleteButton" type="button" onClick={() => handleDeleteCategory(category.id)}>Usuń</button>
                            <button className="EditButton" type="submit">Edytuj</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    );
}

export default CategoriesList;
