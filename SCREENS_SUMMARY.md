# Maven Park - Complete Screen Flow Summary

## Core Application Screens (8 Total)

### Onboarding Sequence (4 Screens)

#### 1. Welcome Screen
**Purpose**: Introduce Maven Park and its value proposition
**Key Elements**:
- Large circular MapPin icon (160px)
- "Welcome to Maven Park" title
- "Smart parking made simple" subtitle
- Value proposition description
- Progress indicator (4 dots)
- "Continue" CTA button

**User Actions**:
- Tap "Continue" to proceed

---

#### 2. Payment Setup
**Purpose**: Collect payment method for seamless transactions
**Key Elements**:
- CreditCard icon (96px circle)
- Form fields:
  - Card Number (full width)
  - Expiry Date (half width)
  - CVV (half width)
- Progress indicator (2/4)
- "Continue" CTA / "Skip" option

**User Actions**:
- Enter payment details
- Tap "Continue" or "Skip"

---

#### 3. Vehicle Registration
**Purpose**: Register user's vehicle for parking identification
**Key Elements**:
- Car icon (96px circle)
- Form fields:
  - License Plate (uppercase)
  - State selection
- Progress indicator (3/4)
- "Continue" CTA / "Skip" option

**User Actions**:
- Enter vehicle information
- Tap "Continue" or "Skip"

---

#### 4. Notifications Permission
**Purpose**: Request permission for session updates
**Key Elements**:
- Bell icon (96px circle)
- Permission explanation text
- Progress indicator (4/4)
- "Get Started" final CTA

**User Actions**:
- Tap "Get Started" to enter app

---

### Main Application (Tab Navigation)

#### 5. Home Screen (Tab 1)
**Purpose**: Discover nearby parking locations
**Navigation**: MapPin icon tab
**Key Elements**:
- Header with title and search bar
- Map placeholder (200px height)
- Location list with cards showing:
  - Location image/icon
  - Name and address
  - Star rating
  - Distance, hourly rate, available spaces
  - Each card tappable

**User Actions**:
- Search for locations
- Scroll location list
- Tap location card → Navigate to Location Detail

**Mock Data**: Shows 5 parking locations in Houston

---

#### 6. Location Detail Screen (Modal)
**Purpose**: Display comprehensive parking location information
**Key Elements**:
- Header image with location icon (240px)
- Back button (top-left)
- Favorite toggle (top-right)
- Availability badge ("Available Now")
- Location name, address, rating
- Stats grid: Available spaces, rate, hours
- Amenities (WiFi, EV Charging, Security, etc.)
- Description text
- Hours of operation
- Footer with action buttons

**User Actions**:
- Tap back to return to home
- Toggle favorite
- Tap "Get Directions" → External maps
- Tap "Park Here" → Start session

**Dynamic**: Pulls data based on location ID parameter

---

#### 7. Sessions Screen (Tab 3)
**Purpose**: Manage active and historical parking sessions
**Navigation**: Car icon tab
**Key Elements**:

**Active Session State**:
- Green status badge with pulsing dot
- Session card with:
  - Location icon and name
  - Start time and duration
  - Current cost (real-time)
  - Vehicle plate number
- Action buttons: "Extend Time" / "End Session"
- Recent session history cards

**Empty State**:
- Clock icon (48px)
- "No active sessions" message
- "Find Parking" CTA button

**User Actions**:
- Monitor session progress
- Extend parking time
- End session
- View session history

**Mock Data**: Shows 1 active session + 2 completed sessions

---

#### 8. Favorites Screen (Tab 2)
**Purpose**: Quick access to saved parking locations
**Navigation**: Heart icon tab
**Key Elements**:

**With Favorites**:
- List of saved location cards
- Each card shows:
  - Location icon
  - Name and address
  - Distance and rate
  - Filled heart icon (removable)

**Empty State**:
- Heart icon (48px)
- "No favorites yet" message
- Helpful description

**User Actions**:
- Tap location → Navigate to Location Detail
- Tap heart → Remove from favorites

**Mock Data**: Shows 2 favorite locations

---

#### 9. Profile Screen (Tab 4)
**Purpose**: Manage account, settings, and support
**Navigation**: User icon tab
**Key Elements**:

**Profile Card**:
- Circular avatar (80px)
- User name and email
- "Edit Profile" button

**Menu Sections**:

1. **Account**
   - Personal Information
   - Payment Methods (shows "2 cards")
   - Vehicles (shows "1 vehicle")

2. **Preferences**
   - Notifications
   - Privacy & Security

3. **Support**
   - Help Center
   - Contact Support

**Footer**:
- Sign Out button (red)
- Version number

**User Actions**:
- Edit profile information
- Manage payment methods
- Add/edit vehicles
- Configure settings
- Access support
- Sign out

---

## Screen Navigation Map

```
App Launch
    ↓
[Onboarding Flow - Single Pass]
    ↓
Welcome → Payment → Vehicle → Notifications
    ↓
[Main App - Tab Navigation]
    ↓
┌─────────┬──────────┬──────────┬─────────┐
│  Home   │Favorites │ Sessions │ Profile │
│ (Tab 1) │ (Tab 2)  │ (Tab 3)  │ (Tab 4) │
└─────────┴──────────┴──────────┴─────────┘
    ↓
Home → Location Detail (Modal)
              ↓
         Park Here
              ↓
         Active Session
```

## Screen Sizes & Layouts

### Fixed Elements
- **Header**: ~140px (Home), ~80px (other tabs)
- **Tab Bar**: 60px
- **Footer Actions**: 80px with padding

### Scrollable Content
- All main content areas scroll independently
- Location cards: ~120px each
- Session cards: Variable based on content
- Profile menu items: 60px each

## Key User Flows

### Flow 1: Find and Park
1. Home → View nearby locations
2. Tap location card
3. Review location details
4. Tap "Park Here"
5. Session starts → Sessions tab

### Flow 2: Manage Active Session
1. Sessions tab → View active session
2. Monitor time and cost
3. Extend or End session
4. Session moves to history

### Flow 3: Save Favorite
1. Home → Tap location
2. Tap heart icon (toggle favorite)
3. Location appears in Favorites tab
4. Quick access from Favorites tab

### Flow 4: First Time Setup
1. Welcome introduction
2. Add payment method
3. Register vehicle
4. Enable notifications
5. Access main app

---

## Design Highlights

### Professional Aesthetics
- Clean black & gold color scheme (Maven Global brand)
- Minimalist card-based layouts
- Generous white space
- Clear visual hierarchy

### Data-Driven Interface
- Real-time availability indicators
- Cost calculations
- Distance measurements
- Rating systems

### User-Centric Features
- Quick access favorites
- Active session monitoring
- Historical data tracking
- Comprehensive location information

### Technical Polish
- Smooth tab navigation
- Modal presentations for details
- Inline actions (extend, end, favorite)
- Empty state designs

---

This comprehensive 9-screen application (4 onboarding + 5 main) provides a complete parking management solution with professional design and intuitive user experience aligned with The Maven Global brand.
