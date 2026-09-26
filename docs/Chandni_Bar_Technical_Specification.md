CHANDNI BAR

TECHNICAL SPECIFICATION & IMPLEMENTATION CONTEXT

Version 1.0  |  Working technical context

Purpose: preserve the technical decisions and implementation context for the Chandni Bar immersive website so development can continue without repeatedly re-reading the Business Requirements Document (BRD).

# 1. Project Definition

Chandni Bar is a single-page, full-screen cinematic web experience inspired by a fictional late-1990s Mumbai dance bar. The product is intentionally simple: the environment is the website. It should feel like entering a place rather than using a conventional website.

The experience is NOT a game, 3D exploration app, dashboard, multi-page corporate site, booking system, or backend application.

# 2. Technical Stack

| Layer | Technology / Approach | Decision |
| --- | --- | --- |
| Frontend | React | Required |
| Build tool | Vite | Required |
| Styling | CSS + responsive media queries | Required |
| Interaction | JavaScript / React state | Required |
| Animation | CSS transitions/animations; lightweight React animation where needed | Preferred |
| Music | YouTube embed/API OR properly licensed self-hosted audio | Choose during implementation |
| Hosting | Static frontend hosting such as Vercel | Recommended |
| Backend | None | Out of scope |
| Database | None | Out of scope |
| Authentication | None | Out of scope |

# 3. Architecture

Keep the application small and component-based. Suggested structure:

App — main page and overall experience state

Scene — background/environment and responsive positioning

Clock — local device time

Status — atmospheric indicator such as “6 INSIDE”

BrandTitle — restrained Chandni Bar title treatment

MusicPlayer — track metadata, controls and progress

EnterBar — primary action that starts the active experience

Suggested project structure:

chandni-bar/
├── src/
│   ├── components/
│   │   ├── Scene.jsx
│   │   ├── Clock.jsx
│   │   ├── Status.jsx
│   │   ├── BrandTitle.jsx
│   │   ├── MusicPlayer.jsx
│   │   └── EnterBar.jsx
│   ├── assets/
│   │   ├── exterior.*
│   │   ├── interior.*
│   │   └── corridor.*
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
├── public/
├── package.json
└── vite.config.js

# 4. Application State

React state is sufficient; no global state library is required.

| State | Purpose |
| --- | --- |
| isEntered | Whether the visitor has started the active experience |
| isPlaying | Whether music is currently playing |
| currentTrack | Current track metadata |
| progress | Current playback/progress position |
| time | Current local-device time for the atmospheric clock |

Primary flow:

Initial / Idle → ENTER BAR → Active → Play / Pause / Previous / Next → Track Change

# 5. Page States

| State | Expected behavior |
| --- | --- |
| Initial / Idle | Cinematic scene visible; ENTER BAR prominent; music not playing. |
| Active | Music playing; controls visible; experience fully active. |
| Paused | Scene remains visible; music paused; play control indicates paused state. |
| Track Change | New track metadata appears without leaving the scene. |
| Mobile Responsive | Same experience and states, with layout/crop adapted to viewport. |

# 6. Main Screen / UI

| Element | Technical behavior | Priority |
| --- | --- | --- |
| Background Scene | Full-screen cinematic image/composition; responsive positioning | Must |
| Time | Read device clock and update display | Must |
| Inside Indicator | Small atmospheric text; not analytics | Should |
| Chandni Bar Title | Overlay title treatment | Must |
| Music Information | Current track title + artist | Must |
| Music Controls | Previous, play/pause, next, simple progress | Must |
| ENTER BAR | Starts active experience after user interaction | Must |

# 7. Audio Implementation

Audio must not autoplay before a clear user interaction. ENTER BAR is the intended activation point. The implementation may use a YouTube embed/API or properly licensed self-hosted audio.

For a public deployment, verify that all music and ambient audio has appropriate usage rights/licensing.

# 8. Visual / Animation Implementation

Animation should reinforce atmosphere without making the site feel like a game. Prefer CSS animations and transitions for lightweight environmental movement.

| Visual | Implementation direction |
| --- | --- |
| Ceiling fans | Slow continuous rotation |
| Smoke / haze | Very subtle drifting movement |
| Lights | Small flicker/intensity variation |
| Curtains / fabric | Minimal secondary movement where practical |
| Background figures | Static or extremely subtle movement; no character control |
| UI | Fade/scale transitions that reinforce the cinematic feel |

