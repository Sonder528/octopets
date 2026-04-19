import { appConfig } from '../config/appConfig';
import { Listing, Review, ContactInfo } from '../types/types';
import listingsData from './listingsData';

console.log('Environment Setup:', {
    REACT_APP_USE_MOCK_DATA: process.env.REACT_APP_USE_MOCK_DATA,
    REACT_APP_USE_MOCK_DATA_PARSED: process.env.REACT_APP_USE_MOCK_DATA?.toLowerCase() === 'true',
    appConfigMockData: appConfig.useMockData,
    apiUrl: appConfig.apiUrl
});

type ApiListing = {
    id: number | string;
    name: string;
    description: string;
    price: number;
    address: string | null;
    location: string;
    type: string | null;
    allowedPets: string[];
    amenities: string[];
    photos: string[];
    rating: number;
    phone: string | null;
    email: string | null;
    website: string | null;
    createdAt: string;
    updatedAt: string | null;
    reviews: ApiReview[];
};

type ApiReview = {
    id: number | string;
    listingId: number | string;
    reviewer: string;
    rating: number;
    comment: string;
    createdAt: string;
};

const mapApiListingToFrontend = (apiListing: ApiListing): Listing => {
    return {
        id: String(apiListing.id),
        name: apiListing.name,
        description: apiListing.description,
        price: Number(apiListing.price) || 0,
        address: apiListing.address || apiListing.location,
        location: apiListing.location,
        type: apiListing.type || '',
        allowedPets: apiListing.allowedPets || [],
        amenities: apiListing.amenities || [],
        photos: apiListing.photos || [],
        rating: Number(apiListing.rating) || 0,
        createdAt: apiListing.createdAt,
        updatedAt: apiListing.updatedAt,
        contactInfo: {
            phone: apiListing.phone || '',
            email: apiListing.email || '',
            website: apiListing.website || ''
        },
        reviews: (apiListing.reviews || []).map(mapApiReviewToFrontend)
    };
};

const mapApiReviewToFrontend = (apiReview: ApiReview): Review => {
    return {
        id: String(apiReview.id),
        listingId: String(apiReview.listingId),
        reviewer: apiReview.reviewer,
        rating: Number(apiReview.rating) || 0,
        comment: apiReview.comment,
        createdAt: apiReview.createdAt
    };
};

const mapFrontendListingToApi = (listing: Partial<Listing>): Partial<ApiListing> => {
    const result: Partial<ApiListing> = {};
    
    if (listing.name !== undefined) result.name = listing.name;
    if (listing.description !== undefined) result.description = listing.description;
    if (listing.price !== undefined) result.price = listing.price;
    if (listing.address !== undefined) result.address = listing.address;
    if (listing.location !== undefined) result.location = listing.location;
    if (listing.type !== undefined) result.type = listing.type;
    if (listing.allowedPets !== undefined) result.allowedPets = listing.allowedPets;
    if (listing.amenities !== undefined) result.amenities = listing.amenities;
    if (listing.photos !== undefined) result.photos = listing.photos;
    
    if (listing.contactInfo) {
        result.phone = listing.contactInfo.phone || null;
        result.email = listing.contactInfo.email || null;
        result.website = listing.contactInfo.website || null;
    }
    
    return result;
};

const mockListings: Listing[] = listingsData;

export class DataService {
    static async getListings(): Promise<Listing[]> {
        console.log('DataService: Fetching listings, using mock data:', appConfig.useMockData);
        
        if (appConfig.useMockData) {
            console.log('DataService: Returning mock listings:', mockListings.length, 'items');
            return mockListings;
        }
        
        try {
            const response = await fetch(`${appConfig.apiUrl}/listings`);
            if (!response.ok) {
                console.error('DataService: Failed to fetch listings, status:', response.status);
                throw new Error('Failed to fetch listings');
            }
            const data: ApiListing[] = await response.json();
            console.log('DataService: Fetched listings from API:', data.length, 'items');
            return data.map(mapApiListingToFrontend);
        } catch (error) {
            console.error('DataService: Error fetching listings:', error);
            throw error;
        }
    }

