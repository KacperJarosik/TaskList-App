function TasksList() {
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
                <tr>
                    <td>...</td>
                    <td>...</td>
                    <td>...</td>
                    <td>...</td>
                    <td>...</td>
                </tr>

                <tr>
                    <td>...</td>
                    <td>...</td>
                    <td>...</td>
                    <td>...</td>
                    <td>...</td>
                </tr>

                <tr>
                    <td>...</td>
                    <td>...</td>
                    <td>...</td>
                    <td>...</td>
                    <td>...</td>
                </tr>
                </tbody>
            </table>
        </>
    );
}

export default TasksList;
