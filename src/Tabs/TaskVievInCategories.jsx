import React from 'react';
import { useParams } from 'react-router-dom';
import TaskManager from '../Classes.js';

TaskManager.loadFromStorage();
const categories = TaskManager.categories;

function TaskVievInCategories({ tasks }) {
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

function TaskInCat() {
    const { categoryId } = useParams();
    const category = categories.find(cat => cat.id === parseInt(categoryId));

    if (!category) {
        return <p></p>;
    }

    return (
        <>
            <h3>Kategoria: {category.title}</h3>
            <TaskVievInCategories tasks={category.tasks.map(task => ({
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
