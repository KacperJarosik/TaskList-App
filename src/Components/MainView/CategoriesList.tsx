import React from 'react';
import TaskManager from '../../Structs/TaskManager.js';
import { useEffect, useRef, useState } from "react";
import taskManagerInstance from '../../Structs/TaskManager.js';
import { Category } from '../../Structs/Category.js';

function CategoriesList() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [isSearchInputVisible, setIsSearchInputVisible] = useState(false);    // State to manage search input visibility
    const searchInputRef = useRef(null);    // Reference to the search input
    const [searchQuery, setSearchQuery] = useState(''); // State to store search query
    const [isAdding, setIsAdding] = useState(false);    // Flag to check if data is adding
    const [isEditing, setIsEditing] = useState(false);  // Flag to check if data is editing
    const [currentCategory, setCurrentCategory] = useState(null);   //Variable storing single category data
    const [newCategoryTitle, setNewCategoryTitle] = useState('');   //Editing category title
    const [editCategoryTitle, setEditCategoryTitle] = useState('');

    // Handling a click action on search button
    const handleSearchButtonClick = () => {
        setIsSearchInputVisible(true);
    };

    // Handling a clicking outside of search input
    const handleClickOutside = (event) => {
        if (searchInputRef.current && !searchInputRef.current.contains(event.target)) {
            setIsSearchInputVisible(false);
        }
    };

    // Handling a change of searching input
    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    // Handling a change of search input visibility
    useEffect(() => {
        async function initializeTaskManagerCategoryList() {
            await taskManagerInstance.loadFromFirebase();
            setCategories(taskManagerInstance.categories);
          }
          initializeTaskManagerCategoryList();
          
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
    const refreshCategories = async () => {
        await taskManagerInstance.loadFromFirebase();
        setCategories(taskManagerInstance.categories);
    };
    const handleDeleteCategory = async (categoryId) => {
        await taskManagerInstance.removeCategory(categoryId);
        taskManagerInstance.saveToStorage();
        await refreshCategories();
        window.location.reload();
    };

    // Handling a click action on adding button
    const handleAddClick = () => {
        setIsAdding(true);
    };

    const handleEditClick = (category) => {
        setCurrentCategory(category);
        setEditCategoryTitle(category.title);
        setIsEditing(true);
    };

    const handleAddCategory =async () => {
        if (newCategoryTitle) {
            taskManagerInstance.addCategory(newCategoryTitle);
            console.log("HandleAddCategory: "+ newCategoryTitle);
            setNewCategoryTitle('');
            setIsAdding(false);
            await refreshCategories();
           // window.location.reload(); // Refresh the page to update the list
        }
    };
    
    const handleEditCategory =  async () => {
        if (currentCategory && editCategoryTitle) {
            await taskManagerInstance.updateCategoryTitle(currentCategory.id, editCategoryTitle);
            setCurrentCategory(null);
            setEditCategoryTitle('');
            setIsEditing(false);
            await refreshCategories();

            window.location.reload(); // Refresh the page to update the list
        }
    };

    const filteredCategories = categories.filter(category =>
        category.title.includes(searchQuery)
    );

    // Displaying a list of TaskList categories where user can search, filter, sort and add data
    return (
        <>
            <h3>Lista kategorii</h3>
            <div className="categoryButtons">
                {!isSearchInputVisible && (
                    <button className="SearchButton" type="button" onClick={handleSearchButtonClick}>Wyszukaj</button>
                )}
                {isSearchInputVisible && (
                    <input ref={searchInputRef} type="text" className="SearchInput" value={searchQuery}
                           onChange={handleSearchInputChange}/>
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
                            <button className="DeleteButton" type="button"
                                    onClick={() => handleDeleteCategory(category.id)}>Usuń
                            </button>
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
