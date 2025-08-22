# Fastify Server Project

This project is a simple Fastify server that responds with "Hello World" at the `/hello` endpoint.

## Project Structure

```
fastify-server
├── src
│   ├── server.ts          # Entry point of the Fastify application
│   └── routes
│       └── hello.ts      # Route definition for the /hello endpoint
├── package.json           # npm configuration file
├── tsconfig.json          # TypeScript configuration file
└── README.md              # Project documentation
```

## Getting Started

1. **Install Dependencies**  
   Run the following command to install the required dependencies:
   ```
   npm install
   ```

2. **Run the Server**  
   Use the following command to start the Fastify server:
   ```
   npm start
   ```

3. **Access the Endpoint**  
   Open your browser or use a tool like Postman to access:
   ```
   http://localhost:3000/hello
   ```
   You should see the response:
   ```
   Hello World
   ```

## License

This project is licensed under the MIT License.