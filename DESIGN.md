# Design System Specification: The Executive Atelier

## 1. Overview & Creative North Star

**Creative North Star: The Informed Curator**
This design system rejects the cluttered, line-heavy aesthetic of traditional enterprise software. Instead, it adopts the persona of a "High-End Digital Curator"—an interface that feels less like a database and more like a bespoke editorial experience. By utilizing intentional white space, tonal depth, and high-contrast typography, we transform HR management from a chore into a focused, premium workflow.

We break the "template" look by avoiding rigid 1px borders. Instead, we use **Tonal Nesting** and **Intentional Asymmetry** (e.g., off-center headers or overlapping card elements) to guide the eye. This creates a sense of "Organic Precision," where the UI feels living and responsive rather than static and boxed-in.

---

## 2. Colors: Chromatic Depth & The "No-Line" Rule

The palette is anchored by a deep corporate blue (`primary`: #00288e) and its lighter, functional counterpart (`primary_container`: #1e40af).

### The "No-Line" Rule

**Explicit Instruction:** Designers are prohibited from using 1px solid borders to define sections or cards. Hierarchy must be established through background shifts.

- A card (`surface_container_lowest`) sits on a section (`surface_container_low`), which sits on the global background (`surface`).
- This "Tone-on-Tone" approach creates a sophisticated, seamless environment that reduces visual noise and cognitive load.

### Surface Hierarchy & Nesting

Treat the UI as a series of physical layers. Use the `surface-container` tiers to define "nesting":

- **Level 0 (Background):** `surface` (#f7f9fb)
- **Level 1 (Sidebars/Sections):** `surface_container_low` (#f2f4f6)
- **Level 2 (Primary Content Cards):** `surface_container_lowest` (#ffffff)
- **Level 3 (Interactive Overlays):** `surface_container_high` (#e6e8ea)

### The Glass & Gradient Rule

To prevent the corporate blue from feeling "flat," use **Signature Textures**:

- **Floating Navigation:** Apply `backdrop-blur` with a 70% opacity `surface` color to create a "frosted glass" effect.
- **Hero Actions:** Use a subtle linear gradient transitioning from `primary` (#00288e) to `primary_container` (#1e40af) at a 135-degree angle to provide a sense of "visual soul."

---

## 3. Typography: Editorial Authority

We use a dual-font strategy to balance character with utility.

- **Display & Headlines (Manrope):** Chosen for its modern, geometric construction. Use `display-lg` and `headline-md` for key metrics (e.g., "Total Headcount") to give the data an authoritative, editorial feel.
- **Utility & Body (Inter):** The workhorse for legibility. All data tables, labels, and paragraph text use Inter.
- **The Hierarchy Rule:** Use `label-sm` in all-caps with `0.05em` letter-spacing for category headers to create a "technical-chic" aesthetic that contrasts beautifully with the large, soft Manrope headlines.

---

## 4. Elevation & Depth: Tonal Layering

Traditional drop shadows are largely replaced by **Ambient Layering**.

- **The Layering Principle:** Depth is achieved by "stacking" surface tokens. Place a `surface_container_lowest` card on a `surface_container_low` background. The difference in hex value is enough to define the edge without a harsh line.
- **Ambient Shadows:** For floating elements (Modals/Popovers), use a shadow with a `40px` blur, `0%` spread, and `6%` opacity. The shadow color must be derived from `on_surface` (#191c1e) to ensure it feels like a natural shadow cast by ambient light.
- **The "Ghost Border" Fallback:** If accessibility requires a border, use `outline_variant` at **15% opacity**. It should be a suggestion of a line, not a boundary.

---

## 5. Components

### Action Buttons

- **Primary:** Gradient fill (`primary` to `primary_container`), `rounded-md` (0.375rem), white text. Use a subtle inner-glow (top border 1px white @ 10%) to create a "pressed" premium feel.
- **Tertiary:** No background. Use `primary` text. On hover, apply a `surface_container_high` background with 0% opacity transition to 100%.

### Data Tables (The "Atelier" Grid)

- **No Borders:** Forbid vertical or horizontal lines.
- **Row Separation:** Use `surface_container_low` for the header and alternating rows (`zebra striping`) using a `2px` vertical gap (Spacing 0.5) instead of a line.
- **Typography:** Column headers must be `label-md` in `on_surface_variant`. Data cells use `body-md`.

### Status Badges (Leave/Attendance)

- **Design:** Use the `rounded-full` (9999px) scale for a "pill" look.
- **Color Logic:**
- _Approved/Present:_ `secondary_container` background with `on_secondary_container` text.
- _Pending:_ `tertiary_fixed` background with `on_tertiary_fixed_variant` text.
- _Alert/Absent:_ `error_container` background with `on_error_container` text.

### Navigation Sidebar

- **Layout:** Use `surface_container_low`.
- **Active State:** Instead of a full-bar highlight, use a "Vertical Indicator"—a 3px wide line of `primary` color on the far left, paired with a subtle `surface_container_high` background on the menu item.

### Input Fields

- **Style:** Background fill `surface_container_lowest`. No border. A 1px bottom-only line using `outline_variant` at 40% opacity. On focus, the bottom line expands to 2px and takes the `primary` color.

---

## 6. Do's and Don'ts

### Do

- **Do** use large padding (Spacing 8 or 10) between major sections to allow the UI to "breathe."
- **Do** use `manrope` for any number larger than 24pt to emphasize data as a "hero" element.
- **Do** lean on the `surface_container` hierarchy to separate different functional areas of the dashboard.

### Don't

- **Don't** use 100% black (#000000) for text. Always use `on_surface` or `on_surface_variant` to maintain the premium, soft-contrast look.
- **Don't** use standard "drop shadows" on cards. Rely on background color shifts first.
- **Don't** use sharp corners. Every interactive element must use at least `rounded-sm` (0.125rem), with `rounded-md` (0.375rem) being the standard for cards and buttons.