# 9. Responsive Design — Highest Priority

Do not simply shrink the desktop composition. Each viewport range should be deliberately composed. Background positioning and UI placement may change by breakpoint.

| Viewport | Implementation goal |
| --- | --- |
| Large desktop | Full scene composition; preserve focal points and negative space for UI. |
| Desktop / laptop | Maintain scene balance; prevent UI from covering important visual details. |
| Tablet | Reposition/resize UI independently of the background. |
| Mobile portrait | Dedicated crop/reposition strategy; keep important subject visible and controls reachable. |
| Small mobile | Prioritize central experience, readable song info, and ENTER BAR; prevent overlap/clipping. |
| Landscape mobile | Treat as a separate responsive state when required. |

# 10. Responsive Acceptance Checklist

No horizontal scrolling.

No clipped text or controls.

No overlapping UI.

Main visual subject remains intentionally framed.

Music player remains readable and reachable.

ENTER BAR remains easy to find and tap.

Touch targets are comfortable to use.

Typography scales appropriately.

Background positioning is adjusted per breakpoint.

Layout remains visually balanced from small mobile to large desktop.

Test on real devices or accurate browser viewport emulation before release.

# 11. Assets

| Asset | Role |
| --- | --- |
| Exterior image | Primary landing/background scene |
| Interior image | Primary active environment |
| Back corridor image | Optional secondary visual state |
| Brand title | Overlay title treatment |
| Music metadata | Track title, artist and source identifier |
| Audio | Music + optional subtle ambience with appropriate rights |
| UI icons | Minimal, consistent player controls |

# 12. Out of Scope

Backend services

Database

User accounts / login

Admin dashboard

Real-time visitor tracking

Game mechanics, levels, points, missions or scores

Character movement or 3D navigation

Multi-page corporate website structure

Booking, e-commerce or payment functionality

# 13. Performance & Accessibility

Optimize large scene images for the web.

Keep animations lightweight and avoid unnecessary JavaScript animation.

Avoid heavy libraries unless a concrete requirement appears.

Maintain readable text contrast.

Make controls keyboard/touch accessible where applicable.

Support current major desktop and mobile browsers.

Ensure orientation/viewport changes do not break the composition.

# 14. Deployment

The intended deployment is a static frontend. A service such as Vercel can host the built React/Vite application. No server-side infrastructure is required for the initial scope.

# 15. Development Rules / Guardrails

Keep the architecture simple.

Do not introduce a backend unless the project requirements change.

Do not add a database unless a future requirement genuinely needs persistence.

Do not turn the site into a dashboard.

Do not turn the experience into a game or 3D navigation system.

Treat responsive composition as a core feature, not a final polish step.

Prefer CSS for atmospheric motion before adding animation libraries.

Keep UI minimal so the environment remains the visual focus.

# 16. Implementation Sequence

1. Set up React + Vite project.

2. Add the exterior/interior/corridor assets.

3. Build full-screen Scene and establish desktop composition.

4. Build BrandTitle, Clock, Status and ENTER BAR.

5. Implement React experience state.

6. Implement MusicPlayer and user-triggered audio.

7. Add subtle CSS environmental animations.

8. Create dedicated tablet/mobile/landscape compositions.

9. Optimize images and performance.

10. Test all required viewport states and final acceptance criteria.

# 17. Definition of Done

Opening the URL immediately presents the Chandni Bar visual environment.

The experience reads as one cinematic page.

ENTER BAR starts the active experience.

Music controls work without page navigation.

Track information updates when the track changes.

Visual treatment follows the exterior, interior and backstage references.

Desktop and mobile layouts are deliberately composed.

No supported viewport has horizontal scrolling, clipped controls, overlapping UI or unreadable text.

The main artwork remains visually meaningful at each breakpoint.

No unnecessary backend/application infrastructure has been added.

# 18. Source / Context Note

This technical specification is derived from the Chandni Bar Business Requirements Document (BRD), Version 1.0. Where this document says “recommended” or “implementation direction,” it represents a practical implementation choice for translating the BRD into code; it does not add a new product requirement.
