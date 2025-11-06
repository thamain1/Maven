# Maven Park - Smart Parking Mobile App

A professional, modern parking management application built for The Maven Global brand. Maven Park provides a seamless experience for finding, reserving, and managing parking sessions.

## Design Philosophy

Maven Park follows Maven Global's corporate, clean, and innovative visual identity:

- **Color Palette**: Professional black (#1a1a1a) with gold accents (#d4af37)
- **Typography**: Clean, modern sans-serif with clear hierarchy
- **Visual Style**: Minimalist, data-driven, and sophisticated
- **User Experience**: Intuitive navigation with attention to detail

## Core Features

### 1. Onboarding Flow (4 Steps)
- **Welcome Screen**: Brand introduction with Maven Park value proposition
- **Payment Setup**: Secure card information collection
- **Vehicle Registration**: Quick vehicle plate and state input
- **Notifications**: Permission request for session updates

### 2. Home Dashboard (Map-First Design)
- Interactive map placeholder showing nearby parking locations
- Real-time availability indicators
- Search functionality for location discovery
- List view with detailed parking information:
  - Distance from current location
  - Hourly rates
  - Available spaces
  - Star ratings and reviews

### 3. Location Detail Pages
- Comprehensive parking facility information
- Hero image with favorite toggle
- Availability status badge
- Key statistics: spaces, rates, hours
- Amenities grid (WiFi, EV Charging, Security, Accessibility, Covered)
- Detailed description and hours of operation
- Quick actions: Get Directions, Park Here

### 4. Active Sessions Management
- Real-time session tracking
- Session details:
  - Location information
  - Start time and duration
  - Current cost calculation
  - Vehicle identification
- Session controls: Extend Time, End Session
- Historical session records

### 5. Favorites System
- Save frequently used parking locations
- Quick access to saved spots
- Easy favorites management

### 6. Profile & Settings
- User profile management
- Payment methods (multiple cards)
- Vehicle management
- Notification preferences
- Privacy & security settings
- Support options: Help Center, Live Chat
- App version information

## Screen Flow

```
Welcome/Onboarding
    ↓
Home (Map + List)
    ↓
Location Detail
    ↓
Active Session
    ↓
Session History
```

## Navigation Structure

### Bottom Tab Navigation (4 Tabs)
1. **Home** (MapPin icon) - Main dashboard with map and locations
2. **Favorites** (Heart icon) - Saved parking locations
3. **Sessions** (Car icon) - Active and historical parking sessions
4. **Profile** (User icon) - Account settings and support

### Stack Navigation
- Location Detail screens (modal presentation)
- Onboarding flow (single-time experience)

## Technical Implementation

### Framework & Technologies
- **Expo SDK 54** - Cross-platform mobile development
- **Expo Router** - File-based navigation
- **React Native** - Native mobile components
- **TypeScript** - Type-safe development
- **Lucide Icons** - Consistent iconography
- **Supabase** - Backend database (schema created)

### Database Schema
- `parking_locations` - Location details and amenities
- `user_profiles` - User account information
- `user_vehicles` - Registered vehicles
- `parking_sessions` - Active and completed sessions
- `favorite_locations` - Saved parking spots

### Design System
Centralized theme system (`constants/theme.ts`) with:
- Color palette (primary, accent, text, backgrounds)
- Spacing scale (8px base unit)
- Typography scale (6 sizes)
- Border radius system
- Shadow elevations (sm, md, lg)

### Component Architecture
- **Reusable Components**: Button, Card
- **Screen Components**: Tab screens, Stack screens
- **Mock Data**: Realistic parking location data

## Key UX Patterns

1. **Progressive Disclosure**: Information revealed contextually
2. **Consistent Interactions**: Familiar touch targets and gestures
3. **Visual Hierarchy**: Clear content prioritization
4. **Feedback**: Status indicators and confirmation states
5. **Accessibility**: Proper contrast ratios and touch targets

## Sample Data

The app includes 5 realistic parking locations in Houston, TX:
- Downtown Business Center
- Riverside Plaza
- Tech District Parking
- Medical Center Garage
- Museum District Lot

Each location includes:
- Pricing information
- Availability status
- Amenities
- Operating hours
- Reviews and ratings

## Future Enhancements

1. Real-time map integration (Google Maps/Apple Maps)
2. Live availability updates via WebSocket
3. Payment processing (Stripe integration)
4. Push notifications for session reminders
5. QR code parking validation
6. Multi-language support
7. Parking history analytics
8. Loyalty rewards program

## Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Type checking
npm run typecheck

# Build for web
npm run build:web
```

## Platform Notes

This app is optimized for **web preview** in the Expo development environment. Native features like haptic feedback and local authentication are disabled or have web-compatible fallbacks.

## Brand Consistency

Maven Park maintains Maven Global's professional identity through:
- Sleek black and gold color scheme
- Corporate typography
- Data-driven visualizations
- Technical precision
- Modern, innovative feel
- Clean, sophisticated presentation

---

Built with attention to detail for The Maven Global brand.
