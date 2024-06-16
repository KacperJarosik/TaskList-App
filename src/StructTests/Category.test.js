import { Category } from "../Structs/Category.js";
import { Task } from "../Structs/Task.js";

// To start tests
// npm install --save-dev jest
// npm test src/StructTests

describe('Category', () => {
    let category;
    let task1;
    let task2;

    beforeEach(() => {
        category = new Category(1, 'Test Category');
        task1 = new Task(1, 'Test Task 1', '2024-06-01', 'To Do', 'Details 1');
        task2 = new Task(2, 'Test Task 2', '2024-06-02', 'In Progress', 'Details 2');
    });

    describe('Task Management', () => {
        // Test adding a task and sorting by date
        test('should add a task and sort by date', () => {
            category.addTask(task2);
            category.addTask(task1);
            expect(category.tasks).toEqual([task1, task2]);
        });

        // Test removing a task by ID
        test('should remove a task by id', () => {
            category.addTask(task1);
            category.addTask(task2);
            category.removeTask(1);
            expect(category.tasks).toEqual([task2]);
        });

        // Test updating a task
        test('should update a task', () => {
            category.addTask(task1);
            category.updateTask(1, { text: 'Updated Task 1' });
            expect(category.tasks[0].text).toBe('Updated Task 1');
        });
    });

    describe('Task Updates', () => {
        // Test updating task text
        test('should update task text', () => {
            category.addTask(task1);
            category.updateTaskText(1, 'New Task Text');
            expect(category.tasks[0].text).toBe('New Task Text');
        });

        // Test updating task date and sorting by date
        test('should update task date and sort by date', () => {
            category.addTask(task1);
            category.updateTaskDate(1, '2024-06-03');
            expect(category.tasks[0].date).toBe('2024-06-03');
        });
    });

    describe('Sorting Tasks', () => {
        // Test sorting tasks by date in ascending order
        test('should sort tasks by date in ascending order', () => {
            category.addTask(task2);
            category.addTask(task1);
            category.sortTasksByDateASC();
            expect(category.tasks).toEqual([task1, task2]);
        });

        // Test sorting tasks by date in descending order
        test('should sort tasks by date in descending order', () => {
            category.addTask(task1);
            category.addTask(task2);
            category.sortTasksByDateDESC();
            expect(category.tasks).toEqual([task2, task1]);
        });

        // Test sorting tasks by name in ascending order
        test('should sort tasks by name in ascending order', () => {
            category.addTask(task2);
            category.addTask(task1);
            category.sortTasksByNameASC();
            expect(category.tasks).toEqual([task1, task2]);
        });

        // Test sorting tasks by name in descending order
        test('should sort tasks by name in descending order', () => {
            category.addTask(task1);
            category.addTask(task2);
            category.sortTasksByNameDESC();
            expect(category.tasks).toEqual([task2, task1]);
        });
    });
});
