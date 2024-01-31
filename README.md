# Wander Basket - Backend API

<br>

## Description

Backend using MongoDB and deployed with Adaptable

# Server / Backend

## Models

User model

```javascript
{
    picture: {
      type: String,
      default: "https://cdn-icons-png.flaticon.com/512/9131/9131529.png",
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },

    hashedPassword: { type: String, required: true },

    username: {
      type: String,
      required: true,
      unique: true,
    },
}
```

Trip model

```javascript
 {
   title: {
      type: String,
      required: [true, "Title is required."],
      trim: true,
    },
    description:{
      type: String,
    },
    image: {
      type: String,
      required: [true, "Image is required."],
    },
    destination: {
      type: String,
      required: [true, "Place is required."],
      trim: true,
    },
    participants: [
      {
        type: Types.ObjectId,
        ref: "User",
      },
    ],
    groceries: [
      {
        type: Types.ObjectId,
        ref: "GroceryItem",
      },
    ],
    createdBy: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
 }
```

GroceryItem model

```javascript
 {
   name: {
      type: String,
      required: [true, "Name of the item is required."],
      trim: true,
    },
    image:{
      type: String,
      default:"https://img.freepik.com/free-photo/top-view-fresh-vegetables-arrangement_23-2149271094.jpg?w=900&t=st=1706691719~exp=1706692319~hmac=aa12dce3ae0d9b6cf827cc6c9540cc1d90211bd91bd0d201f4f1770b1f3fdf5f",
    },
    quantity: {
      type: String,
      required: [true, "Quantity is required."],
    },
    label: {
      type: String,
      enum: ["Needs to be purchased", "Someone will bring it"],
      required: [true, "Label is required."],
    },
    trip: {
      type: Types.ObjectId,
      ref: "Trip",
    },
    createdBy: {
      type: Types.ObjectId,
      ref: "User",
    },
 }
```

<br>

## API Endpoints (backend routes)

| HTTP Method | URL                     | Request Body                | Success status | Error Status | Description                                                                                                                     |
| ----------- | ----------------------- | --------------------------- | -------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------- | --- |
| POST        | `/auth/signup`          | {username, email, password} | 201            | 404          | Checks if fields not empty (422) and user not exists (409), then create user with encrypted password, and store user in session |
| POST        | `/auth/login`           | {username, password}        | 200            | 401          | Checks if fields not empty (422), if user exists (404), and if password matches (404), then stores user in session              |
| GET         | `/auth/verify`          | (empty)                     | 204            | 400          | Logs out the user                                                                                                               |
| POST        | `/api/trips/`           | {platform, title, type, id} |                | 400          | Add new backlog element and add to trips                                                                                        |
| GET         | `/api/trips/`           |                             |                | 400          | Show series trips                                                                                                               |
| GET         | `/api/trips/:id`        |                             | 201            | 400          | Show specific trips                                                                                                             |
| PUT         | `/api/trips/:id`        |                             | 200            | 400          | edit trips                                                                                                                      |
| DELETE      | `/api/trips/:id`        |                             | 201            | 400          | delete trips                                                                                                                    |
| POST        | `/api/groceryItems/`    | {platform, title, type, id} |                | 400          | Add new backlog element and add to groceries                                                                                    |
| GET         | `/api/groceryItems/`    |                             |                | 400          | Show series groceries                                                                                                           |
| GET         | `/api/groceryItems/:id` |                             | 201            | 400          | Show specific groceries                                                                                                         |
| PUT         | `/api/groceryItems/:id` |                             | 200            | 400          | edit groceries                                                                                                                  |
| DELETE      | `/api/groceryItems/:id` |                             | 201            | 400          | delete groceries                                                                                                                |     |

<br>

## Links

### Trello/Kanban

[Link to our trello board](https://trello.com/b/vUanONZ8/trip-planner)

### Git

[Server repository Link](https://github.com/emi-fto/Trip-Planner---Module-3-Project-Back-End-)

[Deployed App Link](https://trip-planner-m3-project.adaptable.app/)

### Slides

[Slides Link]()
