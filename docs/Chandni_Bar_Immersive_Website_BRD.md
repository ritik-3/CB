CHANDNI BAR

1990s MUMBAI  |  IMMERSIVE WEBSITE

A single-screen cinematic web experience inspired by a fictional late-1990s Mumbai dance bar.

| Document Type | Project | Experience Type | Version |
| --- | --- | --- | --- |
| BRD | Chandni Bar | Single-page website | 1.0 |

# 01. Executive Summary

Chandni Bar is a single-page immersive website that recreates the atmosphere of a fictional late-1990s Mumbai dance bar. The visitor should feel as if they have entered the place rather than opened a conventional website.

The website is intentionally simple. The primary experience is one full-screen cinematic environment supported by minimal interface elements, music, subtle ambient sound, and lightweight visual motion. It is a website, not a game and not a simulation.

The most important technical and design requirement is responsive presentation. The experience must remain visually strong, readable, usable, and properly composed across desktop PC, laptop, tablet, and mobile screen sizes. Responsive CSS and media queries are therefore a first-class requirement, not a finishing step.

# 02. Product Vision

Create a digital memory of a late-night 1990s Mumbai bar: dark, warm, cinematic, slightly worn, nostalgic, and alive with music. The website should communicate its story primarily through visual composition and atmosphere rather than through text or navigation.

## 02.1 Product Principles

One page, one environment, one continuous experience.

Visual atmosphere comes before interface complexity.

Minimal UI that feels integrated into the scene.

Subtle motion rather than game-like interaction.

Responsive composition is mandatory at every breakpoint.

No backend or database is required for the initial website.

# 03. Visual Direction

The provided visual references establish the intended look and should be treated as the primary visual direction for the website.

Visual Reference A - Exterior / Street View: Chandni Bar in a late-night Mumbai neighbourhood.

Visual Reference B - Main Interior: bar seating, performance area, warm lamps, mirrors, and red/amber lighting.

Visual Reference C - Back Corridor: dressing/makeup corridor and backstage atmosphere.

## 03.1 Visual Characteristics

| Area | Requirement |
| --- | --- |
| Setting | Fictional late-1990s Mumbai dance bar and surrounding neighbourhood. |
| Lighting | Warm tungsten, amber, red and occasional cooler contrast; low-light night setting. |
| Materials | Aged wood, mirrors, worn paint, fabric curtains, old fixtures, reflective wet surfaces where appropriate. |
| Mood | Noir, nostalgic, intimate, lived-in, cinematic. |
| Typography | Simple, elegant, period-aware; never visually dominant over the environment. |
| Motion | Very subtle environmental movement and UI transitions. |
| Overall feel | A digital place, not a modern club website and not a game HUD. |

# 04. Core User Experience

The experience should be understandable immediately without instructions.

| Step | User Experience |
| --- | --- |
| 1. Open | The website loads directly into the cinematic Chandni Bar environment. |
| 2. Observe | The visitor sees the environment and a very small amount of UI. |
| 3. Enter | The visitor selects ENTER BAR. |
| 4. Start | Music and permitted ambient audio begin after user interaction. |
| 5. Stay | The visitor remains on the same page and experiences the scene. |
| 6. Control | The visitor may use simple music controls without leaving the page. |

# 05. Main Screen Requirements

The website should primarily behave like a single full-screen composition. UI elements should overlay the environment without turning the page into a dashboard.

| Element | Requirement | Priority |
| --- | --- | --- |
| Background scene | Full-screen cinematic image/composition representing Chandni Bar. | Must |
| Time | Small local-device time display for atmosphere. | Must |
| Inside indicator | Small atmospheric status such as "6 INSIDE"; not a real analytics system. | Should |
| Chandni Bar title | Visible but restrained title treatment. | Must |
| Music information | Current song title and artist. | Must |
| Player controls | Previous, play/pause, next and simple progress. | Must |
| ENTER BAR | Primary action that starts the experience. | Must |

# 06. Music Requirements

Music is part of the atmosphere and should be presented through a custom, minimal player that visually belongs to the website.

The player must show current track title and artist.

The visitor must be able to play/pause and move to previous/next tracks.

Audio must begin only after a clear user interaction such as ENTER BAR.

The implementation may use a YouTube embed/API or properly licensed audio files.

Any music used in a live public website must be used with appropriate rights or licensing.

# 07. Environmental Motion

Motion should be restrained and atmospheric. The website must never feel like a game or a 3D exploration app.

| Visual | Possible Motion |
| --- | --- |
| Ceiling fans | Slow continuous rotation. |
| Smoke/haze | Very subtle drifting movement. |
| Lights | Small flicker or intensity variation. |
| Curtains/fabric | Minimal secondary movement where practical. |
| Background figures | Static or extremely subtle movement; no character control. |
| UI | Fade/scale transitions that reinforce the cinematic feel. |

# 08. Responsive Design - Highest Priority

Responsive design is the most important implementation requirement in the project. The desktop composition must not simply be shrunk down for mobile. The layout must be deliberately composed for each screen range.

## 08.1 Required Breakpoint Thinking

| Viewport | Design Requirement |
| --- | --- |
| Large desktop | Use the full scene composition; preserve major visual focal points and generous negative space for UI. |
| Standard desktop/laptop | Maintain scene balance and prevent UI from covering important visual details. |
| Tablet | Reposition and resize UI independently of the background; maintain readability and hierarchy. |
| Mobile portrait | Use a dedicated mobile composition strategy. Crop/reposition the scene so the important subject remains visible; controls must remain reachable. |
| Small mobile | Prioritize the central experience, readable song information, and ENTER BAR action; avoid overlap and clipping. |
| Landscape mobile | Treat as a separate responsive state where necessary; do not assume portrait rules are sufficient. |

