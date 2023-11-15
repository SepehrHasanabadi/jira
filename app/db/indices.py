
mappings = {
    "task": {
        "properties": {
            "static": {
                "properties": {
                    "name": {"type": "text"},
                    "description": {"type": "text"},
                    "status": {"type": "keyword"}
                }
            },
            "custom": {
                "type": "nested",
                "properties": {
                    "name": {
                        "type": "text",
                    },
                    "value": {
                        "type": "text",
                    },
                    "type": {
                        "type": "keyword",
                    }
                }
            },
        },
    }
}