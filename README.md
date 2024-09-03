
# MERN Content Management System

This repository contains a Content Management System (CMS) built using the MERN stack (MongoDB, Express, React, Node.js). The project is organized as a monorepo with separate packages for the server and client applications.

## Project Structure

- **app/server**: Contains the server-side code (Node.js, Express, MongoDB).
- **app/client**: Contains the client-side code (React).

## Prerequisites

- Node.js (>= 18.x)
- Yarn package manager
- Docker (for running the application in containers)

## Installation

To install the dependencies for both the server and client, run the following command in the root of the project:

\`\`\`bash
yarn install
\`\`\`

This will install all necessary packages for both the \`server\` and \`client\` workspaces.

## Running the Application

### Running with Docker

The recommended way to run both the server and client is using Docker. This ensures consistency across environments.

#### Starting the Server in Docker

To run the server in a Docker container, use:

\`\`\`bash
yarn docker:server
\`\`\`

This command will build and start the server container, ensuring that the environment is correctly configured.

#### Stopping the Server in Docker

To stop the server container:

\`\`\`bash
yarn docker:server:down
\`\`\`

#### Viewing Server Logs

To view logs from the server container:

\`\`\`bash
yarn docker:logs:server
\`\`\`

#### Starting the Client in Docker

To run the client in a Docker container, use:

\`\`\`bash
yarn docker:client
\`\`\`

#### Viewing Client Logs

To view logs from the client container:

\`\`\`bash
yarn docker:logs:client
\`\`\`

### Development Mode

If you prefer to run the application without Docker, ensure that you have Node.js 18 or higher installed.

To start both the server and client in development mode outside of Docker, use the following command:

\`\`\`bash
yarn start
\`\`\`

This will run both the server and client applications concurrently.

## Code Formatting

This project uses Prettier for code formatting. To format the codebase, run:

\`\`\`bash
yarn prettier
\`\`\`

## Environment Variables

Both the server and client have their respective \`.env\` files to configure environment-specific variables. Make sure to update these files with the correct settings before running the application.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Contributing

If you wish to contribute to this project, please fork the repository and submit a pull request with your changes.
