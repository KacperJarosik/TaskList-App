import { TaskManager } from "../Structs/TaskManager";
import { Task } from "../Structs/Task";

// To start tests
// npm install --save-dev jest
// npm test src/StructTests

describe('TaskManager', () => {
    let taskManager;

    beforeEach(() => {
        taskManager = new TaskManager();
    });

    describe('Initialization', () => {
        // Test TaskManager initialization with correct properties
        test('should create a TaskManager with correct properties', () => {
            expect(taskManager.categories).toEqual([]);
            expect(taskManager.nextCategoryId).toBe(1);
            expect(taskManager.nextTaskId).toBe(1);
        });
    });

    describe('Category Management', () => {
        // Test adding a new category to TaskManager
        test('should add a new category to TaskManager with correct properties', () => {
            taskManager.addCategory('Kategoria');
            expect(taskManager.categories.length).toBe(1);
            expect(taskManager.nextCategoryId).toBe(2);
            expect(taskManager.nextTaskId).toBe(1);
            expect(taskManager.categories[0].title).toBe('Kategoria');
            expect(taskManager.categories[0].tasks).toEqual([]);
        });

        // Test removing a category in TaskManager
        test('should remove a category in TaskManager with correct properties', () => {
            taskManager.addCategory('Kategoria');
            taskManager.removeCategory(taskManager.categories[0].id);
            expect(taskManager.categories).toEqual([]);
            expect(taskManager.nextCategoryId).toBe(2);
            expect(taskManager.nextTaskId).toBe(1);
        });
    });

    describe('Task Management', () => {
        beforeEach(() => {
            taskManager.addCategory('Kategoria');
        });

        // Test adding a new task into category in TaskManager
        test('should add a new task into category in TaskManager with correct properties', () => {
            taskManager.addTask(taskManager.categories[0].id, 'Task 1', '2024-06-16', 'To Do', 'wazne');
            expect(taskManager.categories[0].tasks.length).toBe(1);
            expect(taskManager.categories[0].tasks[0].text).toBe('Task 1');
            expect(taskManager.categories[0].tasks[0].date).toBe('2024-06-16');
            expect(taskManager.categories[0].tasks[0].status).toBe('To Do');
            expect(taskManager.categories[0].tasks[0].details).toBe('wazne');
        });

        // Test removing task in category in TaskManager
        test('should remove task in category in TaskManager with correct properties', () => {
            taskManager.addTask(taskManager.categories[0].id, 'Task 1', '2024-06-16', 'To Do', 'wazne');
            taskManager.removeTask(taskManager.categories[0].id, taskManager.categories[0].tasks[0].id);
            expect(taskManager.categories[0].tasks).toEqual([]);
            expect(taskManager.nextTaskId).toBe(2);
        });
    });

    describe('Task Updates', () => {
        beforeEach(() => {
            taskManager.addCategory('Kategoria');
            taskManager.addTask(taskManager.categories[0].id, 'Task 1', '2024-06-16', 'To Do', 'wazne');
        });

        // Test updating task in category in TaskManager
        test('should update task in category in TaskManager with correct properties', () => {
            const updatedTask = new Task(1, 'Updated Task 1', '2024-06-17', 'Done', 'bardzo wazne');
            taskManager.updateTask(taskManager.categories[0].id, 1, updatedTask);
            expect(taskManager.categories[0].tasks.length).toBe(1);
            expect(taskManager.categories[0].tasks[0].text).toBe('Updated Task 1');
            expect(taskManager.categories[0].tasks[0].date).toBe('2024-06-17');
            expect(taskManager.categories[0].tasks[0].status).toBe('Done');
            expect(taskManager.categories[0].tasks[0].details).toBe('bardzo wazne');
        });

        // Test updating task text in TaskManager
        test('should update task text in TaskManager', () => {
            taskManager.updateTaskText(taskManager.categories[0].id, taskManager.categories[0].tasks[0].id, 'Updated Task 1');
            expect(taskManager.categories[0].tasks[0].text).toBe('Updated Task 1');
        });

        // Test updating task date in TaskManager
        test('should update task date in TaskManager', () => {
            taskManager.updateTaskDate(taskManager.categories[0].id, taskManager.categories[0].tasks[0].id, '2024-06-17');
            expect(taskManager.categories[0].tasks[0].date).toBe('2024-06-17');
        });

        // Test updating task status in TaskManager
        test('should update task status in TaskManager', () => {
            taskManager.updateTaskStatus(taskManager.categories[0].id, taskManager.categories[0].tasks[0].id, 'Done');
            expect(taskManager.categories[0].tasks[0].status).toBe('Done');
        });

        // Test updating task details in TaskManager
        test('should update task details in TaskManager', () => {
            taskManager.updateTaskDetails(taskManager.categories[0].id, taskManager.categories[0].tasks[0].id, 'bardzo wazne');
            expect(taskManager.categories[0].tasks[0].details).toBe('bardzo wazne');
        });
    });

    describe('Storage Operations', () => {
        // Test loading categories and tasks from storage
        test('should load categories and tasks from storage', () => {
            localStorage.setItem('categories', JSON.stringify([{ id: 1, title: 'Kategoria', tasks: [{ id: 1, text: 'Task 1', date: '2024-06-16', status: 'To Do', details: 'wazne' }] }]));
            taskManager.loadFromStorage();
            expect(taskManager.categories.length).toBe(1);
            expect(taskManager.categories[0].title).toBe('Kategoria');
            expect(taskManager.categories[0].tasks.length).toBe(1);
            expect(taskManager.categories[0].tasks[0].text).toBe('Task 1');
            expect(taskManager.categories[0].tasks[0].date).toBe('2024-06-16');
            expect(taskManager.categories[0].tasks[0].status).toBe('To Do');
            expect(taskManager.categories[0].tasks[0].details).toBe('wazne');
            expect(taskManager.nextCategoryId).toBe(2);
            expect(taskManager.nextTaskId).toBe(2);
        });

        // Test saving categories and tasks to storage
        test('should save categories and tasks to storage', () => {
            taskManager.addCategory('Kategoria');
            taskManager.addTask(taskManager.categories[0].id, 'Task 1', '2024-06-16', 'To Do', 'wazne');
            taskManager.saveToStorage();
            const savedCategories = JSON.parse(localStorage.getItem('categories'));
            expect(savedCategories.length).toBe(1);
            expect(savedCategories[0].title).toBe('Kategoria');
            expect(savedCategories[0].tasks.length).toBe(1);
            expect(savedCategories[0].tasks[0].text).toBe('Task 1');
            expect(savedCategories[0].tasks[0].date).toBe('2024-06-16');
            expect(savedCategories[0].tasks[0].status).toBe('To Do');
            expect(savedCategories[0].tasks[0].details).toBe('wazne');
        });
    });
});
