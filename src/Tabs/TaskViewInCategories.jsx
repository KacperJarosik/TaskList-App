import React, { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import TaskManager from '../Structs/TaskManager.js';

TaskManager.loadFromStorage();
const categories = TaskManager.categories;

function TaskViewInCategories({ tasks }) {
    const [searchQuery, setSearchQuery] = useState(''); // State to store search query
    const [filterStatus, setFilterStatus] = useState('');
    const [sortField, setSortField] = useState('');
    const [sortDirection, setSortDirection] = useState('asc');

    // Handling customized view options
    const filteredAndSortedTasks = useMemo(() => {
        let filteredTasks = tasks;

        if (searchQuery) {
            filteredTasks = filteredTasks.filter(task =>
                task.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
                task.details.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (filterStatus) {
            filteredTasks = filteredTasks.filter(task => task.status === filterStatus);
        }

        if (sortField) {
            filteredTasks = filteredTasks.sort((a, b) => {
                const fieldA = a[sortField];
                const fieldB = b[sortField];
                if (fieldA < fieldB) return sortDirection === 'asc' ? -1 : 1;
                if (fieldA > fieldB) return sortDirection === 'asc' ? 1 : -1;
                return 0;
            });
        }

        return filteredTasks;
    }, [tasks, searchQuery, filterStatus, sortField, sortDirection]);

    // Display list of tasks
    return (
        <>
            <h3>Lista zadań</h3>
            <div className="controls">
                <input 
                    className="InputSearch"
                    type="text"
                    placeholder="Wyszukaj..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <select
                    className="SelectList"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                >
                    <option value="">Wszystkie</option>
                    <option value="To Do">Do zrobienia</option>
                    <option value="In Progress">W trakcie</option>
                    <option value="Done">Zakończone</option>
                </select>
                <button className="SearchButton" onClick={() => setSortField('text')}>Sortuj wg Nazwy</button>
                <button className="SearchButton" onClick={() => setSortField('date')}>Sortuj wg Terminu</button>
                <button className="SearchButton" onClick={() => setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')}>
                    ⭡  ⭣
                </button>
            </div>
            <table className="table" id="TasksListTable">
                <thead>
                <tr>
                    <th>Kategoria</th>
                    <th>Nazwa</th>
                    <th>Termin</th>
                    <th>Status</th>
                    <th>Szczegóły</th>
                </tr>
                </thead>
                <tbody>
                {filteredAndSortedTasks.map(task => (
                    <tr key={task.id}>
                        <td>{task.category}</td>
                        <td>{task.text}</td>
                        <td>{task.date}</td>
                        <td>{task.status}</td>
                        <td>{task.details}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    );
}

function TaskInCat() {
    const { categoryId } = useParams();
    const category = categories.find(cat => cat.id === parseInt(categoryId));

    if (!category) {
        return <p></p>;
    }

    return (
        <>
            <h3>Kategoria: {category.title}</h3>
            <TaskViewInCategories tasks={category.tasks.map(task => ({
                id: task.id,
                text: task.text,
                date: task.date,
                status: task.status,
                details: task.details,
                category: category.title // Add category title to each task
            }))} />
        </>
    );
}

export default TaskInCat;
