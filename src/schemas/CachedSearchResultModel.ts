import mongoose, { Schema, Document } from 'mongoose';


export interface IPodcast {
  wrapperType: string;
  kind: string;
  artistId?: number;
  collectionId: number;
  trackId: number;
  artistName: string;
  collectionName: string;
  trackName: string;
  collectionCensoredName: string;
  trackCensoredName: string;
  artistViewUrl?: string;
  collectionViewUrl: string;
  feedUrl?: string;
  trackViewUrl: string;
  artworkUrl30: string;
  artworkUrl60: string;
  artworkUrl100: string;
  collectionPrice: number;
  trackPrice: number;
  collectionHdPrice: number;
  releaseDate: string; // ISO string
  collectionExplicitness: string;
  trackExplicitness: string;
  trackCount: number;
  trackTimeMillis?: number;
  country: string;
  currency: string;
  primaryGenreName: string;
  contentAdvisoryRating?: string;
  artworkUrl600: string;
  genreIds: string[];
  genres: string[];
}

export interface IEpisodeGenre {
  name: string;
  id: string;
}
export interface IEpisode {
  wrapperType: string;
  kind: string;
  trackId: number;
  trackName: string;
  episodeGuid?: string;
  collectionId: number;
  collectionName: string;
  collectionViewUrl?: string;
  artistIds?: number[];
  artistViewUrl?: string;
  description?: string;
  shortDescription?: string;
  episodeContentType?: string;
  episodeFileExtension?: string;
  previewUrl?: string;
  episodeUrl?: string;
  trackTimeMillis?: number;
  contentAdvisoryRating?: string;
  closedCaptioning?: string;
  releaseDate?: string;
  country?: string;
  artworkUrl60?: string;
  artworkUrl160?: string;
  artworkUrl600?: string;
  trackViewUrl?: string;
  feedUrl?: string;
  genres?: IEpisodeGenre[];
  [key: string]: unknown;
}



export interface ICachedSearchResult extends Document {
  searchTerm: string;
  resultCount: number;
  filters?: Record<string, any>;
  results: Array<IPodcast | IEpisode>;
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
