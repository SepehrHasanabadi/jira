"use client"
import { useSearchParams } from "next/navigation";
import { API } from "../constants/api";
import { ApiCall, callAPI } from "../helpers/ApiCall";
import { TaskItem } from "../types/task";
import { useEffect, useState } from "react";

export default function TaskPage() {
  const params = useSearchParams();
  const [successVisible, setSuccessVisible] = useState(false);
  const [custom, setCustom] = useState([{
    name: '',
    value: '',
  }]);
  const [task] = ApiCall<TaskItem>(API.GET_TASK_BY_ID.replace(':task_id', params.get('id') || ''), { method: "GET"});

  useEffect(() => {
    setCustom(task?.custom || []);
  }, [task])

  const saveCustoms = (event: any) => {
    event.preventDefault();
    if (!custom.every(item => item.value && item.name)){
      return;
    }
    callAPI(API.UPDATE_TASK.replace(':task_id', params.get('id') || ''), { method: "PUT", body: JSON.stringify({items: custom})}).then(_ =>
      setSuccessVisible(true)
    );
  }

  return (
    <div className="md:container md:mx-auto md:my-10">
      <div className={`${!successVisible ? "hidden" : ''} flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800`} role="alert">
        <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
            </svg>
            <span className="sr-only">Check icon</span>
        </div>
        <div className="ms-3 text-sm font-normal">Custom Fields Updated successfully.</div>
        <button type="button" className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-success" aria-label="Close" onClick={() => setSuccessVisible(false)}>
            <span className="sr-only">Close</span>
            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
            </svg>
        </button>
      </div>
      <div className="py-10 grid gap-y-1 grid-cols-1">
        <p className="text-4xl text-gray-900 dark:text-white mb-6">Static Fields</p>
        <input disabled value={task?.static.name} className="bg-gray-50 border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-300 dark:focus:ring-blue-500 dark:focus:border-blue-500" />
        <textarea rows={6} value={task?.static.description} disabled className="block p-2.5 w-full text-sm text-gray-500 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-300 dark:focus:ring-blue-500 dark:focus:border-blue-500" />
      </div>
      <form className="py-10 grid gap-y-1 grid-cols-1" onSubmit={(event) => saveCustoms(event)}>
        <p className="text-4xl text-gray-900 dark:text-white mb-6">Custom Fields</p>
        {custom.map(item => 
          <div className="flex gap-x-5">
            <input required value={item.name} onChange={(e) => {
              item.name = e.target.value
              setCustom([...custom])
          }} placeholder="Name" className="bg-gray-50 border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-300 dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            <input required value={item.value} onChange={(e) => {
              item.value = e.target.value
              setCustom([...custom])
          }} placeholder="Value" className="bg-gray-50 border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-300 dark:focus:ring-blue-500 dark:focus:border-blue-500" />
          </div>  
        )}
        <div className="flex w-1/3 gap-x-1">
          <button 
            type="submit"
            className="text ghost flex-1 -white mt-10 bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Save
          </button>
          <button 
            className="text flex-1 -white mt-10 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={() => setCustom([...custom, {
              name: '',
              value: '',
            }])}
            >
            Add Field
          </button>
        </div>
        </form>
    </div>
  )
}
