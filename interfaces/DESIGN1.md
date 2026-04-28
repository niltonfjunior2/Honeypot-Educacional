---
name: Canarinho Digital
colors:
  surface: '#fcf9f8'
  surface-dim: '#dcd9d9'
  surface-bright: '#fcf9f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3f2'
  surface-container: '#f0edec'
  surface-container-high: '#ebe7e7'
  surface-container-highest: '#e5e2e1'
  on-surface: '#1c1b1b'
  on-surface-variant: '#4c4732'
  inverse-surface: '#313030'
  inverse-on-surface: '#f3f0ef'
  outline: '#7d775f'
  outline-variant: '#cec6ab'
  surface-tint: '#6d5e00'
  primary: '#6d5e00'
  on-primary: '#ffffff'
  primary-container: '#ffdf00'
  on-primary-container: '#716200'
  inverse-primary: '#e3c600'
  secondary: '#006e27'
  on-secondary: '#ffffff'
  secondary-container: '#7ff98d'
  on-secondary-container: '#007329'
  tertiary: '#405aa9'
  on-tertiary: '#ffffff'
  tertiary-container: '#d7deff'
  on-tertiary-container: '#445ead'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffe243'
  primary-fixed-dim: '#e3c600'
  on-primary-fixed: '#211b00'
  on-primary-fixed-variant: '#524700'
  secondary-fixed: '#81fc90'
  secondary-fixed-dim: '#65df76'
  on-secondary-fixed: '#002107'
  on-secondary-fixed-variant: '#00531c'
  tertiary-fixed: '#dbe1ff'
  tertiary-fixed-dim: '#b5c4ff'
  on-tertiary-fixed: '#00174d'
  on-tertiary-fixed-variant: '#25428f'
  background: '#fcf9f8'
  on-background: '#1c1b1b'
  surface-variant: '#e5e2e1'
typography:
  display-xl:
    fontFamily: Lexend
    fontSize: 72px
    fontWeight: '900'
    lineHeight: '1.0'
    letterSpacing: -0.04em
  headline-lg:
    fontFamily: Lexend
    fontSize: 48px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Lexend
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
  body-lg:
    fontFamily: Lexend
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Lexend
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  label-bold:
    fontFamily: Space Grotesk
    fontSize: 14px
    fontWeight: '700'
    lineHeight: '1.0'
    letterSpacing: 0.1em
  cta-label:
    fontFamily: Lexend
    fontSize: 20px
    fontWeight: '800'
    lineHeight: '1.0'
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 48px
  xl: 80px
  container-max: 1200px
  gutter: 20px
---

## Brand & Style

This design system is built to capture the electric atmosphere of Brazilian football culture. It targets a passionate, active audience, evoking a sense of national pride, victory, and high-stakes excitement. The brand personality is unapologetically loud, festive, and "Ginga"—a fluid, rhythmic energy that balances professional athletics with a carnival spirit.

The visual style is a fusion of **High-Contrast Bold** and **Modern Athleticism**. It utilizes aggressive typography, slanted geometries to imply motion, and a layering system that mimics high-end sportswear apparel. The interface should feel like a premium digital arena, motivating users to participate through sheer visual momentum and celebratory aesthetics.

## Colors

The palette is anchored in the iconic *Auriverde* colors, optimized for digital vibrance. 

- **Brazilian Yellow (#FFDF00)**: The primary driver of energy. Used for hero backgrounds, primary CTAs, and highlights. It represents the "warmth" and "celebration" requested.
- **Green (#009739)**: Used for secondary actions, success states, and as a structural contrast to the yellow. It provides the "athletic" grounding.
- **Bright Blue (#002776)**: A deep, prestigious blue used for primary text, heavy branding elements, and decorative "jersey-stitch" accents.
- **Neutral/Black (#121212)**: Provides high-contrast legibility against the yellow and green, ensuring the design feels "modern" rather than just "festive."

## Typography

Typography is the engine of this design system's "athletic" feel. **Lexend** is chosen for its readability and inherent sporty geometry. 

- **Display & Headlines**: Use the heaviest weights (800-900) with tight tracking and line height. For hero sections, use *Italics* to convey speed and forward motion.
- **Body**: Keep it clean and rhythmic. 
- **Labels**: **Space Grotesk** is used for technical data (e.g., "JERSEY SIZE," "ENTRY NUMBER") to provide a slightly futuristic, tech-forward contrast to the bold Lexend headings.

## Layout & Spacing

This design system employs a **Fluid Grid** model with a 12-column structure for desktop and a 4-column structure for mobile. 

- **Rhythm**: Use an 8px baseline grid to ensure a tight, disciplined athletic look.
- **Dynamic Angles**: Break the grid with diagonal section dividers (slanted at 3-degree angles) to mimic the movement found in sport jersey patterns.
- **Margins**: Heavy horizontal padding (48px+) on desktop ensures content feels focused and "premium," like a trophy display case.

## Elevation & Depth

Depth is handled through **Bold Tonal Layering** rather than traditional soft shadows. 

- **Hard Shadows**: Instead of diffused ambient light, use "Hard Multipliers." A primary button might have a 4px solid Blue offset to create a 3D "sticker" or "patch" effect similar to jersey crests.
- **Vignettes**: Large hero sections should use subtle radial gradients (Yellow to Gold) to create a "spotlight" effect on the jersey.
- **Micro-textures**: Use extremely subtle "mesh" or "pique" background patterns to simulate the tactile feel of jersey fabric, increasing the perceived value of the giveaway items.

## Shapes

The shape language is "Aggressive-Soft." While we use a **Soft (0.25rem)** base for inputs to keep them modern, primary buttons and cards should use **Sharp (0)** or **Chiseled** corners on one side to evoke a sense of precision and performance.

- **The "Badge" Container**: Use a custom shape for featured items that mimics a shield or a team crest, emphasizing the "Official" nature of the giveaway.
- **Input Fields**: Keep these strictly rectangular with minimal rounding to maintain a serious, high-performance aesthetic.

## Components

- **Primary CTA (The "Goal" Button)**: Heavy Brazilian Yellow background, Navy Blue text, bold italics, with a hard 4px Green bottom-right offset. On hover, the button should "compress" (translate 2px down/right).
- **Jersey Preview Card**: Use a background of "Field Green" with a faint geometric stadium pattern. The jersey image should "overflow" the card boundaries to create a sense of scale.
- **Status Chips**: Use "Stadium Lights" style. Small, uppercase labels with a glowing border-bottom to indicate active entries or limited time remaining.
- **Progress Steppers**: Styled like a match timeline. Use dots that transition from Blue to Yellow as the user completes steps in the giveaway entry.
- **Countdown Timer**: High-impact, monospaced numbers. This is the heart of the "motivation" strategy; it should be large and pulse slightly in Green.
- **Input Fields**: Thick 2px Navy Blue borders. When focused, the border shifts to Green with a subtle Yellow "glow" (outer stroke).