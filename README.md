# Library REST API

## Tech Stack:
- TypeScript
- Node.js + Express
- PostgreSQL (via pg library)

## Features:

- Integrated CRUD-operations through methods: GET, POST, PUT, DELETE.

- Automatic initialization of data base (if does not exist).

- Well-structured project with modular code.

- Clean use of TypeScript type specification and checking.

- Responses are handled inside the route functions giving consistent error messages with appropriate status codes.

## Usage: 

| Method | Endpoint | Description               |
|--------|----------|---------------------------|
| GET    | /        | Get all                   |
| POST   | /        | Add new book              |
| GET    | /:id     | Get book by ID            |
| PUT    | /:id     | Update book by ID         |
| DELETE | /:id     | Delete book by ID         |

## Setup:
1. Clone repository
2. Run `npm install`
3. Configure data base settings in src/db.ts
4. Run `npm run build`
5. Run `npm run start`

## Example:
GET /
Response: 
[
    {
        "id": 1
        "title": "The Lord Of The Rings",
        "author": "J.R.R. Tolkien"
    },
    {
        "id": 2
        "title": "The Witcher",
        "author": "Andrzej Sapkowski"
    }
]
POST /
Body: 
{
    "title": "Harry Potter and the Sorcerer's Stone",
    "author": "J. K. Rowling"
}
Response: 
{
    "id": 3
    "title": "Harry Potter and the Sorcerer's Stone",
    "author": "J. K. Rowling"
}