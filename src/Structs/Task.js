export class Task {
    constructor(id, text, date, status, details) {
        this.id = id;
        this.text = text;
        this.date = date;
        this.status = status; // Add status field
        this.details = details; // Add details field
    }
}