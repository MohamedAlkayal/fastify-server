import mongoose, { Schema, Document } from 'mongoose';

export interface ISearchAnalytics extends Document {
    searchTerm: string;
    requesterIp: string;
    country?: string;
    region?: string;
    city?: string;
    ll?: [number, number];
    timezone?: string;
    timestamp: string;
}

const SearchAnalyticsSchema: Schema = new Schema({
    searchTerm: { type: String, required: true },
    requesterIp: { type: String, required: true },
    country: String,
    region: String,
    city: String,
    ll: [Number],
    timezone: String,
    timestamp: { type: String, required: true },
});

export default mongoose.model<ISearchAnalytics>('SearchAnalytics', SearchAnalyticsSchema);
