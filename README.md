# Node.js API Validation

A Node.js REST API project demonstrating request body validation using **Joi** schema validation, with **Swagger UI** for API documentation.

## Features

- REST API with Express.js
- Request body validation using Joi
- Custom error messages for validation failures
- Swagger UI for interactive API documentation
- CORS support

## Project Structure

```
nodejs_api_validation/
├── index.js                   # App entry point
├── swagger.json               # Swagger/OpenAPI specification
├── package.json
├── routes/
│   └── user.js                # User route definitions
├── controllers/
│   └── userController.js      # Route handler logic
└── SchemaValidation/
    ├── index.js               # Validation middleware
    ├── api_validation.js      # Joi schemas per endpoint
    └── customizeError.js      # Custom Joi error formatter
```

## Getting Started

### Prerequisites

- Node.js (v14 or above)
- npm

### Installation

```bash
cd nodejs_api_validation
npm install
```

### Running the Server

```bash
node index.js
```

Or with auto-reload using nodemon:

```bash
npx nodemon index.js
```

The server starts on port **8080** by default.

## API Endpoints

| Method | Endpoint          | Description                       | Validation |
| ------ | ----------------- | --------------------------------- | ---------- |
| GET    | `/getUser`        | Get user info                     | No         |
| POST   | `/user`           | Create user (with Joi validation) | Yes        |
| POST   | `/newUser`        | Create user (no validation)       | No         |
| PUT    | `/editUser/:id`   | Edit user by ID                   | No         |
| DELETE | `/deleteUser/:id` | Delete user by ID                 | No         |

## Validation Schema (`POST /user`)

The `/user` endpoint validates the request body using Joi:

| Field          | Type    | Required | Rules                          |
| -------------- | ------- | -------- | ------------------------------ |
| `firstName`    | string  | Yes      |                                |
| `lastName`     | string  | Yes      |                                |
| `age`          | number  | No       | Integer                        |
| `gender`       | string  | Yes      | Must be `"M"`, `"F"`, or `"O"` |
| `checkBoolean` | boolean | Yes      | Allows `null` and `""`         |
| `mobNo`        | string  | Yes      | Must be exactly 10 digits      |
| `sports`       | array   | Yes      | Array of objects               |
| `email`        | string  | Yes      | Valid email format             |
| `hobbies`      | array   | Yes      | Array of strings               |

### Example Request Body

```json
{
  "firstName": "Akshay",
  "lastName": "Wayangankar",
  "age": 27,
  "gender": "M",
  "checkBoolean": true,
  "mobNo": "9876543210",
  "sports": [{ "name": "Cricket", "players": 11 }],
  "email": "hi@akshaywayangankar.com",
  "hobbies": ["Reading", "Coding"]
}
```

### Validation Error Response

If validation fails, the API returns:

```json
{
  "statusCode": 400,
  "data": "Error:Required firstName\nError:Please enter lastName\n..."
}
```

## Swagger UI

Interactive API docs are available at:

```
http://localhost:8080/api-docs
```

## Dependencies

| Package              | Purpose                       |
| -------------------- | ----------------------------- |
| `express`            | Web framework                 |
| `joi`                | Schema validation             |
| `cors`               | Cross-origin resource sharing |
| `swagger-ui-express` | Swagger UI integration        |
| `nodemon`            | Dev auto-reload               |

## Author

**Akshay Wayangankar**  
Email: hi@akshaywayangankar.com  
Website: http://akshaywayangankar.com/

## License

ISC
