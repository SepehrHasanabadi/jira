import Link from "next/link";
import { TaskItem } from "../types/task";

export default function TaskList({tasks}: {tasks: TaskItem[]|undefined}) {
  return (
    <ul className="w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
      { tasks && tasks.map(item => 
        <Link href={
          `/task?id=${item.id}`
          } className="block w-full px-4 py-2 border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:text-white">
          {item.static.name}
        </Link>  
      )}
    </ul>
  )
}
