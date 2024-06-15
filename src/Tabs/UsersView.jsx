import React, {useEffect, useRef, useState} from "react";
import TaskManager from '../Structs/TaskManager.js';

TaskManager.loadFromStorage();
// const categories = TaskManager.categories;

// Przykładowe dane użytkowników
const users = [
    {id: 1, username: 'john_doe', categoriesCount: 3, tasksCount: 15},
    {id: 2, username: 'jane_smith', categoriesCount: 5, tasksCount: 25},
    {id: 3, username: 'alice_jones', categoriesCount: 2, tasksCount: 8},
    {id: 4, username: 'mike_brown', categoriesCount: 4, tasksCount: 20},
    {id: 5, username: 'alex_red', categoriesCount: 5, tasksCount: 23},
    {id: 6, username: 'max_brown', categoriesCount: 2, tasksCount: 120},
    {id: 7, username: 'bob_hamilton', categoriesCount: 4, tasksCount: 20},
    {id: 8, username: 'lewis_brown', categoriesCount: 4, tasksCount: 20},
    {id: 9, username: 'rob_brown', categoriesCount: 4, tasksCount: 20},
    {id: 10, username: 'bob_black', categoriesCount: 4, tasksCount: 20},
    {id: 11, username: 'bob_brown', categoriesCount: 4, tasksCount: 20},
    {id: 12, username: 'bob_brown', categoriesCount: 4, tasksCount: 20}
];

