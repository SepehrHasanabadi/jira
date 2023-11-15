import datetime
from fastapi import HTTPException
from app.resources.task.models.task_model import TaskModel
from app.resources.task.schemas.task_responses import GetTasksResponse
from starlette import status


def get_all_tasks(q: str):
    tasks = TaskModel.get_all(q)
    if tasks == None:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST)
    return [GetTasksResponse(**u) for u in tasks]

def get_task_by_id(id: str):
    task = TaskModel.get(id)
    if task == None:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST)
    return GetTasksResponse(**task)

def create_task(task):
    if (TaskModel.create(task.dict())):
        return {}
    raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST)


def get_type_from_value(value):
    if (value.isdigit()):
        return 'integer'
    elif (value.startswith('http')):
        return 'link'
    try:
        datetime.date.fromisoformat(value)
        return 'date'
    except:
        return 'string'
    

def update_task(id, custom_list):
    custom_list = [{**u.dict(), "type": get_type_from_value(u.value)} for u in custom_list.items]
    if (TaskModel.update(id, custom_list)):
        return {}
    raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST)


def delete(id):
    if(TaskModel.delete(id)):
        return {}
    raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST)

