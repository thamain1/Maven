# Maven Park - Design Specifications

## Visual Identity

### Maven Global Brand Alignment
Maven Park's design is inspired by The Maven Global's corporate identity, emphasizing:
- **Innovation**: Cutting-edge parking technology
- **Professionalism**: Corporate-grade reliability
- **Data-Driven**: Real-time parking analytics
- **Urban Focus**: Smart city integration

### Color System

```
Primary Colors:
- Primary Black:     #1a1a1a  (Main UI elements, headers, buttons)
- Secondary Gray:    #2c2c2c  (Card backgrounds, icons)
- Accent Gold:       #d4af37  (Highlights, badges, CTAs)

Neutral Colors:
- White:             #ffffff  (Backgrounds, text on dark)
- Background Light:  #f9fafb  (Subtle backgrounds)
- Border Gray:       #e5e7eb  (Dividers, borders)

Text Colors:
- Primary Text:      #1a1a1a  (Headings, important text)
- Secondary Text:    #6b7280  (Body text, descriptions)
- Muted Text:        #9ca3af  (Labels, metadata)

Semantic Colors:
- Success Green:     #10b981  (Available status, positive actions)
- Warning Orange:    #f59e0b  (Low availability alerts)
- Error Red:         #ef4444  (Errors, destructive actions)
```

### Typography Scale

```
Display:   48px / Bold      (Hero titles)
XXXL:      32px / Bold      (Screen titles)
XXL:       24px / Bold      (Section headers)
XL:        20px / Semibold  (Card titles)
Large:     18px / Semibold  (Emphasized text)
Base:      16px / Regular   (Body text)
Small:     14px / Medium    (Labels, metadata)
XSmall:    12px / Medium    (Badges, tiny text)
```

### Spacing System (8px Grid)

```
XS:    4px   (Icon spacing, tight gaps)
SM:    8px   (Component padding)
MD:   16px   (Standard spacing)
LG:   24px   (Section spacing)
XL:   32px   (Large gaps)
XXL:  48px   (Major sections)
```

### Border Radius

```
Small:    4px   (Badges, tags)
Medium:   8px   (Input fields, small cards)
Large:   12px   (Cards, buttons)
XLarge:  16px   (Large cards, modals)
Full:  9999px   (Pills, circular elements)
```

### Elevation System

```
Small:
- Shadow: 0px 1px 2px rgba(0,0,0,0.05)
- Use: Subtle card lift, dropdowns

Medium:
- Shadow: 0px 2px 4px rgba(0,0,0,0.1)
- Use: Main cards, floating buttons

Large:
- Shadow: 0px 4px 8px rgba(0,0,0,0.15)
- Use: Modals, prominent CTAs, headers
```

## Screen-by-Screen Breakdown

### 1. Onboarding Flow (4 Screens)

**Step 1: Welcome**
- Large icon: 160px circle with MapPin
- Title: 32px bold white text
- Subtitle: 16px gold accent
- Description: 16px white with 80% opacity
- Progress: 4 dots (first active gold)

**Step 2: Payment Setup**
- Form inputs on dark background
- White input fields with labels
- Two-column layout for expiry/CVV
- Gold "Continue" button

**Step 3: Vehicle Registration**
- License plate input (uppercase)
- State selection
- Simple two-field form
- Consistent with payment layout

**Step 4: Notifications**
- Permission request
- Icon: 96px circle
- Final CTA: "Get Started"

### 2. Home Screen

**Header (Fixed)**
- Height: ~140px
- Title: "Maven Park" (32px bold white)
- Subtitle: Gold accent text
- Search bar: White rounded input with icon

**Map Section**
- Height: 200px
- Placeholder with MapPin icon
- Light gray background
- "Map View" centered text

**Location List**
- Card height: ~120px
- Left: 100px image/icon area (dark gray)
- Right: Location info
  - Name (16px semibold)
  - Address (14px gray)
  - Meta row: Distance, rate, spaces
  - Rating badge (top-right)

### 3. Location Detail

**Header Image**
- Height: 240px
- Back button (top-left, 40px circle)
- Favorite button (top-right, 40px circle)
- MapPin icon centered

**Info Section**
- Availability badge (green pill)
- Location name (24px bold)
- Address (16px gray)
- Rating row with reviews

**Stats Grid**
- Three equal columns
- Values: 20px bold
- Labels: 12px gray
- Dividers between columns

**Amenities Grid**
- 2-column layout
- Icon: 40px square with rounded corners
- Label beside icon

**Footer (Fixed)**
- Two buttons side-by-side
- "Directions": Outline style
- "Park Here": Solid gold

### 4. Active Session

**Status Badge**
- Green background
- White pulsing dot + text
- Rounded full corners

**Session Card**
- Location header with icon
- Divider line
- Three detail rows (time, duration, cost)
- Vehicle info at bottom

**Action Buttons**
- "Extend": Outline style
- "End Session": Solid primary

**History Cards**
- Minimal design
- Location name + date
- Duration • Cost

### 5. Favorites

**Empty State**
- Heart icon (48px)
- Title and description centered
- Generous padding

**Favorite Cards**
- 80px icon area
- Heart button (top-right, filled red)
- Compact layout vs home cards

### 6. Profile

**Profile Header Card**
- 80px circular avatar
- Name (20px bold)
- Email (14px gray)
- "Edit Profile" button

**Menu Sections**
- Section titles: 12px uppercase gray
- Menu items:
  - 40px icon square (light gray bg)
  - Label + optional value
  - ChevronRight indicator

**Logout Button**
- Red text and icon
- White background
- Full width

## Interaction Patterns

### Touch Targets
- Minimum: 44x44px
- Buttons: 48px height
- Cards: Full width with 16px side margins

### Animations (if implemented)
- Fade in: 300ms
- Slide transitions: 250ms
- Button press: Scale to 0.97
- Loading states: Spinner or skeleton

### States
- Default: Full opacity
- Active: 70% opacity (activeOpacity={0.7})
- Disabled: 50% opacity
- Loading: Spinner centered

## Icon System

Using Lucide React Native icons at standard sizes:
- Small: 14-16px (metadata)
- Medium: 20-24px (buttons, cards)
- Large: 32-48px (headers, empty states)

Key icons:
- MapPin: Locations, parking
- Heart: Favorites
- Car: Sessions, vehicles
- User: Profile, account
- Clock: Time, duration
- DollarSign: Pricing
- Star: Ratings
- Navigation: Directions, distance
- Search: Search functionality

## Responsive Behavior

While primarily web-optimized, the design uses:
- Fluid spacing (no fixed widths)
- Flexible grids
- Touch-first interactions
- Single-column layouts (mobile-first)

## Accessibility

- Color contrast ratios: WCAG AA compliant
- Touch targets: 44px minimum
- Text sizing: Readable at base 16px
- Icon + text labels for clarity

---

This design system ensures Maven Park maintains a cohesive, professional appearance aligned with The Maven Global brand identity while delivering an intuitive user experience.
