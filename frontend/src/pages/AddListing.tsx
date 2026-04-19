import React, { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES, LISTING_TYPES, AMENITIES } from '../data/constants';
import { PET_TYPES } from '../data/constantsJsx';
import { DataService } from '../data/dataService';
import { Listing, ListingType, PetType } from '../types/types';
import '../styles/AddListing.css';

const initialFormState = {
  name: '',
  description: '',
  price: 0,
  address: '',
  location: '',
  type: '',
  allowedPets: [] as string[],
  amenities: [] as string[],
  photos: [] as string[],
  contactInfo: {
    phone: '',
    email: '',
    website: ''
  }
};

type FormErrors = {
  [key: string]: string;
};

const AddListing: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [createdListing, setCreatedListing] = useState<Listing | null>(null);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    if (!formData.type) {
      newErrors.type = 'Please select a venue type';
    }
    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }
    if (formData.allowedPets.length === 0) {
      newErrors.allowedPets = 'Please select at least one pet type';
    }

    if (formData.contactInfo.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contactInfo.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (formData.contactInfo.website && !/^https?:\/\/.+/.test(formData.contactInfo.website)) {
      newErrors.website = 'Please enter a valid URL (starting with http:// or https://)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...(prev as any)[parent],
          [child]: value
        }
      }));
    } else if (name === 'price') {
      setFormData(prev => ({
        ...prev,
        [name]: parseFloat(value) || 0
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }

    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleCheckboxChange = (field: 'allowedPets' | 'amenities', value: string) => {
    setFormData(prev => {
      const currentValues = prev[field];
      const newValues = currentValues.includes(value)
        ? currentValues.filter(v => v !== value)
        : [...currentValues, value];
      
      return {
        ...prev,
        [field]: newValues
      };
    });

    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      const listingData = {
        name: formData.name,
        description: formData.description,
        price: formData.price,
        address: formData.address || formData.location,
        location: formData.location,
        type: formData.type,
        allowedPets: formData.allowedPets,
        amenities: formData.amenities,
        photos: formData.photos,
        contactInfo: formData.contactInfo
      };

      const newListing = await DataService.createListing(listingData);
      setCreatedListing(newListing);
      setSubmitSuccess(true);
    } catch (error) {
      console.error('Failed to create listing:', error);
      setErrors({ submit: 'Failed to create listing. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData(initialFormState);
    setErrors({});
    setSubmitSuccess(false);
    setCreatedListing(null);
  };

  const handleViewListing = () => {
    if (createdListing) {
      navigate(`/listing/${createdListing.id}`);
    }
  };

  if (submitSuccess) {
    return (
      <div className="add-listing-page">
        <div className="success-message">
          <h2>🎉 Listing Created Successfully!</h2>
          <p>Your pet-friendly venue <strong>"{createdListing?.name}"</strong> has been added to our directory.</p>
          <p>Thank you for helping other pet owners discover great places!</p>
          <div className="form-actions" style={{ justifyContent: 'center', marginTop: 'var(--space-6)' }}>
            {createdListing && (
              <button type="button" onClick={handleViewListing} className="btn btn-black">
                View Your Listing
              </button>
            )}
            <Link to={ROUTES.LISTINGS} className="btn btn-outline">
              View All Listings
            </Link>
            <button type="button" onClick={resetForm} className="btn btn-outline">
              Add Another Listing
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="add-listing-page">
      <div className="page-header">
        <h1>Add a Pet-Friendly Venue</h1>
        <p>Share a great place where pets are welcome. Help other pet owners discover amazing spots!</p>
      </div>

      <form className="add-listing-form" onSubmit={handleSubmit}>
        <div className="form-section">
          <h2>Basic Information</h2>
          <p>Tell us about your pet-friendly venue.</p>

          <div className="form-group">
            <label htmlFor="name">Venue Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={errors.name ? 'error' : ''}
              placeholder="e.g., Pawsome Park"
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className={errors.description ? 'error' : ''}
              placeholder="Describe what makes this place great for pets..."
              rows={4}
            />
            {errors.description && <span className="error-message">{errors.description}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="type">Venue Type *</label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              className={errors.type ? 'error' : ''}
            >
              <option value="">Select a venue type</option>
              {LISTING_TYPES.map((type: ListingType) => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </select>
            {errors.type && <span className="error-message">{errors.type}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="price">Price (optional)</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              placeholder="0 for free venues"
              min="0"
              step="0.01"
            />
            <small style={{ color: 'var(--neutral-600)', fontSize: 'var(--font-size-sm)' }}>
              Leave as 0 for free venues like parks
            </small>
          </div>
        </div>

        <div className="form-section">
          <h2>Location</h2>
          <p>Where can pet owners find this place?</p>

          <div className="form-group">
            <label htmlFor="address">Street Address (optional)</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="e.g., 123 Main Street"
            />
          </div>

          <div className="form-group">
            <label htmlFor="location">Location / City *</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              className={errors.location ? 'error' : ''}
              placeholder="e.g., New York, NY"
            />
            {errors.location && <span className="error-message">{errors.location}</span>}
          </div>
        </div>

        <div className="form-section">
          <h2>Pet Types *</h2>
          <p>Which types of pets are welcome here?</p>
          {errors.allowedPets && <span className="error-message">{errors.allowedPets}</span>}

          <div className="checkbox-group">
            {PET_TYPES.map((pet: PetType) => (
              <div key={pet.id} className="checkbox-item">
                <input
                  type="checkbox"
                  id={`pet-${pet.id}`}
                  checked={formData.allowedPets.includes(pet.id)}
                  onChange={() => handleCheckboxChange('allowedPets', pet.id)}
                />
                <label htmlFor={`pet-${pet.id}`}>
                  <span className="checkbox-icon">{pet.icon}</span>
                  {pet.name}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="form-section">
          <h2>Amenities</h2>
          <p>What special features does this venue offer for pets?</p>

          <div className="checkbox-group amenities-group">
            {AMENITIES.map((amenity: string) => (
              <div key={amenity} className="checkbox-item">
                <input
                  type="checkbox"
                  id={`amenity-${amenity}`}
                  checked={formData.amenities.includes(amenity)}
                  onChange={() => handleCheckboxChange('amenities', amenity)}
                />
                <label htmlFor={`amenity-${amenity}`}>
                  {amenity}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="form-section">
          <h2>Contact Information</h2>
          <p>How can people reach this venue?</p>

          <div className="form-group">
            <label htmlFor="contactInfo.phone">Phone</label>
            <input
              type="tel"
              id="contactInfo.phone"
              name="contactInfo.phone"
              value={formData.contactInfo.phone}
              onChange={handleInputChange}
              placeholder="e.g., 555-123-4567"
            />
          </div>

          <div className="form-group">
            <label htmlFor="contactInfo.email">Email</label>
            <input
              type="email"
              id="contactInfo.email"
              name="contactInfo.email"
              value={formData.contactInfo.email}
              onChange={handleInputChange}
              className={errors.email ? 'error' : ''}
              placeholder="e.g., info@example.com"
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="contactInfo.website">Website</label>
            <input
              type="url"
              id="contactInfo.website"
              name="contactInfo.website"
              value={formData.contactInfo.website}
              onChange={handleInputChange}
              className={errors.website ? 'error' : ''}
              placeholder="e.g., https://example.com"
            />
            {errors.website && <span className="error-message">{errors.website}</span>}
          </div>
        </div>

        {errors.submit && (
          <div className="error-message" style={{ marginBottom: 'var(--space-4)', textAlign: 'center' }}>
            {errors.submit}
          </div>
        )}

        <div className="form-actions">
          <Link to={ROUTES.LISTINGS} className="btn btn-outline">
            Cancel
          </Link>
          <button type="submit" disabled={isSubmitting} className="btn btn-black">
            {isSubmitting ? 'Creating...' : 'Create Listing'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddListing;
