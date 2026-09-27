import { useCallback, useEffect, useRef, useState } from 'react'
import Scene from './components/Scene'
import Clock from './components/Clock'
import Status from './components/Status'
import MusicPlayer from './components/MusicPlayer'

// ─── Config ───────────────────────────────────────────────────────────────────
const rawPlaylist = import.meta.env.VITE_YT_PLAYLIST_ID || ''
const YT_PLAYLIST_ID = rawPlaylist.includes('list=')
  ? (new URLSearchParams(rawPlaylist.split('?')[1] || '')).get('list') || rawPlaylist
  : rawPlaylist
const YT_VOLUME = 40 // 0–100

// YouTube's postMessage origin must match the page origin.
const YT_ORIGIN =
  window.location.hostname === 'localhost'
    ? 'http://localhost'
    : window.location.origin

// ─── Clean artist/channel name (strips YouTube Music "- Topic" suffixes) ──────
function cleanTopic(str = '') {
  if (!str) return ''
  return str
    .replace(/\s*[-–—|•/]\s*topic\b/gi, '')
    .replace(/\btopic\b/gi, '')
    .replace(/\s+/g, ' ')
    .trim()
}

// ─── Parse "Artist - Song" style video titles ─────────────────────────────────
function parseVideoTitle(raw = '', channelName = '') {
  const cleanRaw = cleanTopic(raw)
  const cleanChannel = cleanTopic(channelName)
  for (const sep of [' - ', ' – ', ' — ', ' | ']) {
    if (cleanRaw.includes(sep)) {
      const [a, b] = cleanRaw.split(sep).map(s => s.trim())
      return { title: b || a, artist: cleanTopic(a) || cleanChannel }
    }
  }
  return { title: cleanRaw, artist: cleanChannel }
}

