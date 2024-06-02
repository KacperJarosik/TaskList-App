import TaskManager from '../../Structs/TaskManager.js';
import { useEffect, useRef, useState } from "react";

// Load data from storage
// TaskManager.loadFromStorage();
// Get categories from the TaskManager

function CategoriesList() {
    const [isSearchInputVisible, setIsSearchInputVisible] = useState(false);
    const searchInputRef = useRef(null);
    const [searchQuery, setSearchQuery] = useState(''); // State to store search query
    const [isAdding, setIsAdding] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentCategory, setCurrentCategory] = useState(null);
    const [newCategoryTitle, setNewCategoryTitle] = useState('');
    const [editCategoryTitle, setEditCategoryTitle] = useState('');

    const handleSearchButtonClick = () => {
        setIsSearchInputVisible(true);
    };

    const handleClickOutside = (event) => {
        if (searchInputRef.current && !searchInputRef.current.contains(event.target)) {
            setIsSearchInputVisible(false);
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
                searchInputRef.current.focus();
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
        window.location.reload();
    };

    const handleAddClick = () => {
        setIsAdding(true);
    };

    const handleEditClick = (category) => {
        setCurrentCategory(category);
        setEditCategoryTitle(category.title);
        setIsEditing(true);
    };

    const handleAddCategory = () => {
        if (newCategoryTitle.trim()) {
            TaskManager.addCategory(newCategoryTitle.trim());
            setNewCategoryTitle('');
            setIsAdding(false);
            window.location.reload(); // Refresh the page to update the list
        }
    };

    const handleEditCategory = () => {
        if (currentCategory && editCategoryTitle.trim()) {
            TaskManager.updateCategoryTitle(currentCategory.id, editCategoryTitle.trim());
            setCurrentCategory(null);
            setEditCategoryTitle('');
            setIsEditing(false);
            window.location.reload(); // Refresh the page to update the list
        }
    };

    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredCategories = categories.filter(category =>
        category.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            <h3>Lista kategorii</h3>
            <div className="categoryButtons">
                {!isSearchInputVisible && (
                    <button className="SearchButton" type="button" onClick={handleSearchButtonClick}>Wyszukaj</button>
                )}
                {isSearchInputVisible && (
                    <input ref={searchInputRef} type="text" className="SearchInput" value={searchQuery} onChange={handleSearchInputChange} />
                )}
                <button className="AddButton" onClick={handleAddClick}>Dodaj</button>
            </div>
            <table className="table">
                <thead>
                <tr>
                    <th>Kategoria</th>
                    <th>Liczba zadań</th>
                </tr>
                </thead>
                <tbody>
                {filteredCategories.map(category => (
                    <tr key={category.id}>
                        <td>{category.title}</td>
                        <td className="CategoryModifiers">
                            {category.tasks.length}
                            <button className="DeleteButton" type="button" onClick={() => handleDeleteCategory(category.id)}>Usuń</button>
                            <button className="EditButton" onClick={() => handleEditClick(category)}>Edytuj</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {isAdding && !isEditing && (
                <div className="popup">
                    <h3>Dodaj kategorię</h3>
                    <label>
                        Nazwa kategorii:
                        <input
                            type="text"
                            value={newCategoryTitle}
                            onChange={(e) => setNewCategoryTitle(e.target.value)}
                        />
                    </label>
                    <div className="buttons-container">
                        <button onClick={handleAddCategory}>Dodaj</button>
                        <button onClick={() => setIsAdding(false)}>Anuluj</button>
                    </div>
                </div>
            )}

            {isEditing && !isAdding && (
                <div className="popup">
                    <h3>Edytuj kategorię</h3>
                    <label>
                        Nazwa kategorii:
                        <input
                            type="text"
                            value={editCategoryTitle}
                            onChange={(e) => setEditCategoryTitle(e.target.value)}
                        />
                    </label>
                    <div className="buttons-container">
                        <button onClick={handleEditCategory}>Zapisz</button>
                        <button onClick={() => setIsEditing(false)}>Anuluj</button>
                    </div>
                </div>
            )}
        </>
    );
}

export default CategoriesList;
