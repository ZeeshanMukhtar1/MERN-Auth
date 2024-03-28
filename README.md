# MERN Stack Auth App Boilerplate

## Overview

This MERN (MongoDB, Express.js, React.js, Node.js) stack authentication app serves as a comprehensive boilerplate for building full-stack applications with user authentication. It provides a foundation for manual user creation with email and password, as well as an option to continue with Google authentication. The frontend is developed using React with Redux for state management, while the backend is built with Express, employing MongoDB as the database. The styling is implemented with Tailwind CSS, and React Router handles the routing.

## Getting Started

To get started with this project, follow these steps:

1. Clone this repository to your local machine.

   ```bash
   git clone https://github.com/ZeeshanMukhtar1/MERN-Auth.git
   ```

2. Navigate to the project directory.

   ```bash
   cd MERN-Auth
   ```

3. Create a `.env` file in both the `client` and `server` directories based on the provided `.env.sample` files.

4. Setup a Firebase app and obtain necessary credentials. If you are not familiar with Firebase, please refer to its basic usage documentation.

5. In both the `client` and `server` directories, install dependencies using npm.

   ```bash
   npm install
   ```

6. Run the app by simultaneously running `npm run dev` in both the `client` and `server` folders in separate terminal windows.

   ```bash
   # Terminal 1 (server)
   cd server
   npm run dev

   # Terminal 2 (client)
   cd ../client
   npm run dev
   ```

Now you should have the app up and running locally!

## Features

- User authentication with email and password
- Google authentication integration
- Redux for efficient state management
- Tailwind CSS for responsive and sleek UI
- Easy customization for your specific project requirements

## Contributing

We welcome contributions to improve and enhance the boilerplate. If you have any suggestions, bug fixes, or feature additions, feel free to submit a pull request. Don't forget to give the repository a star if you find it helpful!

## License

This MERN Stack Auth App Boilerplate is open-source and available under the [MIT License](LICENSE).

---

Happy coding! 🚀
