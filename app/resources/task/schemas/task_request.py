from pydantic import BaseModel
from app.resources.task.schemas.task import Task

class CreateTaskRequest(Task):
    pass

class CustomFields(BaseModel):
    name: str
    value: str

class UpdateTaskRequest(BaseModel):
    items: list[CustomFields]