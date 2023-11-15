const API_URL = 'http://localhost:8000'

export const API = {
  GET_TASKS: `${API_URL}/task`,
  GET_TASK_BY_ID: `${API_URL}/task/:task_id`,
  CREATE_TASK: `${API_URL}/task`,
  UPDATE_TASK: `${API_URL}/task/:task_id`,
} 