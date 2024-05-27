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
            <div className="categoryButtons">
                <button className="SearchButton" type="submit">Wyszukaj</button>
                <button className="AddButton" type="submit">Dodaj</button>
            </div>
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
                        <td className="CategoryModifiers">
                            {category.tasks.length}
                            <button className="DeleteButton" type="submit">Usuń</button>
                            <button className="EditButton" type="submit">Edytuj</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    );
}

export default CategoriesList;
