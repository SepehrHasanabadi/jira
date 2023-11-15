import os
from elasticsearch import Elasticsearch
from app.config import settings
from app.db.indices import mappings
from app.utils.exception.exception_types import DataException


ES = Elasticsearch(settings.ES_ENDPOINT)


def get_index(index_name):
    if not ES.indices.exists(index=index_name):
        ES.indices.create(index=index_name, mappings=mappings[index_name])
    return index_name


def _get_search_result(search):
    results = []
    d = dict(search.body)
    hits = d['hits']['hits']
    for i in hits:
        results.append({"id": i["_id"], **i["_source"]})
    return results


def get_all(index_name: str, keywords: [str], nested_keywords, q:str=None):
    try:
        r = get_result_by_parameter(index_name, keywords, nested_keywords, q)
        results = _get_search_result(r)
    except Exception as e:
        return None
    return results


def get(index_name: str, id):
    try:
        r = ES.get(index=get_index(index_name), id=id)
        result = dict(r.body)['_source']
        result['id'] = r['_id']
        return result
    except Exception as e:
        return None


def get_result_by_parameter(index_name, keys, nested_keys, value):
    if (value):
        shoulds = [
            { 
                "term": {
                    f"{key}": f"{value}",
                }
            } for key in keys
        ]
        for nested in nested_keys:
            shoulds.append(
                {
                    "nested": {
                        "path": nested.split('.')[0],
                        "query": {"term": { nested: value }}
                    }
                }
            )
        query = {
            "bool" : {
                "should" : shoulds,
                "minimum_should_match" : 1,
                "boost": 1.0
            }
        }
    else: 
        query = {
            "match_all": {}
        }
    try:
        return ES.search(index=get_index(index_name), query=query, size=10000)
    except Exception as x:
        print(x)
        return None


def create(index_name, json_data):
    try:
        ES.index(index=get_index(index_name), document=json_data)
    except Exception as e:
        return False
    return True


def update(index_name, id: str, custom_list):
    body = {
        "doc": {
            "custom": custom_list
        }
    }
    try:
        ES.update(index=get_index(index_name), id=id, body=body)
    except Exception as e:
        return False
    return True


def delete(index_name, id):
    try:
        ES.delete(index=get_index(index_name), id=id)
    except Exception as e:
        return False
    return True