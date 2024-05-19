// Import the TaskManager
import TaskManager from '../../Classes.js';

// Load data from storage
TaskManager.loadFromStorage();

// Get categories from the TaskManager
const categories = TaskManager.categories;

// Render the CategoriesList component
function CategoriesList() {
    return (
        <>
            <h3>Lista kategorii</h3>
            <table className="table">
                <thead>
                <tr>
                    <th>Kategoria</th>
                    <th>Liczba zadań</th>
                </tr>
                </thead>
                <tbody>
                {categories.map(category => (
                    <tr key={category.id}>
                        <td>{category.title}</td>
                        <td>{category.tasks.length}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    );
}

export default CategoriesList;
