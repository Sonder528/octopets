// Define types for our application data
import { ReactNode } from 'react';

export type PetType = {
  id: string;
  name: string;
  icon: ReactNode;
  description: string;
};

export type ListingType = {
  id: string;
  name: string;
  icon: ReactNode;
  description: string;
};

export type Amenity = {
  id: string;
  name: string;
  icon: string;
};

export type Review = {
  id: string;
  listingId: string;
  reviewer: string;
  rating: number;
  comment: string;
  createdAt: string;
};

export type ContactInfo = {
  phone: string;
  email: string;
  website: string;
};

export type Listing = {
  id: string;
  name: string;
  description: string;
  price: number;
  address: string;
  location: string;
  type: string;
  allowedPets: string[];
  amenities: string[];
  photos: string[];
  rating: number;
  createdAt: string;
  updatedAt: string | null;
  reviews: Review[];
  contactInfo: ContactInfo;
};

export type AppRoute = {
  path: string;
  label: string;
};

export type FormState = {
  name: string;
  description: string;
  price: number;
  address: string;
  location: string;
  type: string;
  allowedPets: string[];
  amenities: string[];
  photos: string[];
  contactInfo: ContactInfo;
};
