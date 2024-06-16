import { Task } from "../Structs/Task.js";

// To start tests
// npm install --save-dev jest
// npm test src/StructTests

describe('Task', () => {
    let task;

    // Setup a new task before each test
    beforeEach(() => {
        task = new Task(1, 'Test Task', '2024-06-01', 'To Do', 'Task details');
    });

    // Test task creation with correct properties
    test('should create a task with correct properties', () => {
        expect(task.id).toBe(1);
        expect(task.text).toBe('Test Task');
        expect(task.date).toBe('2024-06-01');
        expect(task.status).toBe('To Do');
        expect(task.details).toBe('Task details');
    });

    // Test updating task text
    test('should update the task text', () => {
        task.text = 'Updated Task';
        expect(task.text).toBe('Updated Task');
    });

    // Test updating task date
    test('should update the task date', () => {
        task.date = '2024-06-02';
        expect(task.date).toBe('2024-06-02');
    });

    // Test updating task status
    test('should update the task status', () => {
        task.status = 'In Progress';
        expect(task.status).toBe('In Progress');
    });

    // Test updating task details
    test('should update the task details', () => {
        task.details = 'Updated task details';
        expect(task.details).toBe('Updated task details');
    });

    // Test marking the task as completed
    test('should mark the task as completed', () => {
        task.status = 'Completed';
        expect(task.status).toBe('Completed');
    });

    // Test marking the task as archived
    test('should mark the task as archived', () => {
        task.status = 'Archived';
        expect(task.status).toBe('Archived');
    });

    // Test clearing task details
    test('should clear the task details', () => {
        task.details = '';
        expect(task.details).toBe('');
    });

    // Test changing task ID
    test('should change the task ID', () => {
        task.id = 2;
        expect(task.id).toBe(2);
    });

    // Test changing task multiple properties
    test('should change multiple properties of the task', () => {
        task.text = 'New Task Text';
        task.date = '2024-07-01';
        task.status = 'Completed';
        task.details = 'New details for the task';

        expect(task.text).toBe('New Task Text');
        expect(task.date).toBe('2024-07-01');
        expect(task.status).toBe('Completed');
        expect(task.details).toBe('New details for the task');
    });
});
