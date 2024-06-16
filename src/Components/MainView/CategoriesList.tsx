import React from 'react';
import TaskManager from '../../Structs/TaskManager.js';
import { useEffect, useRef, useState } from "react";
import taskManagerInstance from '../../Structs/TaskManager.js';
import { Category } from '../../Structs/Category.js';

function CategoriesList() {
    const [isSearchInputVisible, setIsSearchInputVisible] = useState(false);
    const searchInputRef = useRef(null);
    const [searchQuery, setSearchQuery] = useState(''); // State to store search query
    const [isAdding, setIsAdding] = useState(false); // State to manage adding mode
    const [isEditing, setIsEditing] = useState(false); // State to manage editing mode
    const [currentCategory, setCurrentCategory] = useState(null); // State to store category being edited
    const [newCategoryTitle, setNewCategoryTitle] = useState(''); // State to store new category title
    const [editCategoryTitle, setEditCategoryTitle] = useState(''); // State to store edited category title

    const handleSearchButtonClick = () => {
        setIsSearchInputVisible(true);
    };

    const handleClickOutside = (event) => {
        if (searchInputRef.current && !searchInputRef.current.contains(event.target)) {
            setIsSearchInputVisible(false);
        }
    };
    const [categories, setCategories] = useState<Category[]>([]);

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

    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredCategories = categories.filter(category =>
        category.title.includes(searchQuery)
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
