export interface ParkingLocation {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  latitude: number;
  longitude: number;
  distance: string;
  rate: number;
  availableSpaces: number;
  totalSpaces: number;
  rating: number;
  reviews: number;
  imageUrl: string;
  hours: string;
  amenities: {
    wifi: boolean;
    evCharging: boolean;
    security: boolean;
    accessible: boolean;
    covered: boolean;
  };
}

export interface ParkingSession {
  id: string;
  locationId: string;
  locationName: string;
  address: string;
  startTime: string;
  endTime?: string;
  duration: string;
  currentCost: number;
  vehiclePlate: string;
  status: 'active' | 'completed';
}

export const mockLocations: ParkingLocation[] = [
  {
    id: '1',
    name: 'Downtown Business Center',
    address: '500 Main St',
    city: 'Houston',
    state: 'TX',
    latitude: 29.7604,
    longitude: -95.3698,
    distance: '0.3 miles',
    rate: 3.0,
    availableSpaces: 45,
    totalSpaces: 160,
    rating: 4.5,
    reviews: 342,
    imageUrl: 'https://images.pexels.com/photos/2187605/pexels-photo-2187605.jpeg',
    hours: 'Open 24/7',
    amenities: {
      wifi: true,
      evCharging: true,
      security: true,
      accessible: true,
      covered: false,
    },
  },
  {
    id: '2',
    name: 'Riverside Plaza',
    address: '888 Westheimer Rd',
    city: 'Houston',
    state: 'TX',
    latitude: 29.7365,
    longitude: -95.4271,
    distance: '0.8 miles',
    rate: 4.5,
    availableSpaces: 12,
    totalSpaces: 85,
    rating: 4.8,
    reviews: 567,
    imageUrl: 'https://images.pexels.com/photos/1004665/pexels-photo-1004665.jpeg',
    hours: '6:00 AM - 11:00 PM',
    amenities: {
      wifi: true,
      evCharging: true,
      security: true,
      accessible: true,
      covered: true,
    },
  },
  {
    id: '3',
    name: 'Tech District Parking',
    address: '1200 Smith St',
    city: 'Houston',
    state: 'TX',
    latitude: 29.7508,
    longitude: -95.3677,
    distance: '1.2 miles',
    rate: 2.5,
    availableSpaces: 89,
    totalSpaces: 200,
    rating: 4.3,
    reviews: 234,
    imageUrl: 'https://images.pexels.com/photos/3184357/pexels-photo-3184357.jpeg',
    hours: 'Open 24/7',
    amenities: {
      wifi: false,
      evCharging: false,
      security: true,
      accessible: true,
      covered: false,
    },
  },
  {
    id: '4',
    name: 'Medical Center Garage',
    address: '6565 Fannin St',
    city: 'Houston',
    state: 'TX',
    latitude: 29.7093,
    longitude: -95.3973,
    distance: '2.1 miles',
    rate: 5.0,
    availableSpaces: 23,
    totalSpaces: 120,
    rating: 4.6,
    reviews: 789,
    imageUrl: 'https://images.pexels.com/photos/164634/pexels-photo-164634.jpeg',
    hours: 'Open 24/7',
    amenities: {
      wifi: true,
      evCharging: true,
      security: true,
      accessible: true,
      covered: true,
    },
  },
  {
    id: '5',
    name: 'Museum District Lot',
    address: '1400 Binz St',
    city: 'Houston',
    state: 'TX',
    latitude: 29.7229,
    longitude: -95.3895,
    distance: '1.8 miles',
    rate: 3.5,
    availableSpaces: 67,
    totalSpaces: 100,
    rating: 4.2,
    reviews: 156,
    imageUrl: 'https://images.pexels.com/photos/1004665/pexels-photo-1004665.jpeg',
    hours: '8:00 AM - 10:00 PM',
    amenities: {
      wifi: false,
      evCharging: false,
      security: true,
      accessible: true,
      covered: false,
    },
  },
];

export const mockSessions: ParkingSession[] = [
  {
    id: 's1',
    locationId: '1',
    locationName: 'Downtown Business Center',
    address: '500 Main St, Houston, TX 77002',
    startTime: '2:30 PM',
    duration: '1h 24m',
    currentCost: 4.2,
    vehiclePlate: 'ABC-1234',
    status: 'active',
  },
];

export const mockSessionHistory: ParkingSession[] = [
  {
    id: 's2',
    locationId: '2',
    locationName: 'Riverside Plaza',
    address: '888 Westheimer Rd, Houston, TX 77006',
    startTime: '10:15 AM',
    endTime: '12:30 PM',
    duration: '2h 15m',
    currentCost: 10.12,
    vehiclePlate: 'ABC-1234',
    status: 'completed',
  },
  {
    id: 's3',
    locationId: '3',
    locationName: 'Tech District Parking',
    address: '1200 Smith St, Houston, TX 77002',
    startTime: '9:00 AM',
    endTime: '12:45 PM',
    duration: '3h 45m',
    currentCost: 9.38,
    vehiclePlate: 'ABC-1234',
    status: 'completed',
  },
];