const UsersView = () => {
    const [isSearchInputVisible, setIsSearchInputVisible] = useState(false); // State to manage search input visibility
    const searchInputRef = useRef(null); // Reference to the search input
    const [searchQuery, setSearchQuery] = useState(''); // State to store search query
    const [isFiltering, setIsFiltering] = useState(false);
    const [isSorting, setIsSorting] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [filterStartID, setFilterStartID] = useState('');
    const [filterEndID, setFilterEndID] = useState('');
    const [minCategoriesCount, setFilterMinCategoriesCount] = useState('');
    const [maxCategoriesCount, setFilterMaxCategoriesCount] = useState('');
    const [minTasksCount, setFilterMinTasksCount] = useState('');
    const [maxTasksCount, setFilterMaxTasksCount] = useState('');
    const [sortOption, setSortOption] = useState('idASC'); // Set default sort option
    const [username, setUserName] = useState('');


    const handleSearchButtonClick = () => {
        setIsSearchInputVisible(true); // Show search input
    };

    const handleClickOutside = (event) => {
        if (searchInputRef.current && !searchInputRef.current.contains(event.target)) {
            setIsSearchInputVisible(false); // Hide search input
        }
    };

    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleFilteringClick = () => {
        setIsFiltering(true);
    };

    const handleSortingClick = () => {
        setIsSorting(true);
    };

    const handleAddClick = () => {
        setIsAdding(true);
    };

    const handleEditClick = (user) => {
        setEditingUser(user);
        setIsEditing(true);
    };

    const handleSortOptionChange = (event) => {
        setSortOption(event.target.value);
    };

    useEffect(() => {
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

    const handleDeleteTask = (userId) => {
        // TaskManager.removeTask(categoryId, taskId);
        // const updatedTasks = TaskManager.categories.find(cat => cat.id === categoryId).tasks;
        // setTaskList([...updatedTasks]); // Update the task list state
    };

    const handleSaveEditTask = () => {
        // TaskManager.updateTask(categoryId, editingTask.id, editingTask);
        // const updatedTasks = TaskManager.categories.find(cat => cat.id === categoryId).tasks;
        // setTaskList([...updatedTasks]); // Update the task list state
        setIsEditing(false); // Close the editing mode
    };

    const handleAddTask = () => {
        const name = 'New User';
        const categories = 0;
        const tasks = 0;

        // TaskManager.addTask(categoryId, name, date, 'Do zrobienia', details);
        // const updatedTasks = TaskManager.categories.find(cat => cat.id === categoryId).tasks;
        // setTaskList([...updatedTasks]); // Update the task list state
        setIsAdding(false); // Close the adding mode
    };

    const applySorting = () => {
        // const updatedTasks = [...taskList];
        // switch (sortOption) {
        //     case 'nameASC':
        //         updatedTasks.sort((a, b) => a.text.localeCompare(b.text));
        //         break;
        //     case 'nameDESC':
        //         updatedTasks.sort((a, b) => b.text.localeCompare(a.text));
        //         break;
        //     case 'dateASC':
        //         updatedTasks.sort((a, b) => a.date.localeCompare(b.date));
        //         break;
        //     case 'dateDESC':
        //         updatedTasks.sort((a, b) => b.date.localeCompare(a.date));
        //         break;
        //     default:
        //         break;
        // }
        // setTaskList(updatedTasks);
        setIsSorting(false); // Close the sorting mode
    };

    const applyFiltering = () => {
        // const updatedTasks = tasks.filter(task => {
        //     const taskDate = new Date(task.date);
        //     const startDate = filterStartDate ? new Date(filterStartDate) : null;
        //     const endDate = filterEndDate ? new Date(filterEndDate) : null;
        //     const matchesStatus = filterStatus ? task.status === filterStatus : true;
        //     const matchesStartDate = startDate ? taskDate >= startDate : true;
        //     const matchesEndDate = endDate ? taskDate <= endDate : true;
        //     return matchesStatus && matchesStartDate && matchesEndDate;
        // });
        // setTaskList(updatedTasks);
        setIsFiltering(false); // Close the filtering mode
    };

    return (
        <>
            <h3>Lista użytkowników</h3>
            <div className="taskButtons">
                {!isSearchInputVisible && (
                    <button className="SearchButton" type="button" onClick={handleSearchButtonClick}>Wyszukaj</button>
                )}
                {isSearchInputVisible && (
                    <input ref={searchInputRef} type="text" className="SearchInput" value={searchQuery}
                           onChange={handleSearchInputChange}/>
                )}
                <button className="FilteringButton" onClick={handleFilteringClick}>Filtruj</button>
                <button className="SortingButton" onClick={handleSortingClick}>Sortuj</button>
                <button className="AddButton" onClick={handleAddClick}>Dodaj</button>
            </div>
            <table className="table">
                <thead>
                <tr>
                    <th>ID użytkownika</th>
                    <th>Nazwa użytkownika</th>
                    <th>Liczba zapisanych kategorii</th>
                    <th>Liczba zapisanych zadań</th>
                </tr>
                </thead>
                <tbody>
                {users.map(user => (
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.username}</td>
                        <td>{user.categoriesCount}</td>
                        <td className="TaskDetails">
                            {user.tasksCount}
                            <button className="DeleteButton" type="button" onClick={() => handleDeleteTask(user)}>Usuń
                            </button>
                            <button className="EditButton" onClick={() => handleEditClick(user)}>Edytuj</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {isEditing && editingUser && !isAdding && !isSorting && !isFiltering && (
                <div className="popup">
                    <h3>Edycja użytkownika</h3>
                    <label>
                        Nazwa użytkownika:
                        <input type="text" value={editingUser.username}
                               onChange={(e) => setEditingUser({...editingUser, text: e.target.value})}/>
                    </label>

                    <button style={{paddingLeft: 90, paddingRight: 90}}>Zresetuj hasło</button>

                    <div className="buttons-container">
                        <button onClick={handleSaveEditTask}>Zapisz zmiany</button>
                        <button onClick={() => setIsEditing(false)}>Anuluj zmiany</button>
                    </div>
                </div>
            )}

            {isFiltering && !isSorting && !isAdding && !isEditing && (
                <div className="popup">
                    <h3>Filtruj listę użytkowników</h3>
                    <div>
                        Początkowy numer ID użytkownika:
                        <input type="number" value={filterStartID} onChange={(e) => setFilterStartID(e.target.value)}/>
                    </div>

                    <div>
                        Końcowy numer ID użytkownika:
                        <input type="number" value={filterEndID} onChange={(e) => setFilterEndID(e.target.value)}/>
                    </div>

                    <div>
                        Minimalna liczba zapisanych kategorii:
                        <input type="number" value={minCategoriesCount}
                               onChange={(e) => setFilterMinCategoriesCount(e.target.value)}/>
                    </div>

                    <div>
                        Maksymalna liczba zapisanych kategorii:
                        <input type="number" value={maxCategoriesCount}
                               onChange={(e) => setFilterMaxCategoriesCount(e.target.value)}/>
                    </div>

                    <div>
                        Minimalna liczba zapisanych zadań:
                        <input type="number" value={minTasksCount}
                               onChange={(e) => setFilterMinTasksCount(e.target.value)}/>
                    </div>

                    <div>
                        Maksymalna liczba zapisanych zadań:
                        <input type="number" value={maxTasksCount}
                               onChange={(e) => setFilterMaxTasksCount(e.target.value)}/>
                    </div>

                    <div className="buttons-container">
                        <button onClick={applyFiltering}>Zastosuj filtry</button>
                        <button onClick={() => setIsFiltering(false)}>Zamknij</button>
                    </div>
                </div>
            )}

            {isSorting && !isAdding && !isEditing && !isFiltering && (
                <div className="popup">
                    <h3>Sortuj listę użytkowników</h3>
                    <div className="sortByContainer" onChange={handleSortOptionChange}>
                        <label>
                            <input type="radio" name="sort" value="idASC" checked={sortOption === 'idASC'}/><span> ⭡ wg numeru ID</span>
                        </label>
                        <label>
                            <input type="radio" name="sort" value="idDESC" checked={sortOption === 'idDESC'}/><span> ⭣ wg numeru ID</span>
                        </label>

                        <label>
                            <input type="radio" name="sort" value="nameASC" checked={sortOption === 'nameASC'}/><span> ⭡ wg nazwy użytkownika</span>
                        </label>
                        <label>
                            <input type="radio" name="sort" value="nameDESC" checked={sortOption === 'nameDESC'}/><span> ⭣ wg nazwy użytkownika</span>
                        </label>

                        <label>
                            <input type="radio" name="sort" value="categoriesASC"
                                   checked={sortOption === 'categoriesASC'}/><span> ⭡ wg liczby kategorii</span>
                        </label>
                        <label>
                            <input type="radio" name="sort" value="categoriesDESC"
                                   checked={sortOption === 'categoriesDESC'}/><span> ⭣ wg liczby kategorii</span>
                        </label>

                        <label>
                            <input type="radio" name="sort" value="tasksASC" checked={sortOption === 'tasksASC'}/><span> ⭡ wg liczby zadań</span>
                        </label>
                        <label>
                            <input type="radio" name="sort" value="tasksDESC"
                                   checked={sortOption === 'tasksDESC'}/><span> ⭣ wg liczby zadań</span>
                        </label>
                    </div>
                    <div className="buttons-container">
                        <button onClick={applySorting}>Zastosuj sortowanie</button>
                    </div>
                </div>
            )}

            {isAdding && !isSorting && !isEditing && !isFiltering && (
                <div className="popup">
                    <h3>Dodaj użytkownika</h3>
                    <label>
                        Nazwa użytkownika:
                        <input type="text" placeholder="..." value={username}
                               onChange={(e) => setUserName(e.target.value)}/>
                    </label>
                    <div className="buttons-container">
                        <button onClick={handleAddTask}>Dodaj</button>
                        <button onClick={() => setIsAdding(false)}>Anuluj</button>
                    </div>
                </div>
            )}
        </>
    );
}

export default UsersView;
