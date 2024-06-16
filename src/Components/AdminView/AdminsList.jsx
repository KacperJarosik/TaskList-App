import React, {useEffect, useRef, useState} from "react";

// Examples of administrator data
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
    const [isSearchInputVisible, setIsSearchInputVisible] = useState(false);    // State to manage search input visibility
    const searchInputRef = useRef(null);    // Reference to the search input
    const [searchQuery, setSearchQuery] = useState(''); // State to store search query
    const [isFiltering, setIsFiltering] = useState(false);  // Flag to check if data is filtering
    const [isSorting, setIsSorting] = useState(false);  // Flag to check if data is sorting
    const [isAdding, setIsAdding] = useState(false);    // Flag to check if data is adding
    const [isEditing, setIsEditing] = useState(false);  // Flag to check if data is editing
    const [filterTitle, setFilterTitle] = useState(''); // Filtering by academic title
    const [filterStartDate, setFilterStartDate] = useState(''); // Filtering by join date
    const [filterEndDate, setFilterEndDate] = useState('');
    const [sortOption, setSortOption] = useState('nameASC');    // Set default sort option

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

    // Handling a click action on filtering button
    const handleFilteringClick = () => {
        setIsFiltering(true);
    };

    // Handling apply of filtering changes
    const applyFiltering = () => {
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
        setIsSorting(false); // Close the sorting mode
    };

    // Displaying a list of TaskList admins where user can search, filter and sort data
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
