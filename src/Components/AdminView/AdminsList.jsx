import React, {useEffect, useRef, useState} from "react";

// Przykładowe dane administratorów
const admins = [
    {id: 1, username: 'Piotrek Zając', title: 'dr inż.', join_date: '20-02-2022r.'},
    {id: 2, username: 'Aneta Kacyj', title: 'mgr inż.', join_date: '12-01-2022r.'},
    {id: 3, username: 'Stefan Podas', title: 'mgr', join_date: '12-12-2023r.'},
    {id: 4, username: 'Miłosz Lilsz', title: 'prof.', join_date: '03-01-2024r.'},
    {id: 5, username: 'Marcin Rosa', title: 'dr hab. inż.', join_date: '24-07-2024r.'},
    {id: 6, username: 'Szymon Zebra', title: 'dr inż.', join_date: '01-12-2022r.'},
    {id: 7, username: 'Adam Pies', title: 'mgr inż.', join_date: '09-10-2021r.'},
    {id: 8, username: 'Przemek Królik', title: 'dr hab.', join_date: '20-02-2012r.'},
    {id: 9, username: 'Piotrek Kot', title: 'dr inż.', join_date: '22-03-2019r.'}
];

const AdminsList = () => {
    const [isSearchInputVisible, setIsSearchInputVisible] = useState(false); // State to manage search input visibility
    const searchInputRef = useRef(null); // Reference to the search input
    const [searchQuery, setSearchQuery] = useState(''); // State to store search query
    const [isFiltering, setIsFiltering] = useState(false);
    const [isSorting, setIsSorting] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [filterTitle, setFilterTitle] = useState('');
    const [filterStartDate, setFilterStartDate] = useState('');
    const [filterEndDate, setFilterEndDate] = useState('');
    const [sortOption, setSortOption] = useState('nameASC'); // Set default sort option

    const handleSearchButtonClick = () => {
        setIsSearchInputVisible(true); // Show search input
    };

    const handleClickOutside = (event) => {
        if (searchInputRef.current && !searchInputRef.current.contains(event.target)) {
            setIsSearchInputVisible(false); // Hide search input
        }
    };

    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleFilteringClick = () => {
        setIsFiltering(true);
    };

    const handleSortingClick = () => {
        setIsSorting(true);
    };

    const handleSortOptionChange = (event) => {
        setSortOption(event.target.value);
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

    const applySorting = () => {
        // const updatedTasks = [...taskList];
        // switch (sortOption) {
        //     case 'nameASC':
        //         updatedTasks.sort((a, b) => a.text.localeCompare(b.text));
        //         break;
        //     case 'nameDESC':
        //         updatedTasks.sort((a, b) => b.text.localeCompare(a.text));
        //         break;
        //     case 'dateASC':
        //         updatedTasks.sort((a, b) => a.date.localeCompare(b.date));
        //         break;
        //     case 'dateDESC':
        //         updatedTasks.sort((a, b) => b.date.localeCompare(a.date));
        //         break;
        //     default:
        //         break;
        // }
        // setTaskList(updatedTasks);
        setIsSorting(false); // Close the sorting mode
    };

    const applyFiltering = () => {
        // const updatedTasks = tasks.filter(task => {
        //     const taskDate = new Date(task.date);
        //     const startDate = filterStartDate ? new Date(filterStartDate) : null;
        //     const endDate = filterEndDate ? new Date(filterEndDate) : null;
        //     const matchesStatus = filterStatus ? task.status === filterStatus : true;
        //     const matchesStartDate = startDate ? taskDate >= startDate : true;
        //     const matchesEndDate = endDate ? taskDate <= endDate : true;
        //     return matchesStatus && matchesStartDate && matchesEndDate;
        // });
        // setTaskList(updatedTasks);
        setIsFiltering(false); // Close the filtering mode
    };

    return (
        <>
            <h3>Lista administratorów</h3>
            <div className="overviewButtons">
                {!isSearchInputVisible && (
                    <button className="SearchButton" type="button" onClick={handleSearchButtonClick}>Wyszukaj</button>
                )}
                {isSearchInputVisible && (
                    <input ref={searchInputRef} type="text" className="SearchInput" value={searchQuery}
                           onChange={handleSearchInputChange}/>
                )}
                <button className="FilteringButton" onClick={handleFilteringClick}>Filtruj</button>
                <button className="SortingButton" onClick={handleSortingClick}>Sortuj</button>
            </div>
            <table className="table">
                <thead>
                <tr>
                    <th>Nazwa użytkownika</th>
                    <th>Tytuł naukowy</th>
                    <th>Data dołączenia</th>
                </tr>
                </thead>
                <tbody>
                {admins.map(admin => (
                    <tr key={admin.id}>
                        <td>{admin.username}</td>
                        <td>{admin.title}</td>
                        <td>{admin.join_date}</td>
                    </tr>
                ))}
                </tbody>
            </table>

            {isFiltering && !isSorting && !isAdding && !isEditing && (
                <div className="popup">
                    <h3>Filtruj listę administratorów</h3>
                    <div>
                        Tytuł naukowy:
                        <select value={filterTitle} onChange={(e) => setFilterTitle(e.target.value)}>
                            <option value="Profesor">Profesor</option>
                            <option value="Doktor habilitowany">Doktor habilitowany</option>
                            <option value="Doktor">Doktor</option>
                            <option value="Magister">Magister</option>
                            <option value="Inżynier">Inżynier</option>
                        </select>
                    </div>

                    <div>
                        Data dołączenia (od):
                        <input type="date" value={filterStartDate}
                               onChange={(e) => setFilterStartDate(e.target.value)}/>
                    </div>
                    <div>
                        Data dołączenia (do):
                        <input type="date" value={filterEndDate} onChange={(e) => setFilterEndDate(e.target.value)}/>
                    </div>

                    <div className="buttons-container">
                        <button onClick={applyFiltering}>Zastosuj filtry</button>
                        <button onClick={() => setIsFiltering(false)}>Zamknij</button>
                    </div>
                </div>
            )}

            {isSorting && !isAdding && !isEditing && !isFiltering && (
                <div className="popup">
                    <h3>Sortuj listę administratorów</h3>
                    <div className="sortByContainer" onChange={handleSortOptionChange}>
                        <label>
                            <input type="radio" name="sort" value="nameASC" checked={sortOption === 'nameASC'}/><span> ⭡ wg nazwy administratora</span>
                        </label>
                        <label>
                            <input type="radio" name="sort" value="nameDESC" checked={sortOption === 'nameDESC'}/><span> ⭣ wg nazwy administratora</span>
                        </label>

                        <label>
                            <input type="radio" name="sort" value="titleASC"
                                   checked={sortOption === 'titleASC'}/><span> ⭡ wg tytułu naukowego</span>
                        </label>
                        <label>
                            <input type="radio" name="sort" value="titleDESC"
                                   checked={sortOption === 'titleDESC'}/><span> ⭣ wg tytułu naukowego</span>
                        </label>

                        <label>
                            <input type="radio" name="sort" value="joinDateASC" checked={sortOption === 'joinDateASC'}/><span> ⭡ wg daty dołączenia</span>
                        </label>
                        <label>
                            <input type="radio" name="sort" value="joinDateDESC"
                                   checked={sortOption === 'joinDateDESC'}/><span> ⭣ wg daty dołączenia</span>
                        </label>
                    </div>
                    <div className="buttons-container">
                        <button onClick={applySorting}>Zastosuj sortowanie</button>
                    </div>
                </div>
            )}
        </>
    );
}

export default AdminsList;
