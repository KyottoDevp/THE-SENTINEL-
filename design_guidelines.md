# The Sentinel Bot - Design Guidelines

## Design Approach
**Reference-Based**: Draw inspiration from premium Discord bot listing sites (top.gg, Discord Bot List) and gaming product pages, adapted for Hollow Knight's dark fantasy aesthetic with the specified yellow/black color scheme.

## Core Design Principles
1. **Gaming Aesthetic**: Dark, mysterious atmosphere reflecting Hollow Knight's world
2. **Information Clarity**: Complex feature sets presented through organized cards and sections
3. **Professional Authority**: Establish trust for a public moderation bot
4. **Visual Drama**: High contrast yellow/black creates striking visual hierarchy

## Color Palette
- **Primary Yellow**: #FFC107 (vibrant gold for CTAs, highlights)
- **Secondary Yellow**: #FFD54F (softer accents, hover states)
- **Dark Yellow**: #F9A825 (borders, subtle emphasis)
- **Primary Black**: #0a0a0a (deep backgrounds)
- **Secondary Black**: #1a1a1a (card backgrounds, sections)
- **Charcoal**: #2d2d2d (borders, dividers)
- **Off-white**: #f5f5f5 (text on dark)

## Typography
- **Headings**: 'Rajdhana' or 'Orbitron' (700-800 weight) - angular, tech-inspired
- **Body**: 'Inter' or 'Roboto' (400-500 weight)
- **Accents**: 'Space Mono' for command syntax/code
- Scale: 3xl-5xl for heroes, xl-2xl for sections, base-lg for body

## Layout System
Tailwind spacing: **4, 6, 8, 12, 16, 24** as primary units
- Section padding: py-20 (desktop), py-12 (mobile)
- Container: max-w-7xl with px-4
- Card spacing: gap-6 in grids

## Component Library

### Hero Section
- Full viewport height (min-h-screen) with dark gradient background
- Large centered logo/mascot image of The Sentinel
- Bold headline (text-5xl): "The Sentinel - Guardian of Your Discord Kingdom"
- Subheadline explaining bot purpose
- Dual CTAs: "Add to Discord" (yellow bg) + "View Commands" (outlined)
- Floating command preview cards with subtle animations

### Feature Cards (Systems Section)
- 2-column grid (lg:grid-cols-2) transitioning to 3-column for some sections
- Each card: black background (#1a1a1a), yellow left border (border-l-4)
- Icon at top (yellow gradient), title, description
- Hover: subtle yellow glow (shadow-lg shadow-yellow-500/20)
- Systems to showcase: Moderation Suite, Economy System, Port Management, Suggestion System

### Commands Section
- Category tabs (yellow underline for active)
- Command cards in masonry-style grid
- Card structure: Command name (yellow), short description, "Learn More" expand
- Expandable details: usage syntax, permissions, examples
- Categories: Moderation & Security, Fun & Utility, Administration

### Port Management Showcase
- Dedicated section highlighting unique port hub feature
- Side-by-side comparison: Silksong Mobile vs Hollow Knight Mobile
- Platform badges: Android/iOS with icons
- Download statistics/version info cards

### Statistics Bar
- Horizontal strip with yellow background
- Server count, command count, uptime - in contrasting black text
- Icons from Heroicons

### Add Bot Section
- Centered large "Add The Sentinel" button with yellow-to-orange gradient
- Permission requirements list
- Setup quickstart (3-step visual guide)

### Footer
- Three columns: About, Quick Links, Contact Developer
- Dark background with yellow divider line at top
- Social icons (Discord server, support links)
- Terms of Use link

## Images
1. **Hero**: Large illustrated image of The Sentinel character (robot/guardian aesthetic) - centered, 600x600px minimum
2. **Feature Icons**: Custom SVG icons for each system (shield for moderation, coin for economy, etc.)
3. **Command Category Icons**: Visual symbols for each command group
4. **Background Pattern**: Subtle Hollow Knight-inspired geometric patterns in very dark gray

## Animations
- Hero: Subtle float animation on bot mascot
- Cards: Gentle scale on hover (scale-105)
- Buttons: Yellow glow pulse on primary CTA
- Scroll: Fade-in sections as they enter viewport

## Accessibility
- Yellow text: Use #FFC107 only on dark backgrounds for WCAG AA
- Ensure 4.5:1 contrast ratio for all text
- Keyboard navigation with visible yellow focus rings
- ARIA labels on all interactive elements

## Navigation
- Fixed top nav with dark background, yellow logo
- Transparent-to-solid on scroll
- Links: Home, Features, Commands, Add Bot, Support
- Mobile: Hamburger menu with slide-in panel