export default function App() {
  const [isEntered,    setIsEntered]    = useState(false)
  const [isPlaying,    setIsPlaying]    = useState(false)
  const [playerReady,  setPlayerReady]  = useState(false)
  const [currentTime,  setCurrentTime]  = useState(0)
  const [duration,     setDuration]     = useState(0)
  const [progress,     setProgress]     = useState(0)
  const [currentTrack, setCurrentTrack] = useState({ title: '—', artist: '—' })
  const [volume,       setVolume]       = useState(YT_VOLUME)
  const [isMuted,      setIsMuted]      = useState(false)

  const [ambientPlaying, setAmbientPlaying] = useState(false)

  const ytPlayer       = useRef(null)
  const pollRef        = useRef(null)
  const isPlayingRef   = useRef(false)
  const isEnteredRef   = useRef(false)
  const streetAudioRef = useRef(null)

  useEffect(() => { isPlayingRef.current = isPlaying }, [isPlaying])

  // ── Scene 1 Ambient Sound: Mumbai City Traffic ─────────────────────────────
  const startStreetSound = useCallback(() => {
    if (!streetAudioRef.current) {
      const audio = new Audio('/audio/traffic-in-city.mp3')
      audio.loop = true
      audio.volume = 0.65
      streetAudioRef.current = audio
    }
    const audio = streetAudioRef.current
    if (audio.paused) {
      audio.play()
        .then(() => setAmbientPlaying(true))
        .catch((err) => console.log('Autoplay deferred:', err.message))
    }
  }, [])

  const toggleStreetSound = useCallback((e) => {
    e?.stopPropagation()
    if (!streetAudioRef.current) {
      startStreetSound()
      return
    }
    const audio = streetAudioRef.current
    if (audio.paused) {
      audio.play().then(() => setAmbientPlaying(true)).catch(() => {})
    } else {
      audio.pause()
      setAmbientPlaying(false)
    }
  }, [startStreetSound])

  useEffect(() => {
    // Attempt play on initial mount
    startStreetSound()

    // Unlock and play on very first user interaction anywhere on the page
    const handleGesture = () => {
      if (!isEnteredRef.current) {
        startStreetSound()
      }
    }
    window.addEventListener('pointerdown', handleGesture, { once: true })
    window.addEventListener('keydown', handleGesture, { once: true })

    return () => {
      window.removeEventListener('pointerdown', handleGesture)
      window.removeEventListener('keydown', handleGesture)
    }
  }, [startStreetSound])

  // ── Metadata ────────────────────────────────────────────────────────────────
  const updateTrackMeta = useCallback(() => {
    try {
      const data = ytPlayer.current?.getVideoData()
      if (data?.title) setCurrentTrack(parseVideoTitle(data.title, data.author))
    } catch (_) {}
  }, [])

  // ── Progress polling (YT has no timeupdate event) ───────────────────────────
  const startPolling = useCallback(() => {
    clearInterval(pollRef.current)
    pollRef.current = setInterval(() => {
      if (!ytPlayer.current || !isPlayingRef.current) return
      try {
        const ct  = ytPlayer.current.getCurrentTime() || 0
        const dur = ytPlayer.current.getDuration()    || 0
        setCurrentTime(ct)
        setDuration(dur)
        setProgress(dur > 0 ? ct / dur : 0)
      } catch (_) {}
    }, 500)
  }, [])

  const stopPolling = useCallback(() => {
    clearInterval(pollRef.current)
    pollRef.current = null
  }, [])

  // ── Start at a random song in the playlist every session ───────────────────
  const playRandomInitialTrack = useCallback(() => {
    if (!ytPlayer.current) return
    try {
      const list = ytPlayer.current.getPlaylist()
      if (Array.isArray(list) && list.length > 1) {
        const randomIndex = Math.floor(Math.random() * list.length)
        ytPlayer.current.playVideoAt(randomIndex)
        return
      }
    } catch (_) {}
    ytPlayer.current.playVideo()
  }, [])

  // ── Load YouTube IFrame API & create hidden player ──────────────────────────
  useEffect(() => {
    if (ytPlayer.current) return // StrictMode guard

    const createPlayer = () => {
      if (ytPlayer.current) return
      ytPlayer.current = new window.YT.Player('yt-player', {
        height : '1',
        width  : '1',
        playerVars: {
          listType   : 'playlist',
          list       : YT_PLAYLIST_ID,
          autoplay   : 0,
          controls   : 0,
          enablejsapi: 1,
          disablekb  : 1,
          fs         : 0,
          rel        : 0,
          origin     : YT_ORIGIN,
        },
        events: {
          onReady: () => {
            try {
              ytPlayer.current.setVolume(YT_VOLUME)
              ytPlayer.current.setShuffle(true)
            } catch (_) {}
            updateTrackMeta()
            setPlayerReady(true)
            if (isEnteredRef.current) {
              playRandomInitialTrack()
            }
          },
          onStateChange: (e) => {
            const S = window.YT.PlayerState
            if (e.data === S.PLAYING) {
              try { ytPlayer.current.setShuffle(true) } catch (_) {}
              setIsPlaying(true)
              isPlayingRef.current = true
              startPolling()
              updateTrackMeta()
            } else if (e.data === S.PAUSED || e.data === S.ENDED) {
              setIsPlaying(false)
              isPlayingRef.current = false
              stopPolling()
              updateTrackMeta()
            } else if (e.data === S.BUFFERING || e.data === S.CUED) {
              updateTrackMeta()
            }
          },
          onError: (e) => {
            console.warn('[Chandni YT error]', e.data)
            try { ytPlayer.current?.nextVideo() } catch (_) {}
          },
        },
      })
    }

    if (window.YT?.Player) {
      createPlayer()
    } else {
      window.onYouTubeIframeAPIReady = createPlayer
      if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
        const tag = document.createElement('script')
        tag.src   = 'https://www.youtube.com/iframe_api'
        document.head.appendChild(tag)
      }
    }

    return () => stopPolling()
  }, [updateTrackMeta, startPolling, stopPolling, playRandomInitialTrack])

  // ── Controls ────────────────────────────────────────────────────────────────
  const enterBar = (e) => {
    e?.stopPropagation()
    setIsEntered(true)
    isEnteredRef.current = true

    // Smoothly fade out the exterior street traffic ambiance as we step inside
    if (streetAudioRef.current) {
      const audio = streetAudioRef.current
      const fadeStep = 0.05
      const fadeInterval = setInterval(() => {
        if (audio.volume > fadeStep) {
          audio.volume = Math.max(0, audio.volume - fadeStep)
        } else {
          audio.pause()
          clearInterval(fadeInterval)
        }
      }, 50)
    }

    if (ytPlayer.current && playerReady) {
      playRandomInitialTrack()
    } else if (ytPlayer.current) {
      try { ytPlayer.current.playVideo() } catch (_) {}
    }
  }

  const togglePlay = () => {
    if (!ytPlayer.current) return
    isPlaying ? ytPlayer.current.pauseVideo() : ytPlayer.current.playVideo()
  }

  const next     = useCallback(() => ytPlayer.current?.nextVideo(),     [])
  const previous = useCallback(() => ytPlayer.current?.previousVideo(), [])

  const seek = (value) => {
    if (!ytPlayer.current || !duration) return
    ytPlayer.current.seekTo(value * duration, true)
    setProgress(value)
  }

  const handleVolumeChange = useCallback((newVol) => {
    setVolume(newVol)
    setIsMuted(newVol === 0)
    if (ytPlayer.current) {
      try {
        ytPlayer.current.setVolume(newVol)
        if (newVol > 0 && ytPlayer.current.isMuted()) {
          ytPlayer.current.unMute()
        }
      } catch (_) {}
    }
  }, [])

  const handleToggleMute = useCallback(() => {
    if (!ytPlayer.current) return
    try {
      if (isMuted) {
        ytPlayer.current.unMute()
        setIsMuted(false)
        if (volume === 0) {
          setVolume(40)
          ytPlayer.current.setVolume(40)
        }
      } else {
        ytPlayer.current.mute()
        setIsMuted(true)
      }
    } catch (_) {}
  }, [isMuted, volume])

  const experienceClass = isEntered ? 'experience experience--active' : 'experience'

  return (
    <main
      className={experienceClass}
      onClick={!isEntered ? startStreetSound : undefined}
    >
      {/* Hidden 1×1 YouTube player — off screen, no visual */}
      <div
        id="yt-player"
        aria-hidden="true"
        style={{ position: 'absolute', width: 1, height: 1, opacity: 0, pointerEvents: 'none', top: 0, left: 0 }}
      />

      <Scene active={isEntered} />

      <div className="vignette" aria-hidden="true" />

      <header className="topbar">
        <Clock />
        <Status active={isEntered} />
      </header>

      {/* Atmospheric Entrance Plaque & Ambient Street Audio Control */}
      {!isEntered && (
        <div className="enter-sign-wrap">
          <button
            type="button"
            className="enter-sign-btn"
            onClick={enterBar}
            aria-label="अंदर आइए — Enter Chandni Bar"
          >
            <img
              src="/assets/Enter%20Bar%20Sign.png"
              alt="अंदर आइए — ENTER BAR"
              className="enter-sign-btn__img"
              draggable="false"
            />
          </button>

          <button
            type="button"
            className={`ambient-sound-btn ${ambientPlaying ? 'ambient-sound-btn--active' : ''}`}
            onClick={toggleStreetSound}
            aria-label={ambientPlaying ? 'Mute city street ambience' : 'Play city street ambience'}
          >
            <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor" aria-hidden="true">
              <path d="M12 3a9 9 0 0 0-9 9v7a3 3 0 0 0 3 3h1a2 2 0 0 0 2-2v-5a2 2 0 0 0-2-2H5v-1a7 7 0 0 1 14 0v1h-2a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h1a3 3 0 0 0 3-3v-7a9 9 0 0 0-9-9z"/>
            </svg>
            <span>{ambientPlaying ? 'STREET SOUND: PLAYING' : 'TAP FOR AMBIENT SOUND'}</span>
          </button>
        </div>
      )}

      <MusicPlayer
        visible={isEntered}
        playing={isPlaying}
        track={currentTrack}
        progress={progress}
        currentTime={currentTime}
        duration={duration}
        volume={volume}
        isMuted={isMuted}
        onPlayPause={togglePlay}
        onPrevious={previous}
        onNext={next}
        onSeek={seek}
        onVolumeChange={handleVolumeChange}
        onToggleMute={handleToggleMute}
      />
    </main>
  )
}
