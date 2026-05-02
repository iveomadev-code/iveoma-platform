# Project Spec Sheet: Iveoma Development Network

## **1. Project Identity**
- **Brand Voice**: Institutional, Premium, Authoritative, Editorial.
- **Core Mission**: Sustainable development frameworks for rural transformation (Health, Education, Economic Empowerment).
- **Primary Domain**: [iveoma.dev](https://iveoma.dev) (Environment: Next.js App Router).

## **2. Design System (The "Visual Spine")**

### **Layout Principles**
- **1000px Content Lane**: All primary section content must align to a `1000px` centered horizontal lane (`margin: 0 auto`).
- **Anti-Box Philosophy**: Avoid generic card-based UI. Use open, asymmetric editorial layouts, high-end typography, and layered depth.
- **8px Baseline System**: All spacing derives from an 8px grid.
  - `--sp-section`: 96px (Standard section padding)
  - `--sp-eyebrow`: 12px (Label to heading)
  - `--sp-heading-body`: 24px (Heading to paragraph)

### **Typography**
- **Headings**: `Monumental` (variable font). Large, bold, Title Case (Avoid all-caps).
- **Body**: `Inter Tight`. High legibility, institutional feel.
- **Numbers**: `Shree Devanagari 714`. Used for impact metrics and counters.

### **Color Palette**
- **Primary Blue**: `#1B5C8E` (Deep Authority)
- **Sky Blue**: `#579DD5` (Logo Identity)
- **Terracotta**: `#B8543B` (Cultural Accent / Eyebrows)
- **Action Gold**: `#C9A96E` (Interactive / CTA buttons)
- **Midnight Navy**: `#0F2A44` (Hero background / High contrast)

## **3. Signature Components & Motifs**

### **A. Impact Spotlight**
- **Motif**: The "Breathing" Target Watermark.
- **Implementation**: `target.svg` with a continuous organic scale animation (Framer Motion) behind centered metrics.
- **Centering**: Perfect horizontal/vertical alignment within the 1000px lane.

### **B. Video Intervention**
- **Motif**: The "Split Bridge".
- **Implementation**: Container background split 50/50 vertically (e.g., Ice Grey to White) to bridge two different section backgrounds.
- **Aspect Ratio**: Cinematic 16:9 for YouTube embeds.

### **C. Diagonal Slices**
- **Motif**: 45-degree architectural windows.
- **Implementation**: `clip-path: polygon()` on containers. **CRITICAL**: The image inside must NOT be skewed; keep original aspect ratio and orientation.

### **D. Strategic Alliances**
- **Motif**: The "Trust Marquee".
- **Implementation**: Infinite horizontal scrolling logo marquee (Greyscale institutional logos).

## **4. Tech Stack & Dependencies**
- **Framework**: Next.js (App Router, Client Components for motion).
- **Motion**: `framer-motion` (spring-based entrances), `gsap` (for structural rails/ScrollTrigger).
- **Styling**: Vanilla CSS / Inline Styles (for precise alignment control) + Tailwind for utility basics.
- **Icons**: `Lucide-react`.

## **5. Critical Workflows**
- **Horizontal Centering**: Always wrap inner content in `<div style={{ maxWidth: '1000px', margin: '0 auto' }}>`.
- **Text Gradients**: Use `WebkitBackgroundClip: 'text'` with brand linear gradients (e.g., `#1B5C8E` to `#B8543B`) for premium headers.
- **No Placeholders**: Use `generate_image` or real assets (`public/` directory) for all visual evidence.

---
**Last Updated**: April 2026
**Status**: Phase 1 Foundation Complete.
