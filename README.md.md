# Component Library

A collection of reusable React components with Tailwind CSS styling, extracted from various projects including the Mebuki note-taking application.

## Components

### Layout Components

- **Header** - Responsive navigation header
- **Footer** - Site footer with links
- **SectionWrapper** - Consistent section spacing

### UI Components

- **Button** - Flexible button with variants (primary, secondary, ghost, danger)
- **Card** - Content card container with multiple sub-components (CardImage, CardBody, CardFooter)
- **BadgeTag** - Status and category badges
- **Typography** - Consistent text styles
- **ScrollArea** - Scrollable container component
- **Separator** - Horizontal or vertical divider line
- **Logo** - Brand logo with multiple variants (default, icon, wordmark)
- **AnimatedLogo** - Animated brand logo with GSAP animations

## Usage

Import components:

```tsx
import Button from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { ScrollArea } from '@/components/ui/ScrollArea'
import { Separator } from '@/components/ui/Separator'
import { Logo } from '@/components/ui/Logo'
import { AnimatedLogo } from '@/components/ui/AnimatedLogo'
```

### Button Examples

```tsx
// Primary button
<Button variant="primary">Submit</Button>

// Secondary button
<Button variant="secondary">Cancel</Button>

// With icons
<Button iconLeft={<ArrowIcon />}>Next</Button>

// Loading state
<Button loading>Saving...</Button>
```

### Card Examples

```tsx
// Basic card
<Card variant="default">
  <CardBody>
    <h3>Card Title</h3>
    <p>Card content</p>
  </CardBody>
</Card>

// Card with image
<Card variant="elevated" href="/blog/post">
  <CardImage src="/image.jpg" alt="Post thumbnail" aspectRatio="16/9" />
  <CardBody>
    <h3>Post Title</h3>
    <p>Post description</p>
  </CardBody>
  <CardFooter divider>
    <span>2025-01-01</span>
  </CardFooter>
</Card>
```

### Logo Examples

```tsx
// Default variant
<Logo size={40} />

// Icon variant with background
<Logo size={40} variant="icon" />

// Wordmark variant
<Logo size={40} variant="wordmark" brandName="MyBrand" brandColor="#3B82F6" />

// Animated logo
<AnimatedLogo
  size={80}
  brandName="MyBrand"
  brandColor="#22C55E"
  autoPlay={true}
  onAnimationComplete={() => console.log('Animation complete')}
/>
```

### ScrollArea Example

```tsx
<ScrollArea className="h-96 w-full">
  <div className="p-4">
    Long scrollable content...
  </div>
</ScrollArea>
```

### Separator Example

```tsx
// Horizontal separator
<Separator orientation="horizontal" />

// Vertical separator
<Separator orientation="vertical" className="h-8" />
```

## Dependencies

The components use the following dependencies:

- **React** - Core library
- **Tailwind CSS** - Utility-first CSS framework
- **GSAP** - Animation library (for AnimatedLogo)

## Component Sources

Components have been extracted and adapted from:

- [Mebuki App](https://github.com/Sintuba/Mebuki_app) - Logo, AnimatedLogo, ScrollArea, Separator
