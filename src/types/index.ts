export type Language = 'ar' | 'en';
export type Theme = 'light' | 'dark';

export type TripType = 'hajj' | 'umrah';
export type TripStatus = 'published' | 'draft';
export type BookingStatus = 'pending' | 'approved' | 'rejected';
export type RoomType = 'single' | 'double' | 'triple' | 'quad';

export interface ItineraryItem {
  day: number;
  titleAr: string;
  titleEn: string;
  descAr: string;
  descEn: string;
}

export interface FAQItem {
  qAr: string;
  qEn: string;
  aAr: string;
  aEn: string;
}

export interface Trip {
  id: string;
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  type: TripType;
  price: number;
  currency: string;
  startDate: string;
  endDate: string;
  durationDays: number;
  hotelNameAr: string;
  hotelNameEn: string;
  hotelStars: number;
  airlineAr: string;
  airlineEn: string;
  availableSeats: number;
  totalSeats: number;
  servicesAr: string[];
  servicesEn: string[];
  coverImage: string;
  galleryImages: string[];
  status: TripStatus;
  isFeatured?: boolean;
  itinerary?: ItineraryItem[];
  faqs?: FAQItem[];
}

export interface Booking {
  id: string;
  tripId: string;
  tripNameAr: string;
  tripNameEn: string;
  fullName: string;
  phone: string;
  email: string;
  nationality: string;
  travelersCount: number;
  roomType: RoomType;
  status: BookingStatus;
  createdAt: string;
  notes?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  roleAr: string;
  roleEn: string;
  avatar: string;
  rating: number;
  commentAr: string;
  commentEn: string;
}

export interface CompanyInfo {
  nameAr: string;
  nameEn: string;
  sloganAr: string;
  sloganEn: string;
  phoneKsa: string;
  phoneEg: string;
  whatsappKsa: string;
  whatsappEg: string;
  email: string;
  addressAr: string;
  addressEn: string;
  workingHoursAr: string;
  workingHoursEn: string;
  socials: {
    facebook: string;
    twitter: string;
    instagram: string;
    whatsappKsa: string;
    whatsappEg: string;
  };
}
