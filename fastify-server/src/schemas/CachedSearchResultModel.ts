import mongoose, { Schema, Document } from 'mongoose';

export interface ICachedSearchResult extends Document {
  searchTerm: string;
  resultCount: number;
  filters?: Record<string, any>;
  results: any[];
  timestamp: string;
  expiryDate: string;
  numberOfHits: number;
  hashKey: string;
}

const CachedSearchResultSchema: Schema = new Schema({
  searchTerm: { type: String, required: true },
  resultCount: { type: Number, required: true },
  filters: { type: Schema.Types.Mixed },
  results: { type: Array, required: true },
  timestamp: { type: String, required: true },
  expiryDate: { type: String, required: true },
  numberOfHits: { type: Number, required: true, default: 0 },
  hashKey: { type: String, required: true, index: true },
});

export default mongoose.model<ICachedSearchResult>('CachedSearchResult', CachedSearchResultSchema);
