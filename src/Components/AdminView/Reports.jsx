import React, {useEffect, useRef, useState} from "react";

// Examples of administrator data
const reports = [
    {
        id: 1,
        title: 'Zawieszona strona',
        priority: 2,
        date: '20-02-2024r.',
        description: 'Strona zawiesza się po dodaniu zadania do kategorii.'
    },
    {
        id: 2,
        title: 'Niedziałający przycisk',
        priority: 3,
        date: '03-02-2024r.',
        description: 'Przycisk nie działa, bądź nie pokazuje się na moim ekranie.'
    },
    {
        id: 3,
        title: 'Usunięcie danych użytkownika',
        priority: 1,
        date: '23-02-2024r.',
        description: 'Moje konto zostało przywrócone do ustawień domyślnych i wszystkie moje zadania zniknęły.'
    },
    {id: 4, title: 'Brak danych na stronie', priority: 2, date: '15-11-2024r.', description: 'Strona nie ładuje się.'},
    {
        id: 5,
        title: 'Złe skalowanie ekranu',
        priority: 4,
        date: '28-06-2024r.',
        description: 'Za duża czcionka na moim starym laptopie.'
    },
    {
        id: 6,
        title: 'Drgający ekran',
        priority: 2,
        date: '10-12-2024r.',
        description: 'Podczas animacji przycisku mój ekran drga.'
    },
    {
        id: 7,
        title: 'Zacinająca się animacja',
        priority: 3,
        date: '01-07-2024r.',
        description: 'Widoczne spowolnienie dziłania podczas wyświetlania animacji.'
    }
];

const Reports = () => {
    const [isSearchInputVisible, setIsSearchInputVisible] = useState(false);    // State to manage search input visibility
    const searchInputRef = useRef(null);    // Reference to the search input
    const [searchQuery, setSearchQuery] = useState(''); // State to store search query
    const [isFiltering, setIsFiltering] = useState(false);  // Flag to check if data is filtering
    const [isSorting, setIsSorting] = useState(false);  // Flag to check if data is sorting
    const [isAdding, setIsAdding] = useState(false);    // Flag to check if data is adding
    const [isEditing, setIsEditing] = useState(false);  // Flag to check if data is editing
    const [filterStartDate, setFilterStartDate] = useState(''); // Filtering by join date
    const [filterEndDate, setFilterEndDate] = useState('');
    const [sortOption, setSortOption] = useState('titleASC'); // Set default sort option

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

    // Displaying a reports overview
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
