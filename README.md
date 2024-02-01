# Wander Basket - Backend MongoDB API

<br>

## Sometimes a Backend is more than just behind the scenes!

![App Logo](https://github.com/emi-fto/Trip-Planner---Module-3-Project-Back-End-/blob/main/images/applogo_color.png)

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

| HTTP Method | URL                               | Request Body                       | Success status | Error Status | Description                                                                        |
| ----------- | --------------------------------- | ---------------------------------- | -------------- | ------------ | ---------------------------------------------------------------------------------- |
| POST        | `/auth/signup`                    | {username, email, password, image} | 201            | 500          | Route to create a user only if the email address doesn't exist already             |
| POST        | `/auth/login`                     | {username, password}               | 200            | 500          | Route to login only if email and passwords are correct, through token verification |
| GET         | `/auth/verify`                    |                                    | 200            |              | Route to verify the user through the token payload                                 |
| GET         | `/api/users/`                     |                                    | 200            | 500          | Route to get all users from the database                                           |
| GET         | `/api/users/:userId`              |                                    | 200            | 500          | Route to get a specific user from the database                                     |
| PUT         | `/api/users/:userId`              | {username, image}                  | 200            | 500          | Route to edit fields for a specific user in the database                           |
| POST        | `/api/trips/`                     | {title, image, destination,        | 201            | 500          | Route to add a new trip in the database                                            |
|             |                                   | description, articipants}          |                |              |                                                                                    |
| GET         | `/api/trips/`                     |                                    | 200            | 500          | Route to get all trips from the database                                           |
| GET         | `/api/trips/:tripId/groceryitems` |                                    | 200            | 500          | Route to get grocery items for a specific trip. This route can handle queries too  |
| GET         | `/api/trips/user/:userId`         |                                    | 200            | 500          | Route to get all trips for a specific user                                         |
| GET         | `/api/trips/:id`                  |                                    | 200            | 500          | Route to get a specific trip from the database                                     |
| PUT         | `/api/trips/:id`                  | {title, image, destination,        | 200            | 500          | Route to edit fields for a specific trip in the database                           |
|             |                                   | description, articipants}          |                |              |                                                                                    |
| DELETE      | `/api/trips/:id`                  |                                    | 204            | 500          | Route to delete a specific trip from the dataabase                                 |
| POST        | `/api/groceryItems/`              |                                    | 201            | 500          | Route to get all groceries from the database                                       |
| GET         | `/api/groceryItems/`              |                                    | 200            | 500          | Route to get all groceries from the database                                       |
| GET         | `/api/groceryItems/:id`           |                                    | 200            | 500          | Route to get a specific grocery from the database                                  |
| PUT         | `/api/groceryItems/:id`           |                                    | 200            | 500          | Route to edit fields for a specific grocery in the database                        |
| DELETE      | `/api/groceryItems/:id`           |                                    | 204            | 500          | Route to delete a specific grocery from the database                               |

<br>

## Links

### Trello/Kanban

[Link to our trello board](https://trello.com/b/vUanONZ8/trip-planner)

### Git

[Server repository Link](https://github.com/emi-fto/Trip-Planner---Module-3-Project-Back-End-)

[Deployed App Link](https://trip-planner-m3-project.adaptable.app/)

### Slides

[Slides Link](https://pitch.com/v/wanderbasket-your-ultimate-tavel-grocery-companion-xgytz9)
