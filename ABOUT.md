# 🥃 Chandni Bar — Project Documentation

> *"Fort · Lower Parel · After Midnight"*
> An immersive, single-screen cinematic web experience set in 1998 Mumbai.

---

## 📖 What Is This?

**Chandni Bar** is a React + Vite web application that recreates the atmosphere of a late-night bar in 1990s Mumbai. It is not a traditional multi-page website — it is a **single cinematic scene** that the user "enters", triggering a full-screen transition from the exterior of the bar to the warm, smoky interior, accompanied by ambient music streamed from a YouTube playlist.

The project draws inspiration from the 2001 Bollywood film *Chandni Bar* and the mood of old Mumbai's dimly lit bar culture — sepia tones, ceiling fans, amber light, haze, and the sound of late-night music drifting through the air.

---

## 🎯 Core Concept

| Concept | Description |
|---|---|
| **Theme** | Late-night bar, Fort / Lower Parel, Mumbai — circa 1998 |
| **Interaction Model** | Single click/tap — "enter the bar" |
| **Experience Type** | Immersive / atmospheric / cinematic |
| **Audio** | YouTube playlist streamed via hidden IFrame API |
| **Visual Style** | Dark warm tones, grain, vignette, smoke, amber light |

---

## 🏗️ Project Structure

```
chandni-bar/
│
├── public/
│   ├── assets/
│   │   ├── reference-1.png        # Exterior scene image
│   │   ├── reference-2.png        # Interior scene image
│   │   ├── reference-3.png        # Additional reference
│   │   └── Enter Bar Sign.png     # Vintage brass entrance plaque
│   └── audio/
│       └── traffic-in-city.mp3    # Scene 1 Mumbai city street ambiance
│
├── src/
│   ├── main.jsx                   # React entry point
│   ├── styles.css                 # All styles (~760 lines, vanilla CSS)
│   ├── App.jsx                    # Root component — state, YouTube API, controls
│   └── components/
│       ├── Scene.jsx              # Visual scene: images, lights, smoke, fans, curtains
│       ├── Clock.jsx              # Live local clock styled as "Mumbai · 1998"
│       ├── MusicPlayer.jsx        # Full music player UI
│       └── Status.jsx             # Atmospheric status pill
│
├── index.html                     # HTML shell
├── vite.config.js                 # Vite configuration
├── vercel.json                    # Vercel deployment config
├── package.json                   # Dependencies & scripts
├── .env                           # Local env vars (gitignored)
└── .env.example                   # Env template
```

---

## 🎬 User Experience Flow

```
Page Load
    │
    ▼
┌─────────────────────────────────────┐
│   Exterior View (reference-1.png)   │
│   + Plaque: "अंदर आइए · ENTER BAR"  │
│   + Clock: "7:30 pm · Mumbai · 1998"│
│   + Status: "DOOR OPEN"             │
└─────────────────────────────────────┘
    │
    │  User clicks / taps anywhere
    ▼
┌─────────────────────────────────────┐
│   Interior View (reference-2.png)   │
│   + Music starts (random track)     │
│   + Fans animate                    │
│   + Smoke / haze appears            │
│   + Amber lights pulse              │
│   + Status: "N INSIDE"              │
│   + Music Player slides in          │
└─────────────────────────────────────┘
```

---

## ⚙️ Technology Stack

| Layer | Technology | Notes |
|---|---|---|
| Framework | React 18 | Hooks-based, no class components |
| Build Tool | Vite 5 | Fast HMR, ES module output |
| Styling | Vanilla CSS | Zero CSS frameworks |
| Audio | YouTube IFrame API | Hidden 1×1 pixel player |
| Fonts | Google Fonts | Cormorant Garamond + DM Mono |
| Deployment | Vercel | Static build, SPA routing |
| Runtime Deps | `react`, `react-dom` | Only 2 dependencies |

---

## 🧩 Component Reference

### `App.jsx`
The root orchestrator. Manages:
- `isEntered` — whether the user has clicked to enter the bar
- `isPlaying`, `progress`, `currentTime`, `duration` — playback state
- `currentTrack` — parsed `{ title, artist }` from YouTube video data
- `volume`, `isMuted` — volume controls
- YouTube IFrame API lifecycle (load → create player → events → controls)
- Passes all state and handlers down to child components

