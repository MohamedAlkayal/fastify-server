# Deploying Fastify Server to Vercel

This guide outlines the steps to deploy your Fastify server to Vercel.

## Prerequisites

1. A Vercel account (sign up at [vercel.com](https://vercel.com))
2. Vercel CLI installed (optional, but useful for local testing)
   ```bash
   npm i -g vercel
   ```
3. MongoDB database (such as MongoDB Atlas)

## Deployment Steps

### 1. Install Vercel CLI and Login (optional)

```bash
npm i -g vercel
vercel login
```

### 2. Set Up Environment Variables

In your Vercel dashboard:
1. Navigate to your project after importing it
2. Go to "Settings" > "Environment Variables"
3. Add the following environment variables:
   - `DB_URI`: Your MongoDB connection string
   - `CLIENT_URL`: The URL of your frontend application (for CORS)
   - `NODE_ENV`: Set to `production`

### 3. Deploy to Vercel

#### Option 1: Using Vercel CLI

```bash
# From your project directory
vercel
```

#### Option 2: Using Vercel Dashboard

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Import your repository in the Vercel dashboard
3. Configure your project settings
4. Deploy

### 4. Verify Deployment

After deployment, Vercel will provide you with a URL for your API. Test your endpoints to verify everything is working correctly.

## Configuration Files

The project includes the following configuration files for Vercel deployment:

- `vercel.json`: Configures the build and routing for Vercel
- `api/index.ts`: Serverless function entry point for Vercel
- `.env.example`: Template for required environment variables

## Notes on Serverless Architecture

- Vercel uses a serverless architecture, which means your Fastify server is wrapped in a serverless function
- Cold starts may occur if your API doesn't receive traffic for a while
- For production applications with consistent traffic, consider upgrading to a paid Vercel plan to reduce cold starts
- MongoDB connections are managed differently in a serverless environment; the connection is established for each function invocation
