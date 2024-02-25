import AxiosApiService from '../services/AxiosApiService';
import Todo from '../models/Todo';

const API_BASE_URL = 'tasks';


const TodoTaskService = {
    getAllTasks: async (): Promise<Todo[]> => {

        const { data } = await AxiosApiService.get<Todo[]>(API_BASE_URL);
        return data;

    },

    addTask: async (newTask: Todo): Promise<Todo> => {

        const createdTask = await AxiosApiService.post<Todo>(API_BASE_URL, newTask);
        return createdTask;

    },


};

export default TodoTaskService;
