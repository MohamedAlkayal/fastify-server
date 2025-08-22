// Cache schema for search results
// expiryDate: cache is invalidated if Date.now() >= expiryDate - 5000
// expiryDate starts at 24h and decreases exponentially on every hit
export interface CachedSearchResult {
	searchTerm: string;
	resultCount: number;
	filters?: Record<string, any>; // e.g., genre, country, etc.
	results: any[]; // iTunes API results
	timestamp: string; // ISO date string
	expiryDate: string; // ISO date string
	numberOfHits: number;
	hashKey: string;
}
