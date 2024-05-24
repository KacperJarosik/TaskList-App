import { useState } from 'react';
import TaskManager from '../../Classes.js';

// Load data from storage
TaskManager.loadFromStorage();

// Get categories from the TaskManager
const categories = TaskManager.categories;

function TasksList({ tasks, categoryId }) {
    const [taskList, setTaskList] = useState(tasks); // State to manage tasks
    //na razie dodaje 1 max element zobaczymy jak zadziała z bazą (czasem doda więcej po jakimś czasie)
    const handleAddTask = () => {
        TaskManager.addTask(categoryId, '-', '-');
        const updatedTasks = TaskManager.categories.find(cat => cat.id === categoryId).tasks;
        setTaskList(updatedTasks);
    };

    return (
        <>
            <div className="buttons">
                <button className="SearchButton" type="submit">Wyszukaj</button>
                <button className="FilteringButton" type="submit">Filtruj</button>
                <button className="AddTaskButton" type="button" onClick={handleAddTask}>Dodaj</button>
            </div>
            <table className="TasksListTable">
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
                {taskList.map(task => (
                    <tr key={task.id}>
                        <td>{task.category}</td>
                        <td>{task.text}</td>
                        <td>{task.date}</td>
                        <td>{task.status}</td>
                        <td className="TaskDetails">
                            <span className="DetailsText">Szczegóły</span>
                            {/* Do zrobienia jako wyświetlanie szczegółów po kliknięciu w "Szczegóły" */}
                            {/* Jeśli istnieje potrzeba sprawdzenia poprawności szczegółów to: */}
                            {/* ująć powyższe w komentarz, a poniższe odkomentować */}
                            {/* <i>{task.details}</i> */}
                            <button className="DeleteTaskButton" type="submit">Usuń</button>
                            <button className="EditTaskButton" type="submit">Edytuj</button>
                        </td>
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
            <h3>Zadania do wykonania</h3>
            {categories.map(category => (
                <div key={category.id} className="TaskListActionsBlock">
                    <h4 className="TaskListCategoryTitleBlock">{category.title}</h4>
                    <TasksList tasks={category.tasks.map(task => ({
                        id: task.id,
                        text: task.text,
                        date: task.date,
                        status: task.status,
                        details: task.details,
                        category: category.title // Add category title to each task
                    }))} categoryId={category.id} />
                </div>
            ))}
        </>
    );
}

export default CategoriesList;