    static async getListing(id: string): Promise<Listing> {
        console.log('DataService: Fetching listing', id, 'using mock data:', appConfig.useMockData);
        
        if (appConfig.useMockData) {
            const listing = mockListings.find(l => l.id === id);
            if (!listing) {
                console.error('DataService: Mock listing not found:', id);
                throw new Error('Listing not found');
            }
            console.log('DataService: Returning mock listing:', listing.name);
            return listing;
        }

        try {
            const response = await fetch(`${appConfig.apiUrl}/listings/${id}`);
            if (!response.ok) {
                console.error('DataService: Failed to fetch listing, status:', response.status);
                throw new Error('Failed to fetch listing');
            }
            const data: ApiListing = await response.json();
            console.log('DataService: Fetched listing from API:', data.name);
            return mapApiListingToFrontend(data);
        } catch (error) {
            console.error('DataService: Error fetching listing:', error);
            throw error;
        }
    }

    static async getReviews(listingId: string): Promise<Review[]> {
        console.log('DataService: Fetching reviews for listing', listingId, 'using mock data:', appConfig.useMockData);
        
        if (appConfig.useMockData) {
            const listing = mockListings.find(l => l.id === listingId);
            const reviews = listing?.reviews || [];
            console.log('DataService: Returning mock reviews:', reviews.length, 'items');
            return reviews;
        }

        try {
            const response = await fetch(`${appConfig.apiUrl}/listings/${listingId}/reviews`);
            if (!response.ok) {
                console.error('DataService: Failed to fetch reviews, status:', response.status);
                throw new Error('Failed to fetch reviews');
            }
            const data: ApiReview[] = await response.json();
            console.log('DataService: Fetched reviews from API:', data.length, 'items');
            return data.map(mapApiReviewToFrontend);
        } catch (error) {
            console.error('DataService: Error fetching reviews:', error);
            throw error;
        }
    }

    static async createListing(listing: Omit<Listing, 'id' | 'reviews' | 'rating' | 'createdAt' | 'updatedAt'>): Promise<Listing> {
        console.log('DataService: Creating listing using mock data:', appConfig.useMockData);
        
        if (appConfig.useMockData) {
            const newListing: Listing = {
                ...listing,
                id: Math.random().toString(36).substr(2, 9),
                reviews: [],
                rating: 0,
                createdAt: new Date().toISOString(),
                updatedAt: null
            };
            mockListings.push(newListing);
            console.log('DataService: Created mock listing:', newListing.name);
            return newListing;
        }

        try {
            const apiListing = mapFrontendListingToApi(listing);
            const response = await fetch(`${appConfig.apiUrl}/listings`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(apiListing)
            });

            if (!response.ok) {
                console.error('DataService: Failed to create listing, status:', response.status);
                throw new Error('Failed to create listing');
            }
            const data: ApiListing = await response.json();
            console.log('DataService: Created listing via API:', data.name);
            return mapApiListingToFrontend(data);
        } catch (error) {
            console.error('DataService: Error creating listing:', error);
            throw error;
        }
    }

    static async createReview(listingId: string, review: Omit<Review, 'id' | 'createdAt' | 'listingId'>): Promise<Review> {
        console.log('DataService: Creating review for listing', listingId, 'using mock data:', appConfig.useMockData);
        
        if (appConfig.useMockData) {
            const listing = mockListings.find(l => l.id === listingId);
            if (!listing) {
                console.error('DataService: Mock listing not found for review:', listingId);
                throw new Error('Listing not found');
            }

            const newReview: Review = {
                ...review,
                id: Math.random().toString(36).substr(2, 9),
                listingId: listingId,
                createdAt: new Date().toISOString()
            };
            
            listing.reviews.push(newReview);
            
            listing.rating = listing.reviews.reduce((sum: number, r: Review) => sum + r.rating, 0) / listing.reviews.length;
            
            console.log('DataService: Created mock review for listing:', listing.name);
            return newReview;
        }

        try {
            const apiReview = {
                ...review,
                listingId: parseInt(listingId) || listingId
            };
            
            const response = await fetch(`${appConfig.apiUrl}/reviews/by-listing/${listingId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(apiReview)
            });

            if (!response.ok) {
                console.error('DataService: Failed to create review, status:', response.status);
                throw new Error('Failed to create review');
            }
            const data: ApiReview = await response.json();
            console.log('DataService: Created review via API');
            return mapApiReviewToFrontend(data);
        } catch (error) {
            console.error('DataService: Error fetching reviews:', error);
            throw error;
        }
    }
}
