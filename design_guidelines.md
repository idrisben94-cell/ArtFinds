# Art Discovery Platform - Design Guidelines

## Design Approach

**Reference-Based Approach**: Drawing inspiration from premium art platforms (Behance, Pinterest, Saatchi Art) with enhanced visual storytelling and smooth micro-interactions. This experience-focused platform prioritizes emotional engagement, visual discovery, and elegant transitions.

**Design Principles**:
- Visual-first hierarchy with generous whitespace
- Fluid, organic animations that feel natural
- Sophisticated color palette that doesn't compete with artwork
- Immersive browsing experience with seamless transitions

---

## Core Design Elements

### A. Color Palette

**Dark Mode (Primary)**:
- Background: 12 8% 8% (deep charcoal)
- Surface: 12 8% 12% (elevated panels)
- Text Primary: 0 0% 98%
- Text Secondary: 0 0% 70%
- Accent: 280 60% 65% (sophisticated purple for interactions)
- Border: 0 0% 20%

**Light Mode**:
- Background: 30 15% 98% (warm white)
- Surface: 0 0% 100%
- Text Primary: 12 8% 12%
- Text Secondary: 0 0% 35%
- Accent: 280 60% 55%
- Border: 0 0% 88%

### B. Typography

**Font Families**:
- Display/Headers: 'Cormorant Garamond' (elegant serif for artistic feel)
- Body/UI: 'Inter' (clean, modern sans-serif)

**Scale**:
- Hero Display: text-7xl/8xl, font-light (Cormorant)
- Section Headers: text-4xl/5xl, font-light
- Card Titles: text-xl/2xl, font-medium
- Body: text-base, font-normal
- Captions: text-sm, text-secondary

### C. Layout System

**Spacing Primitives**: Use Tailwind units 2, 4, 6, 8, 12, 16, 24
- Component padding: p-6 to p-8
- Section spacing: py-16 to py-24
- Grid gaps: gap-6 to gap-8
- Container: max-w-7xl with px-6

### D. Component Library

**Hero Section**:
- Full-viewport height with parallax background artwork
- Large elegant typography with fade-in entrance
- Subtle gradient overlay (bottom to top) for text readability
- CTA button with glass-morphism effect (backdrop-blur)

**Art Cards**:
- Aspect ratio 3:4 for artwork images
- Hover: Subtle scale (1.02) + shadow increase + overlay with artist name/save icon
- Smooth transitions (300-400ms ease-out)
- Rounded corners (rounded-lg)

**Preference Quiz**:
- Full-screen card-based interface
- Smooth slide transitions between questions
- Visual selection cards with elegant hover states
- Progress indicator with gradient fill animation

**Gallery Grid**:
- Masonry layout for dynamic artwork sizes
- 3-4 columns desktop, 2 tablet, 1 mobile
- Lazy loading with fade-in animations
- Infinite scroll with smooth content injection

**Artwork Detail Modal**:
- Full-screen overlay with backdrop blur
- Large artwork display (70% viewport)
- Side panel with artist info, tags, and recommendations
- Smooth scale-up entrance animation

**Navigation**:
- Sticky header with glass-morphism background
- Minimal logo + search + profile icons
- Subtle shadow on scroll
- Smooth color transition on scroll

**Save/Favorite Interaction**:
- Heart icon with scale + fill animation
- Micro-bounce on click
- Toast notification slide-in from top

### E. Animations

**Page Transitions**:
- Fade + slight vertical slide (20px) on route changes
- Stagger animations for grid items (50ms delay between items)

**Scroll-Triggered**:
- Parallax on hero section (30% speed)
- Fade-in from bottom for sections (intersection observer)
- Sticky header background blur activation

**Micro-Interactions**:
- Button: Subtle scale (0.98) on press
- Cards: Transform + shadow on hover (duration-300)
- Form inputs: Smooth border color transition
- Save heart: Scale pulse animation

**Loading States**:
- Skeleton screens with shimmer effect
- Smooth opacity transitions when content loads

---

## Images

**Hero Section**:
- Large, high-resolution featured artwork (abstract or classical)
- Dimensions: 1920x1080 minimum
- Subtle blur or gradient overlay for text contrast
- Parallax scroll effect applied

**Art Gallery**:
- Mix of paintings, sculptures, digital art, photography
- High-quality images (minimum 800x1000)
- Diverse styles: impressionist, modern, abstract, realism
- Maintain consistent quality and professional framing

**Preference Quiz**:
- Visual style cards showing art movement examples
- Color palette examples with actual artwork
- Period-specific representative pieces

**Artist Profiles**:
- Professional artist headshots or studio photos
- Circular avatars (96x96px minimum)

**Background Patterns**:
- Subtle texture overlay on dark surfaces (5% opacity)
- Optional: Faint brushstroke pattern in empty states

---

## Special Considerations

**Performance**: Implement progressive image loading, use WebP format, blur-up technique for artwork thumbnails

**Accessibility**: Maintain 4.5:1 contrast ratios, provide alt text for all artwork describing style/subject, keyboard navigation for gallery and quiz

**Responsive Behavior**: Gallery transitions from 4 columns → 2 → 1, hero text scales proportionally, touch-friendly tap targets (minimum 44px)