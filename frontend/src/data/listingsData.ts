import { Listing } from '../types/types';

const listingsData: Listing[] = [
  {
    id: "1",
    name: "Pawsome Park",
    type: "park",
    price: 0,
    address: "123 Park Avenue, New York, NY",
    location: "123 Park Avenue, New York, NY",
    description: "A spacious park with dedicated areas for dogs to run off-leash. Beautiful walking paths and rest areas for owners.",
    allowedPets: ["dogs", "cats"],
    amenities: ["Water fountains", "Waste stations", "Benches", "Shade areas"],
    photos: ["park1.jpg", "park2.jpg"],
    rating: 4.7,
    createdAt: "2025-04-15T00:00:00",
    updatedAt: null,
    reviews: [
      {
        id: "101",
        listingId: "1",
        reviewer: "Alex Johnson",
        rating: 5,
        comment: "My golden retriever loves this park! Plenty of space to run around.",
        createdAt: "2025-04-15T00:00:00"
      },
      {
        id: "102",
        listingId: "1",
        reviewer: "Taylor Smith",
        rating: 4,
        comment: "Clean and well-maintained. Would be perfect with more shade in summer.",
        createdAt: "2025-04-10T00:00:00"
      }
    ],
    contactInfo: {
      phone: "555-123-4567",
      email: "info@pawsomepark.com",
      website: "https://pawsomepark.com"
    }
  },
  {
    id: "2",
    name: "Whiskers Cafe",
    type: "cafe",
    price: 0,
    address: "456 Main Street, Seattle, WA",
    location: "456 Main Street, Seattle, WA",
    description: "A cozy cafe with a special menu for pets. Indoor and outdoor seating available with pet-friendly accommodations.",
    allowedPets: ["dogs", "cats", "small_mammals"],
    amenities: ["Pet menu", "Water bowls", "Pet beds", "Outdoor patio"],
    photos: ["cafe1.jpg", "cafe2.jpg"],
    rating: 4.5,
    createdAt: "2025-04-18T00:00:00",
    updatedAt: null,
    reviews: [
      {
        id: "201",
        listingId: "2",
        reviewer: "Jamie Lee",
        rating: 5,
        comment: "They have treats for my dog and great coffee for me!",
        createdAt: "2025-04-18T00:00:00"
      },
      {
        id: "202",
        listingId: "2",
        reviewer: "Casey Morgan",
        rating: 4,
        comment: "My cat enjoyed lounging on their special pet beds. Very accommodating staff.",
        createdAt: "2025-04-05T00:00:00"
      }
    ],
    contactInfo: {
      phone: "555-987-6543",
      email: "hello@whiskerscafe.com",
      website: "https://whiskerscafe.com"
    }
  },
  {
    id: "3",
    name: "Pet Haven Home",
    type: "home",
    price: 150,
    address: "789 Oak Road, San Francisco, CA",
    location: "789 Oak Road, San Francisco, CA",
    description: "A beautiful vacation home with a fenced yard, pet doors, and all necessities for your furry friends.",
    allowedPets: ["dogs", "cats", "birds", "small_mammals"],
    amenities: ["Fenced yard", "Pet doors", "Pet beds", "Feeding stations", "Pet toys"],
    photos: ["home1.jpg", "home2.jpg"],
    rating: 4.9,
    createdAt: "2025-03-28T00:00:00",
    updatedAt: null,
    reviews: [
      {
        id: "301",
        listingId: "3",
        reviewer: "Jordan Riley",
        rating: 5,
        comment: "Best pet-friendly accommodation we've found! Our dogs loved the yard.",
        createdAt: "2025-03-28T00:00:00"
      },
      {
        id: "302",
        listingId: "3",
        reviewer: "Riley Chen",
        rating: 5,
        comment: "Even our parakeet was comfortable here. Thoughtful touches for all types of pets.",
        createdAt: "2025-03-15T00:00:00"
      }
    ],
    contactInfo: {
      phone: "555-234-5678",
      email: "stay@pethavenhome.com",
      website: "https://pethavenhome.com"
    }
  },
  {
    id: "4",
    name: "Pets & Pillows Hotel",
    type: "hotel",
    price: 200,
    address: "101 Sunset Blvd, Los Angeles, CA",
    location: "101 Sunset Blvd, Los Angeles, CA",
    description: "Luxury hotel that welcomes pets of all sizes. Special pet services available including walking and grooming.",
    allowedPets: ["dogs", "cats", "birds"],
    amenities: ["Pet spa", "Walking service", "Pet menu", "Pet sitting", "Pet beds"],
    photos: ["hotel1.jpg", "hotel2.jpg"],
    rating: 4.8,
    createdAt: "2025-04-02T00:00:00",
    updatedAt: null,
    reviews: [
      {
        id: "401",
        listingId: "4",
        reviewer: "Sam Wilson",
        rating: 5,
        comment: "They treated my dog like royalty! Room service even for pets.",
        createdAt: "2025-04-02T00:00:00"
      },
      {
        id: "402",
        listingId: "4",
        reviewer: "Jesse Taylor",
        rating: 4.5,
        comment: "Great amenities for pets, though a bit pricey.",
        createdAt: "2025-03-20T00:00:00"
      }
    ],
    contactInfo: {
      phone: "555-876-5432",
      email: "reservations@petsandpillows.com",
      website: "https://petsandpillows.com"
    }
  },
  {
    id: "5",
    name: "Furry Friends Store",
    type: "custom",
    price: 0,
    address: "246 Cherry Lane, Chicago, IL",
    location: "246 Cherry Lane, Chicago, IL",
    description: "A pet store with a play area where pets are welcome to try toys and meet other animals.",
    allowedPets: ["dogs", "cats", "small_mammals", "birds", "other"],
    amenities: ["Play area", "Treats bar", "Water stations", "Pet events"],
    photos: ["store1.jpg", "store2.jpg"],
    rating: 4.6,
    createdAt: "2025-04-12T00:00:00",
    updatedAt: null,
    reviews: [
      {
        id: "501",
        listingId: "5",
        reviewer: "Taylor Kim",
        rating: 5,
        comment: "My ferret loved the play area! Staff was very knowledgeable about exotic pets.",
        createdAt: "2025-04-12T00:00:00"
      },
      {
        id: "502",
        listingId: "5",
        reviewer: "Alex Rivera",
        rating: 4,
        comment: "Great selection of products for all types of pets.",
        createdAt: "2025-04-08T00:00:00"
      }
    ],
    contactInfo: {
      phone: "555-345-6789",
      email: "shop@furryfriendsstore.com",
      website: "https://furryfriendsstore.com"
    }
  },
  {
    id: "6",
    name: "Mooch's Meow",
    type: "cafe",
    price: 0,
    address: "789 Banana Street, Miami, FL",
    location: "789 Banana Street, Miami, FL",
    description: "A unique monkey-themed cafe where you can enjoy your coffee surrounded by banana decor and monkey-themed treats. Perfect for primate enthusiasts and their pets!",
    allowedPets: ["dogs", "cats", "small_mammals", "other"],
    amenities: ["Banana treats", "Monkey-themed play area", "Climbing structures", "Tropical atmosphere", "Pet-friendly seating"],
    photos: ["moochs1.jpg", "moochs2.jpg"],
    rating: 5.0,
    createdAt: "2025-04-28T00:00:00",
    updatedAt: null,
    reviews: [
      {
        id: "601",
        listingId: "6",
        reviewer: "Charlie Simmons",
        rating: 5,
        comment: "Such a fun atmosphere! My dog loved the banana-shaped treats and the staff was amazing.",
        createdAt: "2025-04-28T00:00:00"
      },
      {
        id: "602",
        listingId: "6",
        reviewer: "Morgan Patel",
        rating: 5,
        comment: "The monkey theme is adorable! Great place to bring your pets, they have special accommodations for all types of animals.",
        createdAt: "2025-04-22T00:00:00"
      },
      {
        id: "603",
        listingId: "6",
        reviewer: "Sam Washington",
        rating: 5,
        comment: "Best cafe experience ever! My cat actually enjoyed the climbing structures, and I loved the monkey-themed lattes!",
        createdAt: "2025-05-01T00:00:00"
      }
    ],
    contactInfo: {
      phone: "555-111-2222",
      email: "hello@moochsmeow.com",
      website: "https://moochsmeow.com"
    }
  }
];

export default listingsData;