**Key functions:**

| Function | Purpose |
|---|---|
| `enterBar()` | Sets entered state and starts random playlist track |
| `togglePlay()` | Plays or pauses the YouTube player |
| `next() / previous()` | Skips tracks via YT API |
| `seek(value)` | Seeks to a position (0–1 fraction of duration) |
| `handleVolumeChange(vol)` | Updates volume on slider change |
| `handleToggleMute()` | Toggles mute state |
| `parseVideoTitle(raw, channel)` | Parses "Artist - Song" style titles |
| `cleanTopic(str)` | Strips YouTube Music "— Topic" channel suffixes |
| `playRandomInitialTrack()` | Starts at a random position in the playlist |

---

### `Scene.jsx`
Pure visual component — no state, no logic. Receives `active` prop.

**Elements rendered:**

| Element | Class | Effect |
|---|---|---|
| Exterior image | `.scene__image--exterior` | Fades out on enter |
| Interior image | `.scene__image--interior` | Fades in on enter |
| Red light blob | `.scene__light--one` | Pulsing ambient glow |
| Amber light blob | `.scene__light--two` | Secondary warm glow |
| Haze/smoke 1 | `.scene__smoke--one` | Drifting fog layer |
| Haze/smoke 2 | `.scene__smoke--two` | Offset drifting layer |
| Fan 1 | `.fan--one` | Ceiling fan spinning |
| Fan 2 | `.fan--two` | Second ceiling fan (smaller) |
| Left curtain | `.curtain--left` | Decorative side curtain |
| Right curtain | `.curtain--right` | Decorative side curtain |

All atmospheric elements activate via the `.scene--active` CSS class modifier.

---

### `MusicPlayer.jsx`
Full-featured music player UI. Slides in once the user enters.

**Features:**
- Glowing dot indicator (playing state)
- Track title + artist display (auto-parsed from YouTube)
- Seek slider with visual fill track
- Timestamp: `current / total`
- Previous, Play/Pause, Next transport buttons
- Volume slider with dynamic speaker icon (muted / low / high)
- Mute toggle button

**Props:**

| Prop | Type | Description |
|---|---|---|
| `visible` | boolean | Whether player is shown |
| `playing` | boolean | Current play state |
| `track` | `{ title, artist }` | Current track metadata |
| `progress` | number (0–1) | Playback progress fraction |
| `currentTime` | number | Seconds elapsed |
| `duration` | number | Total duration in seconds |
| `volume` | number (0–100) | Current volume level |
| `isMuted` | boolean | Mute state |
| `onPlayPause` | function | Play/pause handler |
| `onPrevious` | function | Previous track handler |
| `onNext` | function | Next track handler |
| `onSeek` | function | Seek position handler |
| `onVolumeChange` | function | Volume change handler |
| `onToggleMute` | function | Mute toggle handler |

---

### `Clock.jsx`
Live device clock, branded as **"Mumbai · 1998"**. Updates every second via `setInterval`.

Displays: `H:MM am/pm` in 12-hour format.

---

### `Status.jsx`
Atmospheric status indicator in the top bar.

| State | Display |
|---|---|
| Before entering | `● DOOR OPEN` |
| After entering | `● N INSIDE` (N = random 4–12, chosen once on mount) |

---

## 🎨 Design System

### Color Palette

| Token | Hex | Usage |
|---|---|---|
| `--cream` | `#f2e4cf` | Primary text |
| `--muted` | `#bfae94` | Secondary text, disabled states |
| `--wine` | `#7d1e27` | Red atmospheric light |
| `--amber` | `#e5a052` | Warm accent, fan hub, glow |
| Background | `#090706` | Near-black base |

### Typography

| Font | Weight | Usage |
|---|---|---|
| Cormorant Garamond | 400–700 | All display text, serif mood font |
| DM Mono | 400–500 | Clock, timestamps, status labels |

### CSS Animations

