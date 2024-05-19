//import React from 'react';
import TaskManager from '../../Classes.js';

// Load data from storage
TaskManager.loadFromStorage();

// Get categories from the TaskManager
const categories = TaskManager.categories;

function TasksList({ tasks }) {
    return (
        <>
            <h3>Lista zadań</h3>
            <div className="buttons">
                <p className="SearchButton">Wyszukaj</p>
                <p className="FilteringButton">Filtruj</p>
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
                {tasks.map(task => (
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

function CategoriesList() {
    return (
        <>
            <h3>Lista kategorii</h3>
            {categories.map(category => (
                <div key={category.id}>
                    <h4>{category.title}</h4>
                    <TasksList tasks={category.tasks.map(task => ({
                        id: task.id,
                        text: task.text,
                        date: task.date,
                        status: task.status,
                        details: task.details,
                        category: category.title // Add category title to each task
                    }))} />
                </div>
            ))}
        </>
    );
}

export default CategoriesList;
