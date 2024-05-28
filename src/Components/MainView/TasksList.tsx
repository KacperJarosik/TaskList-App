import { useState, useEffect, useRef } from 'react';
import TaskManager from '../../Classes.js';

// Load data from storage
TaskManager.loadFromStorage();

// Get categories from the TaskManager
const categories = TaskManager.categories;

function TasksList({ tasks, categoryId }) {
    const [taskList, setTaskList] = useState(tasks); // State to manage tasks
    const [isSearchInputVisible, setIsSearchInputVisible] = useState(false); // State to manage search input visibility
    const [hoveredTaskId, setHoveredTaskId] = useState(null); // State to manage hovered task ID
    const searchInputRef = useRef(null); // Reference to the search input

    const handleAddTask = () => {
        TaskManager.addTask(categoryId, 'New Task', '-', 'To Do', '');
        const updatedTasks = TaskManager.categories.find(cat => cat.id === categoryId).tasks;
        setTaskList([...updatedTasks]); // Update the task list state
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

    return (
        <>
            <div className="taskButtons">
                {!isSearchInputVisible && (
                    <button className="SearchButton" type="button" onClick={handleSearchButtonClick}>Wyszukaj</button>
                )}
                {isSearchInputVisible && (
                    <input ref={searchInputRef} type="text" className="SearchInput" placeholder="Wyszukaj"/>
                )}
                <button className="FilteringButton" type="submit">Filtruj</button>
                <button className="SortingButton" type="button">Sortuj</button>
                <button className="AddButton" type="button" onClick={handleAddTask}>Dodaj</button>
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
                {taskList.map(task => (
                    <tr key={task.id}>
                        <td className="TaskName">{task.text}</td>
                        <td className="TaskDeadline">{task.date}</td>
                        <td className="TaskStatus">{task.status}</td>
                        <td className="TaskDetails">
                            <span
                                onMouseEnter={() => setHoveredTaskId(task.id)}
                                onMouseLeave={() => setHoveredTaskId(null)}
                            >Szczegóły</span>
                            <button className="DeleteButton" type="button"
                                    onClick={() => handleDeleteTask(task.id)}>Usuń
                            </button>
                            <button className="EditButton" type="submit">Edytuj</button>
                            {hoveredTaskId === task.id && (
                                <div className="TaskDetailsPopup">
                                    {task.details}
                                </div>
                            )}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
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
                        }))} categoryId={category.id}/>
                    )}
                </div>
            ))}
        </>
    );
}

export default CategoriesList;