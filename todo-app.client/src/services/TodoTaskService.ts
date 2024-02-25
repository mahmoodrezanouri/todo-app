// TodoTaskService.ts

import AxiosApiService from '../services/AxiosApiService';

const API_BASE_URL = 'http://localhost:5065/api'; // Replace with your TodoTask API base URL

interface TodoTask {
    id: string;
    description: string;
    // Add other properties as needed
}

const TodoTaskService = {
    getAllTasks: async (): Promise<TodoTask[]> => {
        try {
            const { data } = await AxiosApiService.get<TodoTask[]>(`tasks`);
            return data;
        } catch (error) {
            console.error('Failed to fetch tasks', error);
            throw new Error('Failed to fetch tasks');
        }
    },

    addTask: async (newTask: TodoTask): Promise<TodoTask> => {
        try {
            const createdTask = await AxiosApiService.post<TodoTask>(`${API_BASE_URL}/tasks`, newTask);
            return createdTask;
        } catch (error) {
            console.error('Failed to add task', error);
            throw new Error('Failed to add task');
        }
    },

    // Add more methods as needed (updateTask, deleteTask, etc.)
};

export default TodoTaskService;
