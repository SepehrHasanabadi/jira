'use client'
import Link from 'next/link';
import TaskList from './components/TaskList';
import { API } from './components/constants/api';
import { TASK } from './components/constants/routes';
import { ApiCall, callAPI } from './helpers/ApiCall';
import { TaskItem } from './types/task';


export default function Home() {
  const [tasks, setTasks] = ApiCall<TaskItem[]>(API.GET_TASKS, { method: "GET"});

  const searchTask = (event: any) => {
    event.preventDefault();
    callAPI(`${API.GET_TASKS}?q=${event.target[0].value}`, { method: "GET"}, setTasks);
  }

  return (
    <div className="md:container md:mx-auto md:my-32">
      <div className='flex justify-end my-5'>
        <button type="button" >
          <Link className="w-32 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-4 py-2 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" href={TASK.ADD_TASK}>Add Task</Link>
        </button>
        <div className='flex flex-1 justify-end'>
          <form className='md:my-2 w-1/3' onSubmit={(event) => searchTask(event)}>   
            <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                </div>
                <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Static or Custom Fields..." />
                <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
            </div>
          </form>
        </div>
      </div>
      <TaskList tasks={tasks}/>
    </div>
  )
}
