# Peddy - Pet Adoption Platform

**Peddy** is an open-source dynamic platform where users can explore their favorite cats, view detailed information, like the cats they love, and even adopt them. It offers an intuitive interface for users to interact with the adoption process easily.

## Features

- **Like Cats**: Users can like their favorite cats. These liked cats are stored in **localStorage** and shown on the right-hand side.
- **Adopt Cats**: Users have the option to adopt their selected cats through the platform.
- **View Cat Details**: Detailed information about each cat can be accessed by clicking the "Details" button.
- **Manage Liked Cats**: Users can remove cats from their liked list, and this also updates **localStorage** to persist the changes.
- **Sort by Price**: Users can sort the cats based on their adoption price.

## ES6 Features Used

- **Arrow Functions**: Provides a more concise way to write functions, especially for handling the context of `this`.
- **Template Literals**: Simplifies string concatenation by embedding variables and expressions inside strings.
- **Object Destructuring**: Allows for cleaner and more readable code when extracting values from objects.
- **For-of Loop**: Ideal for iterating over arrays and other iterable objects.
- **For-in Loop**: Used for iterating over object properties efficiently.
- **`let` and `const` Declarations**: For block-scoped variable declarations.
- **Default Parameters**: Used in functions to set default values for parameters.
- **Async/Await**: For handling asynchronous operations in a more readable way.

## Local Storage Implementation

- **Liked Cats Storage**: When users like a cat, the cat's information is saved in **localStorage** to ensure persistence across sessions.
- **Removing Liked Cats**: Users can click on their liked cats (displayed on the right side) to remove them from the list, which also deletes the entry from **localStorage**.

## Project Links

- **GitHub Repository**: [https://github.com/FollowNaim/PH-assignment-sixth](https://github.com/FollowNaim/PH-assignment-sixth)
- **Live Demo**: [https://phero-assignment6.netlify.app/](https://phero-assignment6.netlify.app/)
