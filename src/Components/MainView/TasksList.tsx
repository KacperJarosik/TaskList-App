import { useState, useEffect, useRef } from 'react';
import TaskManager from '../../Classes.js';

// Load data from storage
TaskManager.loadFromStorage();

// Get categories from the TaskManager
const categories = TaskManager.categories;

function TasksList({ tasks, categoryId }) {
    const [taskList, setTaskList] = useState(tasks); // State to manage tasks
    const [isSearchInputVisible, setIsSearchInputVisible] = useState(false); // State to manage search input visibility
    const searchInputRef = useRef(null); // Reference to the search input
    const [searchQuery, setSearchQuery] = useState(''); // State to store search query
    const [showDetails, setShowDetails] = useState(false);
    const [currentTask, setCurrentTask] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const [isFiltering, setIsFiltering] = useState(false);
    const [isSorting, setIsSorting] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [taskName, setTaskName] = useState('');
    const [taskDate, setTaskDate] = useState('');
    const [taskDetails, setTaskDetails] = useState('');
    const [sortOption, setSortOption] = useState(''); // New state for sort option

    // States for filtering
    const [filterStartDate, setFilterStartDate] = useState('');
    const [filterEndDate, setFilterEndDate] = useState('');
    const [filterStatus, setFilterStatus] = useState('');

    // Adding a task
    const handleAddTask = () => {
        const name = taskName || 'New Task';
        const date = taskDate || 'brak';
        const details = taskDetails || '';

        TaskManager.addTask(categoryId, name, date, 'To Do', details);
        const updatedTasks = TaskManager.categories.find(cat => cat.id === categoryId).tasks;
        setTaskList([...updatedTasks]); // Update the task list state
        setIsAdding(false); // Close the adding mode
    };

    // Editing a task
    const handleSaveEditTask = () => {
        TaskManager.updateTask(categoryId, editingTask.id, editingTask);
        const updatedTasks = TaskManager.categories.find(cat => cat.id === categoryId).tasks;
        setTaskList([...updatedTasks]); // Update the task list state
        setIsEditing(false); // Close the editing mode
    };

    const handleDeleteTask = (taskId) => {
        TaskManager.removeTask(categoryId, taskId);
        const updatedTasks = TaskManager.categories.find(cat => cat.id === categoryId).tasks;
        setTaskList([...updatedTasks]); // Update the task list state
    };

    const handleSearchButtonClick = () => {
        setIsSearchInputVisible(true); // Show search input
    };

    const handleClickOutside = (event) => {
        if (searchInputRef.current && !searchInputRef.current.contains(event.target)) {
            setIsSearchInputVisible(false); // Hide search input
        }
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

    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredTasks = taskList.filter(task =>
        task.text.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleDetailsClick = (task) => {
        setCurrentTask(task);
        setShowDetails(true);
    };

    const handleEditClick = (task) => {
        setEditingTask(task);
        setIsEditing(true);
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

    const handleSortOptionChange = (event) => {
        setSortOption(event.target.value);
    };

    const applySorting = () => {
        const updatedTasks = [...taskList];
        switch (sortOption) {
            case 'nameASC':
                updatedTasks.sort((a, b) => a.text.localeCompare(b.text));
                break;
            case 'nameDESC':
                updatedTasks.sort((a, b) => b.text.localeCompare(a.text));
                break;
            case 'dateASC':
                updatedTasks.sort((a, b) => b.date.localeCompare(a.date));
                break;
            case 'dateDESC':
                updatedTasks.sort((a, b) => a.date.localeCompare(b.date));
                break;
            default:
                break;
        }
        setTaskList(updatedTasks);
        setIsSorting(false); // Close the sorting mode
    };

    const applyFiltering = () => {
        const updatedTasks = tasks.filter(task => {
            const taskDate = new Date(task.date);
            const startDate = filterStartDate ? new Date(filterStartDate) : null;
            const endDate = filterEndDate ? new Date(filterEndDate) : null;
            const matchesStatus = filterStatus ? task.status === filterStatus : true;
            const matchesStartDate = startDate ? taskDate >= startDate : true;
            const matchesEndDate = endDate ? taskDate <= endDate : true;
            return matchesStatus && matchesStartDate && matchesEndDate;
        });
        setTaskList(updatedTasks);
        setIsFiltering(false); // Close the filtering mode
    };

    return (
        <>
            <div className="taskButtons">
                {!isSearchInputVisible && (
                    <button className="SearchButton" type="button" onClick={handleSearchButtonClick}>Wyszukaj</button>
                )}
                {isSearchInputVisible && (
                    <input ref={searchInputRef} type="text" className="SearchInput" value={searchQuery} onChange={handleSearchInputChange} />
                )}
                <button className="FilteringButton" onClick={handleFilteringClick}>Filtruj</button>
                <button className="SortingButton" onClick={handleSortingClick}>Sortuj</button>
                <button className="AddButton" onClick={handleAddClick}>Dodaj</button>
            </div>
            <table className="TasksListTable">
                <thead>
                <tr>
                    <th className="TaskName">Nazwa</th>
                    <th className="TaskDeadline">Termin</th>
                    <th className="TaskStatus">Status</th>
                    <th className="TaskDetails">Szczegóły</th>
                </tr>
                </thead>
                <tbody>
                {filteredTasks.map(task => (
                    <tr key={task.id}>
                        <td className="TaskName">{task.text}</td>
                        <td className="TaskDeadline">{task.date}</td>
                        <td className="TaskStatus">{task.status}</td>
                        <td className="TaskDetails">
                            <span onClick={() => handleDetailsClick(task)}>Szczegóły</span>
                            <button className="DeleteButton" type="button" onClick={() => handleDeleteTask(task.id)}>Usuń</button>
                            <button className="EditButton" onClick={() => handleEditClick(task)}>Edytuj</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {showDetails && currentTask && !isFiltering && !isEditing && !isAdding && !isSorting && (
                <div className="popup">
                    <h3>Szczegóły zadania</h3>
                    <p>{currentTask.details}</p>
                    <div className="buttons-container">
                        <button onClick={() => setShowDetails(false)}>Zamknij</button>
                    </div>
                </div>
            )}

            {isEditing && editingTask && !isAdding && !isSorting && !isFiltering && (
                <div className="popup">
                    <h3>Edycja zadania</h3>
                    <label>
                        Nazwa:
                        <input type="text" value={editingTask.text} onChange={(e) => setEditingTask({ ...editingTask, text: e.target.value })} />
                    </label>
                    <label>
                        Data:
                        <input type="date" value={editingTask.date} onChange={(e) => setEditingTask({ ...editingTask, date: e.target.value })} />
                    </label>
                    <label>
                        Status:
                        <select value={editingTask.status} onChange={(e) => setEditingTask({ ...editingTask, status: e.target.value })}>
                            <option value="To Do">To Do</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Done">Done</option>
                        </select>
                    </label>
                    <label>
                        Szczegóły:
                        <textarea value={editingTask.details} onChange={(e) => setEditingTask({ ...editingTask, details: e.target.value })} />
                    </label>
                    <div className="buttons-container">
                        <button onClick={handleSaveEditTask}>Save</button>
                        <button onClick={() => setIsEditing(false)}>Cancel</button>
                    </div>
                </div>
            )}

            {isFiltering && !isSorting && !isAdding && !isEditing && (
                <div className="popup">
                    <h3>Filtruj zadania</h3>
                    <div>
                        Data od:
                        <input type="date" value={filterStartDate} onChange={(e) => setFilterStartDate(e.target.value)} />
                    </div>
                    <div>
                        Data do:
                        <input type="date" value={filterEndDate} onChange={(e) => setFilterEndDate(e.target.value)} />
                    </div>
                    <div>
                        Status:
                        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                            <option value="">Wszystkie</option>
                            <option value="To Do">To Do</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Done">Done</option>
                        </select>
                    </div>
                    <div className="buttons-container">
                        <button onClick={applyFiltering}>Zastosuj filtry</button>
                        <button onClick={() => setIsFiltering(false)}>Zamknij</button>
                    </div>
                </div>
            )}

            {isSorting && !isAdding && !isEditing && !isFiltering && (
                <div className="popup">
                    <h3>Sortuj zadania</h3>
                    <div className="sortByContainer" onChange={handleSortOptionChange}>
                        <label>
                            <input type="radio" name="sort" value="nameASC" checked={sortOption === 'nameASC'} /><span>Nazwa (rosnąco)</span>
                        </label>
                        <label>
                            <input type="radio" name="sort" value="nameDESC" checked={sortOption === 'nameDESC'} /><span>Nazwa (malejąco)</span>
                        </label>
                        <label>
                            <input type="radio" name="sort" value="dateASC" checked={sortOption === 'dateASC'} /><span>Data (rosnąco)</span>
                        </label>
                        <label>
                            <input type="radio" name="sort" value="dateDESC" checked={sortOption === 'dateDESC'} /><span>Data (malejąco)</span>
                        </label>
                    </div>
                    <div className="buttons-container">
                        <button onClick={applySorting}>Zastosuj sortowanie</button>
                    </div>
                </div>
            )}

            {isAdding && (
                <div className="popup">
                    <h3>Dodaj zadanie</h3>
                    <label>
                        Nazwa:
                        <input type="text" placeholder="Nazwa zadania..." value={taskName} onChange={(e) => setTaskName(e.target.value)} />
                    </label>
                    <label>
                        Data:
                        <input type="date" value={taskDate} onChange={(e) => setTaskDate(e.target.value)} />
                    </label>
                    <label>
                        Szczegóły:
                        <textarea placeholder="Szczegóły zadania..." value={taskDetails} onChange={(e) => setTaskDetails(e.target.value)} />
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

function CategoriesList() {
    const [visibleCategories, setVisibleCategories] = useState({});

    const toggleCategoryVisibility = (categoryId) => {
        setVisibleCategories(prevState => ({
            ...prevState,
            [categoryId]: !prevState[categoryId]
        }));
    };

    return (
        <>
            <h3>Zadania do wykonania</h3>
            {categories.map(category => (
                <div key={category.id} className="TaskListActionsBlock">
                    <h4 className="TaskListCategoryTitleBlock" onClick={() => toggleCategoryVisibility(category.id)}>
                        {category.title}
                    </h4>
                    {visibleCategories[category.id] && (
                        <TasksList tasks={category.tasks.map(task => ({
                            id: task.id,
                            text: task.text,
                            date: task.date,
                            status: task.status,
                            details: task.details,
                            category: category.title // Add category title to each task
                        }))} categoryId={category.id} />
                    )}
                </div>
            ))}
        </>
    );
}

export default CategoriesList;
