// TodoTaskService.ts

import AxiosApiService from '../services/AxiosApiService';
import Todo from '../models/Todo';

const API_BASE_URL = 'tasks'; // Replace with your TodoTask API base URL


const TodoTaskService = {
    getAllTasks: async (): Promise<Todo[]> => {
        try {
            const { data } = await AxiosApiService.get<Todo[]>(API_BASE_URL);
            return data;
        } catch (error) {
            console.error('Failed to fetch tasks', error);
            throw new Error('Failed to fetch tasks');
        }
    },

    addTask: async (newTask: Todo): Promise<Todo> => {
        try {
            const createdTask = await AxiosApiService.post<Todo>(API_BASE_URL, newTask);
            return createdTask;
        } catch (error) {
            console.error('Failed to add task', error);
            throw new Error('Failed to add task');
        }
    },

    // Add more methods as needed (updateTask, deleteTask, etc.)
};

export default TodoTaskService;