## 08.2 Responsive Acceptance Criteria

No horizontal scrolling at any supported viewport.

No text clipping, overlapping controls, or off-screen buttons.

The main visual subject remains intentionally framed on both desktop and mobile.

The music player remains readable and reachable without covering critical artwork.

ENTER BAR remains easy to find and tap on touch devices.

Touch targets are large enough for comfortable mobile use.

Typography scales appropriately rather than relying on fixed desktop sizes.

Background positioning is adjusted per breakpoint so important artwork is not accidentally cropped.

The site remains visually balanced from small mobile screens through large desktop displays.

Responsive behavior is tested on real devices or accurate browser viewport emulation before release.

# 09. Functional Requirements

| ID | Requirement | Priority |
| --- | --- | --- |
| FR-01 | The site opens directly into the Chandni Bar experience. | Must |
| FR-02 | ENTER BAR starts the active experience after user interaction. | Must |
| FR-03 | Music controls operate without page navigation. | Must |
| FR-04 | Current track information updates when the track changes. | Must |
| FR-05 | Time display updates using the device clock. | Should |
| FR-06 | The experience remains on one page throughout normal use. | Must |
| FR-07 | Visual transitions do not interrupt the user experience. | Must |
| FR-08 | The site functions on touch devices and desktop pointer devices. | Must |

# 10. Technical Scope

The initial website should remain frontend-only and intentionally lightweight.

| Area | Technology / Approach |
| --- | --- |
| Frontend | React |
| Build tool | Vite |
| Styling | CSS with responsive media queries |
| Interaction | JavaScript / React state |
| Animation | CSS transitions/animations and lightweight React animation where needed |
| Music | YouTube embed/API or licensed self-hosted audio |
| Hosting | Static frontend hosting such as Vercel |

No backend, database, authentication system, admin panel, Redis, or other server-side infrastructure is part of this initial scope.

# 11. Content and Asset Requirements

| Asset | Requirement |
| --- | --- |
| Main exterior image | Primary landing/background scene based on the provided exterior reference. |
| Main interior image | Primary active interior environment based on the provided interior reference. |
| Back corridor image | Optional secondary scene / visual state based on the backstage reference. |
| Brand title | Chandni Bar title treatment suitable for overlay on the scene. |
| Music metadata | Track title, artist and source identifier. |
| Audio | Music and optional subtle ambience with appropriate usage rights. |
| UI icons | Minimal controls; simple and consistent visual language. |

# 12. Page States

| State | Description |
| --- | --- |
| Initial / idle | Cinematic scene visible; ENTER BAR prominent; music not yet playing. |
| Active | Music playing; controls visible; experience fully active. |
| Paused | Scene remains visible; music paused; play control indicates paused state. |
| Track change | New track metadata appears without leaving the scene. |
| Mobile responsive | Same experience and states, with layout and crop adapted to the viewport. |

# 13. Out of Scope

The following are intentionally excluded to protect the simplicity of the website:

Backend services

Database

User accounts or login

Admin dashboard

Real-time visitor tracking

Game mechanics, levels, points, missions or scores

Character movement or 3D navigation

Multi-page corporate website structure

Booking, e-commerce or payment functionality

# 14. Non-Functional Requirements

| Category | Requirement |
| --- | --- |
| Responsive | The website must remain visually correct and usable from mobile through large desktop resolutions. |
| Performance | Images should be web-optimized and interactions should remain smooth on ordinary consumer devices. |
| Usability | Primary action and music controls must be immediately understandable without instructions. |
| Accessibility | Text must maintain readable contrast and controls must be keyboard/touch accessible where applicable. |
| Browser support | Support current major desktop and mobile browsers. |
| Stability | The experience must not break when the viewport changes orientation or size. |

# 15. Acceptance Criteria

A user can open the URL and immediately see the intended Chandni Bar visual environment.

The website feels like a single cinematic experience, not a traditional multi-page site.

ENTER BAR successfully starts the active experience.

Music controls work without leaving the page.

The visual design closely follows the supplied exterior, interior and backstage references.

Desktop and mobile layouts are intentionally composed rather than simply scaled.

No supported viewport produces horizontal scrolling, clipped controls, overlapping UI, or unreadable text.

The main subject of the artwork remains visually meaningful at each breakpoint.

The website remains simple and contains no unnecessary backend or application infrastructure.

# 16. Suggested Component Structure

The implementation can remain small and easy to maintain:

| Component | Responsibility |
| --- | --- |
| App | Main page and overall state. |
| Scene | Background visual composition and responsive positioning. |
| Clock | Local time display. |
| Status | Small "inside" atmospheric indicator. |
| BrandTitle | Chandni Bar title treatment. |
| MusicPlayer | Track information, controls and progress. |
| EnterBar | Primary start interaction. |

# 17. Final Product Definition

The final product is a single immersive website experience for Chandni Bar. It should open like a cinematic scene, not a normal homepage. The visual references supplied for the exterior, main interior and backstage corridor define the atmosphere. The interface remains minimal, music provides the emotional layer, and responsive media-query behavior is the most important implementation concern.

Core rule: Keep it simple. The environment is the website.
