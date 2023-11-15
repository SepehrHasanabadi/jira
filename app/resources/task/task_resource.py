from fastapi import status, APIRouter
from fastapi.responses import JSONResponse
from app.resources.task.schemas.task_responses import GetTasksResponse
from app.resources.task.schemas.task_request import CreateTaskRequest, UpdateTaskRequest
from app.resources.task.data import task_data

router = APIRouter()


@router.get("",
            status_code=status.HTTP_200_OK,
            responses={
                status.HTTP_200_OK: {
                    "model": str,
                    "content": {
                        "application/json": {
                            "example": "{}"
                        }
                    }
                }
            },
            response_class=JSONResponse,
            response_model=list[GetTasksResponse]
            )
async def get(q: str=None):
   return task_data.get_all_tasks(q)

@router.get("/{id}",
            status_code=status.HTTP_200_OK,
            responses={
                status.HTTP_200_OK: {
                    "model": str,
                    "content": {
                        "application/json": {
                            "example": "{}"
                        }
                    }
                }
            },
            response_class=JSONResponse,
            response_model=GetTasksResponse
            )
async def get(id: str):
   return task_data.get_task_by_id(id)

@router.post("",
            status_code=status.HTTP_201_CREATED,
            )
async def post(task: CreateTaskRequest):
   return task_data.create_task(task)

@router.put("/{id}",
            status_code=status.HTTP_200_OK,
            )
async def update(id: str, custom_list: UpdateTaskRequest):
   return task_data.update_task(id, custom_list)

@router.delete("",
            status_code=status.HTTP_200_OK,
            )
async def delete(id: str):
   return task_data.delete(id)