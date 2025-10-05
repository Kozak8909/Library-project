# Library REST API

## Tech Stack:
- TypeScript
- Node.js + Express
- PostgreSQL (via pg library)

## Features:

- Integrated CRUD-operations through methods: GET, POST, PUT, DELETE.

- Registration, authentication, and authorization (addind, updating, deleting are now available only for admins).

- Automatically loging errors by use of custom middleware.

- Well-structured project with modular code.

- Clean use of TypeScript type specification and checking.

- Responses are handled inside the route functions giving consistent error messages with appropriate status codes.

- Saving error logs using custom middleware (which can be modified to save errors even to the database).

- Integrated CORS to assure security and allow only specified domains (front - end, for example).

## Usage: 

| Method |       Endpoint       |             Description              | 
|--------|----------------------|--------------------------------------|
| GET    | /books/find          | Returns all books                    |
| GET    | /books/find?title=x  | Returns a book with title x          |
| GET    | /books/find?author=x | Returns a book with specified author |
| GET    | /books/find/:id      | Returns a book with specified id     |
| POST   | /login               | Allows user to login                 | 
| POST   | /refresh             | Refreshes the access token           |
| POST   | /logout              | Allows user to logout                |
| POST   | /register            | Registers a new user                 |
| POST   | /books/add           | Adds a book to the data base         |
| PUT    | /books/update/:id    | Updates a book with specified id     |
| DELETE | /books/delete/:id    | Deletes a book with specified id     |

### Notice:

- If you are going to test the api using tools like Postman (which do not send information about origin of request), include || !origin in the if statement in corsOptions.ts, otherwise CORS will not allow any actions. 
- When updating a book an amount of authors should be the same, if you want to remove / add an author, you should delete the book and add it again with correct amount of authors.
- The assignment of the role "User" is handled inside the database and it is set by the default.
- To access add, update, and delete you should manually give an admin role (5150) to the user in the table userroles in your database.  

## Setup:
1. Clone repository
2. Run `npm install`
3. Configure data base settings in src/db.ts
4. Run `npm run build`
5. Run `npm run start`

## Example:
GET /books/find
Response: 
[
    {
        "id": 1
        "title": "The Lord Of The Rings",
        "authors": [ "J.R.R. Tolkien" ]
    },
    {
        "id": 2
        "title": "The Witcher",
        "authors": [ "Andrzej Sapkowski" ]
    }
]
POST /books/add
Body: 
{
    "title": "Harry Potter and the Sorcerer's Stone",
    "authors": [ "J. K. Rowling" ]
}
Response: 
{ Book added }