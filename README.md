# Podcast Search API - Fastify Server

This project is a Fastify-based API server that provides podcast search functionality with caching, rate limiting, and analytics collection capabilities.

## Project Structure

```
fastify-server
├── src
│   ├── server.ts                      # Entry point of the Fastify application
│   ├── db.ts                          # Database connection setup
│   ├── routes
│   │   └── search.ts                  # Podcast search API endpoint
│   └── schemas
│       ├── CachedSearchResultModel.ts # Schema for caching search results
│       └── SearchAnalyticsModel.ts    # Schema for tracking search analytics
├── package.json                       # npm configuration file
├── tsconfig.json                      # TypeScript configuration file
├── .env                               # Environment variables
└── README.md                          # Project documentation
```

## Core Services

### 1. Podcast Search Service
The primary service provides a search API that queries the iTunes podcast directory.

**Endpoint**: `GET /search/podcast`

**Query Parameters**:
- `term`: The search term (required)
- `limit`: Maximum number of results to return (default: 10)
- `country`: Country code for search results (default: US)

**Features**:
- Retrieves podcast information from the iTunes API
- Returns detailed podcast metadata including artwork, descriptions, and URLs
- Handles error states gracefully

### 2. Caching Service
Implements an intelligent caching system with dynamic TTL (Time-To-Live) based on search popularity.

**Features**:
- Hash-based caching to efficiently store search results
- Dynamic cache expiration that adjusts based on query popularity
- Exponential decay algorithm for cache TTL management
- Performance optimization through reduced external API calls

### 3. Analytics Service
Collects anonymized search analytics for understanding user behavior.

**Features**:
- Tracks search terms and usage patterns
- Collects geolocation data for regional insights
- Stores timestamp data for temporal analysis
- Helps improve search relevance and user experience

### 4. Security and Rate Limiting
Implements protective measures to ensure stable service and prevent abuse.

**Features**:
- CORS protection with configurable origins
- Rate limiting (100 requests per minute)
- Friendly error messages with TTL information
- IP-based tracking for rate limiting

## Environment Variables

The server requires the following environment variables:
- `DB_URI`: MongoDB connection string
- `CLIENT_URL`: Allowed CORS origin (defaults to * if not specified)

## Getting Started

1. **Clone the Repository**
   ```
   git clone <repository-url>
   cd fastify-server
   ```

2. **Set Up Environment Variables**
   Create a `.env` file in the root directory with:
   ```
   DB_URI=your_mongodb_connection_string
   CLIENT_URL=your_client_url
   ```

3. **Install Dependencies**  
   ```
   npm install
   ```

4. **Run the Server**  
   ```
   # Development mode with auto-restart
   npm run dev
   
   # Production mode
   npm start
   ```

5. **Access the API**  
   The server will be available at `http://localhost:5050`
   
   Example request:
   ```
   GET http://localhost:5050/search/podcast?term=technology&limit=5&country=US
   ```

## Areas for Improvement

- Implement service layer to separate business logic from route handlers
- Implement unit and integration tests
- Add podcast episode search capability
- Create a simple analytics dashboard

## License

