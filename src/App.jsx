import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Scene from './components/Scene'
import Clock from './components/Clock'
import Status from './components/Status'
import BrandTitle from './components/BrandTitle'
import MusicPlayer from './components/MusicPlayer'
import EnterBar from './components/EnterBar'

const TRACKS = [
  { title: 'Midnight on Grant Road', artist: 'Chandni House Band', src: '/audio/chandni-midnight.wav' },
  { title: 'Neon Monsoon', artist: 'Chandni House Band', src: '/audio/chandni-midnight.wav' },
  { title: 'Last Table by the Mirror', artist: 'Chandni House Band', src: '/audio/chandni-midnight.wav' },
]

export default function App() {
  const [isEntered, setIsEntered] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const audioRef = useRef(null)

  const currentTrack = TRACKS[currentTrackIndex]

  const loadTrack = useCallback((index, shouldPlay = isPlaying) => {
    const audio = audioRef.current
    if (!audio) return
    audio.src = TRACKS[index].src
    audio.load()
    setCurrentTrackIndex(index)
    setProgress(0)
    if (shouldPlay) {
      audio.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false))
    }
  }, [isPlaying])

  const enterBar = () => {
    setIsEntered(true)
    const audio = audioRef.current
    if (!audio) return
    audio.volume = 0.34
    audio.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false))
  }

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio) return
    if (audio.paused) {
      audio.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false))
    } else {
      audio.pause()
      setIsPlaying(false)
    }
  }

  const next = () => loadTrack((currentTrackIndex + 1) % TRACKS.length, true)
  const previous = () => loadTrack((currentTrackIndex - 1 + TRACKS.length) % TRACKS.length, true)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    const onTime = () => setProgress(audio.duration ? audio.currentTime / audio.duration : 0)
    const onEnded = () => next()
    audio.addEventListener('timeupdate', onTime)
    audio.addEventListener('ended', onEnded)
    return () => {
      audio.removeEventListener('timeupdate', onTime)
      audio.removeEventListener('ended', onEnded)
    }
  }, [currentTrackIndex, loadTrack])

  const seek = (value) => {
    const audio = audioRef.current
    if (!audio || !audio.duration) return
    audio.currentTime = value * audio.duration
    setProgress(value)
  }

  const ambientClass = useMemo(() => isEntered ? 'experience experience--active' : 'experience', [isEntered])

  return (
    <main className={ambientClass}>
      <audio ref={audioRef} preload="metadata" src={currentTrack.src} />
      <Scene active={isEntered} />

      <div className="grain" aria-hidden="true" />
      <div className="vignette" aria-hidden="true" />
      <div className="warmth" aria-hidden="true" />

      <header className="topbar">
        <BrandTitle />
        <Clock />
      </header>

      <div className="status-wrap"><Status active={isEntered} /></div>

      <section className="center-copy" aria-label="Chandni Bar introduction">
        <div className="eyebrow">MUMBAI · 1998</div>
        <p>Some nights are remembered by the music.</p>
        <p>Some by the room.</p>
      </section>

      {!isEntered && <EnterBar onEnter={enterBar} />}

      <MusicPlayer
        visible={isEntered}
        playing={isPlaying}
        track={currentTrack}
        progress={progress}
        onPlayPause={togglePlay}
        onPrevious={previous}
        onNext={next}
        onSeek={seek}
      />

      <div className="location-note">FORT · LOWER PAREL · AFTER MIDNIGHT</div>
    </main>
  )
}