| Name | Effect | Used On |
|---|---|---|
| `pulse` | Opacity breathe | Atmospheric light blobs |
| `drift` | Slow lateral float | Smoke/haze layers |
| `spin` | Continuous rotation | Fan blades |
| `fanFloat` | Subtle vertical bob | Fan containers |
| Scene transition | Cross-fade + scale | Exterior to Interior images |

---

## 🎵 YouTube Integration

The app uses the **YouTube IFrame Player API** invisibly (1×1 pixel, opacity 0).

### Setup
1. A `<div id="yt-player">` is rendered in the DOM
2. The YouTube IFrame API script is dynamically injected
3. `onYouTubeIframeAPIReady` creates a `YT.Player` instance bound to that div
4. The playlist ID is loaded from `VITE_YT_PLAYLIST_ID` in `.env`

### Player Events Handled

| Event | Action |
|---|---|
| `onReady` | Set volume to 40, enable shuffle, mark player ready |
| `PLAYING` | Set isPlaying=true, start 500ms progress poll, fetch track metadata |
| `PAUSED / ENDED` | Set isPlaying=false, stop progress poll |
| `BUFFERING / CUED` | Update track metadata only |
| `onError` | Log warning, attempt `nextVideo()` |

### Progress Tracking
YouTube's IFrame API has no `timeupdate` event, so a `setInterval` polls `getCurrentTime()` and `getDuration()` every **500ms** while playing.

---

## 🌐 Environment Variables

| Variable | Required | Description |
|---|---|---|
| `VITE_YT_PLAYLIST_ID` | Yes | YouTube playlist ID or full playlist URL |

**Accepted formats:**
```
# Short ID
PLxxxxxxxxxxxxxxxxxxxxxx

# Full URL (auto-parsed)
https://www.youtube.com/playlist?list=PLxxxxxxxxxxxxxxxxxxxxxx
```

---

## 🚀 Deployment

### Local Development
```bash
npm install
npm run dev

# With network access (LAN preview):
npm run dev -- --host
```

### Production Build
```bash
npm run build
npm run preview
```

### Vercel
The project is pre-configured for Vercel via `vercel.json`:
- **Build**: `@vercel/static-build` with `dist/` output
- **Routing**: All paths serve `index.html` (SPA mode)
- **Caching**: Assets and audio are immutably cached for 1 year
- **Security headers**: `X-Content-Type-Options`, `X-Frame-Options: DENY`, `X-XSS-Protection`

---

## ♿ Accessibility

- Reduced motion: CSS `@media (prefers-reduced-motion)` disables all animations
- ARIA labels on all interactive elements (buttons, sliders)
- `aria-hidden="true"` on all purely decorative elements (scene, vignette, fans)
- `aria-label` and `aria-hidden` on the music player region
- Semantic HTML: `<main>`, `<header>`, `<aside>`, `<time>`, `<h2>`, `<p>`
- `dateTime` attribute on the Clock `<time>` element

---

## 📁 Asset Notes

| File | Description | Status |
|---|---|---|
| `public/assets/reference-1.png` | Exterior bar scene | BRD reference — replace for production |
| `public/assets/reference-2.png` | Interior bar scene | BRD reference — replace for production |
| `public/assets/reference-3.png` | Additional reference | Available for use |

> **Production Note:** All images in `public/assets/` are BRD reference images. Replace with production-approved assets before public launch.

---

## 🧠 Design Decisions & Notes

| Decision | Rationale |
|---|---|
| No routing | The entire experience is a single state transition, not a multi-page app |
| No CSS framework | Vanilla CSS keeps the bundle minimal and gives full control over animations |
| Only 2 runtime dependencies | `react` and `react-dom` — nothing else at runtime |
| Hidden YouTube player | Audio-only experience; IFrame is invisible but functional |
| Random shuffle on enter | Each session starts at a different track for variety |
| `isPlayingRef` mirrors state | Avoids stale closure issues inside the 500ms polling interval |
| `isEnteredRef` mirrors state | Avoids stale closure inside the YouTube `onReady` callback |
| StrictMode guard | `if (ytPlayer.current) return` prevents double-initialization in React StrictMode dev mode |

---

*Chandni Bar — Fort · Lower Parel · After Midnight*
