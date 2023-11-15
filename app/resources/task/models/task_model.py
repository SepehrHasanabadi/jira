from app.db import elasticsearch


index_name = 'task'

class StaticFields:
    name: str
    description: str
    status: str

class CustomFields:
    name: str
    value: str
    type: str

class TaskModel:
    static: StaticFields
    custom: [CustomFields]

    @staticmethod
    def get_all(q: str):
        search_keys=['static.name', 'static.description']
        nested_search_keys = ['custom.name', 'custom.value']
        return elasticsearch.get_all(index_name, search_keys, nested_search_keys, q)

    @staticmethod
    def get(id: str):
        return elasticsearch.get(index_name, id)

    @staticmethod
    def create(task):
        return elasticsearch.create(index_name, task)

    @staticmethod
    def update(id, custom_list):
        return elasticsearch.update(index_name, id, custom_list)

    @staticmethod
    def delete(id):
        return elasticsearch.delete(index_name, id)
