import {useState, useEffect, useRef} from 'react';
import TaskManager from '../../Structs/TaskManager.js';
//  Importing icons
// @ts-ignore
import arrow_right from "../Assets/strzalka_prawo.png";
// @ts-ignore
import arrow_down from "../Assets/strzalka_dol.png";
// Load data from storage
TaskManager.loadFromStorage();

// Get categories from the TaskManager
const categories = TaskManager.categories;

function TasksList({tasks, categoryId}) {
    const [taskList, setTaskList] = useState(tasks); // State to manage tasks
    const [isSearchInputVisible, setIsSearchInputVisible] = useState(false);    // State to manage search input visibility
    const searchInputRef = useRef(null);    // Reference to the search input
    const [searchQuery, setSearchQuery] = useState(''); // State to store search query
    const [showDetails, setShowDetails] = useState(false);
    const [currentTask, setCurrentTask] = useState(null);   // Variable storing task data
    const [isEditing, setIsEditing] = useState(false);  // Flag to check if data is editing
    const [editingTask, setEditingTask] = useState(null);   // Variable storing task data
    const [isFiltering, setIsFiltering] = useState(false);  // Flag to check if data is filtering
    const [isSorting, setIsSorting] = useState(false);  // Flag to check if data is sorting
    const [isAdding, setIsAdding] = useState(false);    // Flag to check if data is adding
    const [taskName, setTaskName] = useState('');   // Tasks data
    const [taskDate, setTaskDate] = useState('');
    const [taskDetails, setTaskDetails] = useState('');
    const [sortOption, setSortOption] = useState('dateASC'); // Set default sort option
    const [filterStartDate, setFilterStartDate] = useState(''); // Filtering by deadline date
    const [filterEndDate, setFilterEndDate] = useState('');
    const [filterStatus, setFilterStatus] = useState('');   // Filtering by task status

    // Handling a click action on search button
    const handleSearchButtonClick = () => {
        setIsSearchInputVisible(true);  // Show search input
    };

    // Handling a clicking outside of search input
    const handleClickOutside = (event) => {
        if (searchInputRef.current && !searchInputRef.current.contains(event.target)) {
            setIsSearchInputVisible(false); // Hide search input
        }
    };

    // Handling a change of searching input
    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    // Handling a change of search input visibility
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

    // Adding a task
    const handleAddTask = () => {
        const name = taskName || 'New Task';
        const date = taskDate || 'brak';
        const details = taskDetails || '';

        TaskManager.addTask(categoryId, name, date, 'Do zrobienia', details);
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

    // Deleting a task
    const handleDeleteTask = (taskId) => {
        TaskManager.removeTask(categoryId, taskId);
        const updatedTasks = TaskManager.categories.find(cat => cat.id === categoryId).tasks;
        setTaskList([...updatedTasks]); // Update the task list state
    };

    const filteredTasks = taskList.filter(task =>
        task.text.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Handling a click action on filtering button
    const handleFilteringClick = () => {
        setIsFiltering(true);
    };

    // Handling apply of filtering changes
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

    // Handling a click action on sorting button
    const handleSortingClick = () => {
        setIsSorting(true);
    };

    // Handling a change of options in sorting popup
    const handleSortOptionChange = (event) => {
        setSortOption(event.target.value);
    };

    // Handling apply of sorting changes
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
                updatedTasks.sort((a, b) => a.date.localeCompare(b.date));
                break;
            case 'dateDESC':
                updatedTasks.sort((a, b) => b.date.localeCompare(a.date));
                break;
            default:
                break;
        }
        setTaskList(updatedTasks);
        setIsSorting(false); // Close the sorting mode
    };

    // Handling a click action on details button
    const handleDetailsClick = (task) => {
        setCurrentTask(task);
        setShowDetails(true);
    };

    // Handling a click action on edit button
    const handleEditClick = (task) => {
        setEditingTask(task);
        setIsEditing(true);
    };

    // Handling a click action on add button
    const handleAddClick = () => {
        setIsAdding(true);
    };

    // Displaying tasks list with categories
    return (
        <>
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
                            <button className="DeleteButton" type="button"
                                    onClick={() => handleDeleteTask(task.id)}>Usuń
                            </button>
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
                        <input type="text" value={editingTask.text}
                               onChange={(e) => setEditingTask({...editingTask, text: e.target.value})}/>
                    </label>
                    <label>
                        Data:
                        <input type="date" value={editingTask.date}
                               onChange={(e) => setEditingTask({...editingTask, date: e.target.value})}/>
                    </label>
                    <label>
                        Status:
                        <select value={editingTask.status}
                                onChange={(e) => setEditingTask({...editingTask, status: e.target.value})}>
                            <option value="Do zrobienia">Do zrobienia</option>
                            <option value="W trakcie">W trakcie</option>
                            <option value="Zakończone">Zakończone</option>
                        </select>
                    </label>
                    <label>
                        Szczegóły:
                        <textarea value={editingTask.details}
                                  onChange={(e) => setEditingTask({...editingTask, details: e.target.value})}/>
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
                        <input type="date" value={filterStartDate}
                               onChange={(e) => setFilterStartDate(e.target.value)}/>
                    </div>
                    <div>
                        Data do:
                        <input type="date" value={filterEndDate} onChange={(e) => setFilterEndDate(e.target.value)}/>
                    </div>
                    <div>
                        Status:
                        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                            <option value="">Wszystkie</option>
                            <option value="Do zrobienia">Do zrobienia</option>
                            <option value="W trakcie">W trakcie</option>
                            <option value="Zakończone">Zakończone</option>
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
                            <input type="radio" name="sort" value="dateASC" checked={sortOption === 'dateASC'}/><span> ⭡ wg terminu</span>
                        </label>
                        <label>
                            <input type="radio" name="sort" value="dateDESC" checked={sortOption === 'dateDESC'}/><span> ⭣ wg terminu</span>
                        </label>
                        <label>
                            <input type="radio" name="sort" value="nameASC" checked={sortOption === 'nameASC'}/><span> ⭡ wg nazwy</span>
                        </label>
                        <label>
                            <input type="radio" name="sort" value="nameDESC" checked={sortOption === 'nameDESC'}/><span> ⭣ wg nazwy</span>
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
                        <input type="text" placeholder="Nazwa zadania..." value={taskName}
                               onChange={(e) => setTaskName(e.target.value)}/>
                    </label>
                    <label>
                        Data:
                        <input type="date" value={taskDate} onChange={(e) => setTaskDate(e.target.value)}/>
                    </label>
                    <label>
                        Szczegóły:
                        <textarea placeholder="Szczegóły zadania..." value={taskDetails}
                                  onChange={(e) => setTaskDetails(e.target.value)}/>
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

    // Toggling visibility when click on category name
    const toggleCategoryVisibility = (categoryId) => {
        setVisibleCategories(prevState => ({
            ...prevState,
            [categoryId]: !prevState[categoryId]
        }));
    };

    // Displaying category's tasks
    return (
        <>
            <h3>Zadania do wykonania</h3>
            {categories.map(category => (
                <div key={category.id} className="TaskListActionsBlock">
                    <h4 className="TaskListCategoryTitleBlock" onClick={() => toggleCategoryVisibility(category.id)}>
                        <img src={visibleCategories[category.id] ? arrow_down : arrow_right} alt="Arrow icon"
                             className="TaskTitleIcon"/>
                        {category.title}
                    </h4>
                    {visibleCategories[category.id] && (
                        <TasksList tasks={category.tasks.map(task => ({
                            id: task.id,
                            text: task.text,
                            date: task.date,
                            status: task.status === 'To Do' ? 'Do zrobienia' :
                                task.status === 'In Progress' ? 'W trakcie' :
                                    task.status === 'Done' ? 'Zakończone' : task.status,
                            details: task.details,
                            category: category.title // Add category title to each task
                        }))} categoryId={category.id}/>
                    )}
                </div>
            ))}
        </>
    );
}

export default CategoriesList;
