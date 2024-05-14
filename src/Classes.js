import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

class Category {
    constructor(id, title) {
        this.id = id;
        this.title = title;
        this.tasks = [];
    }

    addTask(task) {
        this.tasks.push(task);
        this.tasks.sort((a, b) => new Date(a.date) - new Date(b.date)); // Sort tasks by date
    }

    removeTask(taskId) {
        this.tasks = this.tasks.filter(task => task.id !== taskId);
    }

    updateTaskText(taskId, newText) {
        const task = this.tasks.find(task => task.id === taskId);
        if (task) {
            task.text = newText;
        }
    }

    updateTaskDate(taskId, newDate) {
        const task = this.tasks.find(task => task.id === taskId);
        if (task) {
            task.date = newDate;
            this.tasks.sort((a, b) => new Date(a.date) - new Date(b.date)); // Sort tasks by date
        }
    }
}

class Task {
    constructor(id, text, date) {
        this.id = id;
        this.text = text;
        this.date = date;
    }
}

function App() {
    const [categories, setCategories] = useState([]);
    const [nextCategoryId, setNextCategoryId] = useState(1);
    const [nextTaskId, setNextTaskId] = useState(1);

    useEffect(() => {
        const savedCategories = localStorage.getItem('categories');
        if (savedCategories) {
            setCategories(JSON.parse(savedCategories).map(categoryData => {
                const category = new Category(categoryData.id, categoryData.title);
                categoryData.tasks.forEach(taskData => {
                    category.addTask(new Task(taskData.id, taskData.text, taskData.date));
                });
                return category;
            }));
            const maxTaskId = JSON.parse(savedCategories).reduce((maxId, categoryData) => {
                return Math.max(maxId, Math.max(...categoryData.tasks.map(task => task.id)));
            }, 0);
            setNextTaskId(maxTaskId + 1);
            const maxCategoryId = Math.max(...JSON.parse(savedCategories).map(categoryData => categoryData.id));
            setNextCategoryId(maxCategoryId + 1);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('categories', JSON.stringify(categories));
    }, [categories]);

    const addCategory = (title) => {
        const newCategory = new Category(nextCategoryId, title || `Kategoria ${nextCategoryId}`);
        setCategories([...categories, newCategory]);
        setNextCategoryId(prevId => prevId + 1);
    };

    const removeCategory = (categoryId) => {
        const newCategories = categories.filter(category => category.id !== categoryId);
        setCategories(newCategories);
    };

    const updateCategoryTitle = (categoryId, newTitle) => {
        const newCategories = categories.map(category => {
            if (category.id === categoryId) {
                category.title = newTitle;
            }
            return category;
        });
        setCategories(newCategories);
    };

    const addTask = (categoryId, taskText, taskDate) => {
        const category = categories.find(category => category.id === categoryId);
        if (category) {
            const newTask = new Task(nextTaskId, taskText, taskDate);
            category.addTask(newTask);
            setNextTaskId(prevId => prevId + 1);
        }
    };

    const removeTask = (categoryId, taskId) => {
        const category = categories.find(category => category.id === categoryId);
        if (category) {
            category.removeTask(taskId);
        }
    };

    const updateTaskText = (categoryId, taskId, newText) => {
        const category = categories.find(category => category.id === categoryId);
        if (category) {
            category.updateTaskText(taskId, newText);
        }
    };

    const updateTaskDate = (categoryId, taskId, newDate) => {
        const category = categories.find(category => category.id === categoryId);
        if (category) {
            category.updateTaskDate(taskId, newDate);
        }
    };

    const importCategoriesFromFile = (file) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            const text = event.target.result;
            setCategories(textToCategories(text)); // Define textToCategories function
        };
        reader.readAsText(file);
    };

    const exportCategoriesToFile = () => {
        const element = document.createElement('a');
        const file = new Blob([categoriesToText(categories)], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = 'categories.txt';
        document.body.appendChild(element);
        element.click();
    };

    const categoriesToText = (categories) => {
        let text = '';
        categories.forEach(category => {
            text += `${category.title}\n`;
            category.tasks.forEach(task => {
                text += `${task.text},${task.date}\n`;
            });
            text += '\n';
        });
        return text;
    };

    const textToCategories = (text) => {
        const lines = text.trim().split('\n');
        const categories = [];
        let currentCategory = null;
        lines.forEach(line => {
            if (line.trim() === '') {
                currentCategory = null;
            } else if (!currentCategory) {
                currentCategory = new Category(nextCategoryId, line.trim());
                categories.push(currentCategory);
                setNextCategoryId(prevId => prevId + 1);
            } else {
                const [text, date] = line.split(',');
                currentCategory.addTask(new Task(nextTaskId, text, date));
                setNextTaskId(prevId => prevId + 1);
            }
        });
        return categories;
    };

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1>Rozwijana lista</h1>
                {categories.map(category => (
                    <div key={category.id}>
                        <h2>
                            <input
                                type="text"
                                value={category.title}
                                onChange={(e) => updateCategoryTitle(category.id, e.target.value)}
                            />
                        </h2>
                        <ul>
                            {category.tasks.map(task => (
                                <li key={task.id}>
                                    <input
                                        type="text"
                                        value={task.text}
                                        onChange={(e) => updateTaskText(category.id, task.id, e.target.value)}
                                    />
                                    <input
                                        type="date"
                                        value={task.date}
                                        onChange={(e) => updateTaskDate(category.id, task.id, e.target.value)}
                                    />
                                    <button onClick={() => removeTask(category.id, task.id)}>Usuń</button>
                                </li>
                            ))}
                        </ul>
                        <div>
                            <input type="text" placeholder="Nowe zadanie" id={`newTask-${category.id}`} />
                            <input type="date" id={`newTaskDate-${category.id}`} />
                            <button onClick={() => addTask(category.id, document.getElementById(`newTask-${category.id}`).value, document.getElementById(`newTaskDate-${category.id}`).value)}>Dodaj zadanie</button>
                        </div>
                        <button onClick={() => removeCategory(category.id)}>Usuń kategorię</button>
                    </div>
                ))}
                <div>
                    <input type="text" placeholder="Nowa kategoria" id="newCategoryTitle" />
                    <button onClick={() => addCategory(document.getElementById('newCategoryTitle').value)}>Dodaj nową kategorię</button>
                </div>
                <div>
                    <input type="file" onChange={(e) => importCategoriesFromFile(e.target.files[0])} />
                    <button onClick={exportCategoriesToFile}>Exportuj kategorie</button>
                </div>
            </header>
        </div>
    );
}

export default App;
