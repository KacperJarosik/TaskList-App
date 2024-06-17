import { useTheme } from "../../ThemeContex";

function SayHello() {
    // Say hello to user and let him identify his role

    const { isDarkMode, toggleTheme } = useTheme();
    return (
        <>
            <h3 className={`SayHello ${isDarkMode ? 'dark' : 'light'}`}>Witaj użytkowniku!</h3>
            <p className={`SayHello ${isDarkMode ? 'dark' : 'light'}`}>Witaj w panelu kontrolnym aplikacji TaskList</p>
        </>
    );
}

export default SayHello;
