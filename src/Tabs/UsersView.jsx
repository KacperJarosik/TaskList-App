import React from "react";
import TaskManager from '../Structs/TaskManager.js';

TaskManager.loadFromStorage();
// const categories = TaskManager.categories;

// Przykładowe dane użytkowników
const users = [
    { id: 1, username: 'john_doe', categoriesCount: 3, tasksCount: 15 },
    { id: 2, username: 'jane_smith', categoriesCount: 5, tasksCount: 25 },
    { id: 3, username: 'alice_jones', categoriesCount: 2, tasksCount: 8 },
    { id: 4, username: 'bob_brown', categoriesCount: 4, tasksCount: 20 }
];

const UsersView = () => {
    return (
        <>
            <h3>Lista użytkowników</h3>
            <table className="table">
                <thead>
                <tr>
                    <th>ID użytkownika</th>
                    <th>Nazwa użytkownika</th>
                    <th>Liczba zapisanych kategorii</th>
                    <th>Liczba zapisanych zadań (łącznie)</th>
                </tr>
                </thead>
                <tbody>
                {users.map(user => (
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.username}</td>
                        <td>{user.categoriesCount}</td>
                        <td>{user.tasksCount}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    );
}

export default UsersView;
