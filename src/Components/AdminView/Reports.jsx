import React, {useEffect, useRef, useState} from "react";

// Przykładowe dane administratorów
const reports = [
    {id: 1, title: 'Zawieszona strona', priority: 2, date: '20-02-2024r.'},
    {id: 2, title: 'Niedziałający przycisk dodawania', priority: 3, date: '03-02-2024r.'},
    {id: 3, title: 'Usunięcie danych użytkownika', priority: 1, date: '23-02-2024r.'},
    {id: 4, title: 'Brak danych na stronie', priority: 2, date: '15-11-2024r.'},
    {id: 5, title: 'Złe skalowanie ekranu', priority: 4, date: '28-06-2024r.'},
    {id: 6, title: 'Drgający ekran', priority: 2, date: '10-12-2024r.'},
    {id: 7, title: 'Zacinająca się animacja', priority: 3, date: '01-07-2024r.'}
];

const Reports = () => {
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
    const [sortOption, setSortOption] = useState('titleASC'); // Set default sort option

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
            <h3>Przegląd zgłoszeń</h3>
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
                    <th>Tytuł zgłosznia</th>
                    <th>Data zgłoszenia</th>
                </tr>
                </thead>
                <tbody>
                {reports.map(report => (
                    <tr key={report.id}>
                        <td>{report.title}</td>
                        <td>{report.date}</td>
                    </tr>
                ))}
                </tbody>
            </table>

            {isFiltering && !isSorting && !isAdding && !isEditing && (
                <div className="popup">
                    <h3>Filtruj listę zgłoszeń</h3>
                    <div>
                        Data zgłoszenia (od):
                        <input type="date" value={filterStartDate}
                               onChange={(e) => setFilterStartDate(e.target.value)}/>
                    </div>
                    <div>
                        Data zgłoszenia (do):
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
                    <h3>Sortuj listę zgłoszeń</h3>
                    <div className="sortByContainer" onChange={handleSortOptionChange}>
                        <label>
                            <input type="radio" name="sort" value="titleASC"
                                   checked={sortOption === 'titleASC'}/><span> ⭡ wg tytułu zgłoszenia</span>
                        </label>
                        <label>
                            <input type="radio" name="sort" value="titleDESC"
                                   checked={sortOption === 'titleDESC'}/><span> ⭣ wg tytułu zgłoszenia</span>
                        </label>

                        <label>
                            <input type="radio" name="sort" value="dateASC" checked={sortOption === 'dateASC'}/><span> ⭡ wg daty zgłoszenia</span>
                        </label>
                        <label>
                            <input type="radio" name="sort" value="dateDESC"
                                   checked={sortOption === 'dateDESC'}/><span> ⭣ wg daty zgłoszenia</span>
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

export default Reports;
