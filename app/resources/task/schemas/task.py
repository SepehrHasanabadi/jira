from pydantic import BaseModel


class StaticFields(BaseModel):
    name: str
    description: str
    status: str

class CustomFields(BaseModel):
    name: str
    value: str
    type: str

class Task(BaseModel):
    static: StaticFields
    custom: list[CustomFields]
    