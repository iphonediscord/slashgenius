const defaults = [
    {
        "name": "create",
        "description": "Creates a new tag",
        "options": [
            {
                "name": "name",
                "description": "Name of the tag",
                "type": 3,
                "required": true
            },
            {
                "name": "content",
                "description": "Content of the tag",
                "type": 3,
                "required": true
            }
        ],
        "default_permission": false,
        "managerOnly": true
    },
    {
        "name": "delete",
        "description": "Delete an existing tag",
        "options": [
            {
                "name": "name",
                "description": "Name of the tag",
                "type": 3,
                "required": true
            }
        ],
        "default_permission": false,
        "managerOnly": true
    },
    {
        "name": "update",
        "description": "Updates all commands.",
        "default_permission": false,
        "managerOnly": true
    },
    {
        "name": "floppa",
        "description": "Big Floppa",
        "managerOnly": false
    }
]

export { defaults };