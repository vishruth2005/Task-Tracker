import { makeAutoObservable, runInAction } from 'mobx';
import axios from 'axios';

const api = axios.create({
    baseURL: '/task-tracker/api'
});

class TaskStore {
    tasks = [];
    loading = false;
    error = null;

    constructor() {
        makeAutoObservable(this);
    }

    async fetchTasks() {
        this.loading = true;
        this.error = null;
        try {
            const response = await api.get('/tasks');
            runInAction(() => { this.tasks = response.data; });
        } catch (err) {
            runInAction(() => { this.error = "Failed to fetch tasks"; });
        } finally {
            runInAction(() => { this.loading = false; });
        }
    }

    async addTask(taskData) {
        try {
            const response = await api.post('/tasks', taskData);
            runInAction(() => { this.tasks.push(response.data); });
        } catch (err) {
            console.error("Error adding task:", err);
        }
    }
}

// Export the instance
export const taskStore = new TaskStore();