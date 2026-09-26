import { useCallback, useEffect, useRef, useState } from 'react'
import Scene from './components/Scene'
import Clock from './components/Clock'
import Status from './components/Status'
import BrandTitle from './components/BrandTitle'
import MusicPlayer from './components/MusicPlayer'
import EnterBar from './components/EnterBar'

// NOTE: All entries currently point to the same placeholder audio file.
// Replace each `src` value when additional audio tracks are available.
const TRACKS = [
  { title: 'Midnight on Grant Road',   artist: 'Chandni House Band', src: '/audio/chandni-midnight.wav' },
  { title: 'Neon Monsoon',             artist: 'Chandni House Band', src: '/audio/chandni-midnight.wav' },
  { title: 'Last Table by the Mirror', artist: 'Chandni House Band', src: '/audio/chandni-midnight.wav' },
]

const VOLUME = 0.34

export default function App() {
  const [isEntered, setIsEntered] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)   // Fix #1: track real playback position
  const [duration, setDuration] = useState(0)         // Fix #1: track real track duration
  const audioRef = useRef(null)
  const isPlayingRef = useRef(false)                  // Fix #2: ref so loadTrack stays stable

  // Keep ref in sync with state so stable callbacks always read the live value
  useEffect(() => { isPlayingRef.current = isPlaying }, [isPlaying])

  const currentTrack = TRACKS[currentTrackIndex]

  // Fix #2, #5, #8: no isPlaying dep → stable callback; volume set on every load;
  // explicit shouldPlay param — no ambiguous default
  const loadTrack = useCallback((index, shouldPlay) => {
    const audio = audioRef.current
    if (!audio) return
    const play = shouldPlay !== undefined ? shouldPlay : isPlayingRef.current
    audio.src = TRACKS[index].src
    audio.load()
    audio.volume = VOLUME     // Fix #5: always set volume, not just on first enter
    setCurrentTrackIndex(index)
    setProgress(0)
    setCurrentTime(0)
    setDuration(0)
    if (play) {
      audio.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false))
    }
  }, [])                      // Fix #2: empty deps — safe because we use isPlayingRef

  // Fix #20: next/previous are memoized so useEffect below can list them as deps
  const next = useCallback(
    () => loadTrack((currentTrackIndex + 1) % TRACKS.length, true),
    [currentTrackIndex, loadTrack]
  )
  const previous = useCallback(
    () => loadTrack((currentTrackIndex - 1 + TRACKS.length) % TRACKS.length, true),
    [currentTrackIndex, loadTrack]
  )

  const enterBar = () => {
    setIsEntered(true)
    const audio = audioRef.current
    if (!audio) return
    audio.volume = VOLUME
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

  const seek = (value) => {
    const audio = audioRef.current
    if (!audio || !audio.duration) return
    audio.currentTime = value * audio.duration
    setProgress(value)
  }

  // Fix #3, #20: next is now stable (useCallback) and correctly listed as dep;
  // Fix #1: timeupdate captures and exposes real currentTime + duration
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    const onTime = () => {
      const dur = audio.duration
      const cur = audio.currentTime
      setProgress(dur ? cur / dur : 0)
      setCurrentTime(cur)
      setDuration(Number.isFinite(dur) ? dur : 0)
    }
    const onEnded = () => next()  // Fix #3: next is stable — no stale closure
    audio.addEventListener('timeupdate', onTime)
    audio.addEventListener('ended', onEnded)
    return () => {
      audio.removeEventListener('timeupdate', onTime)
      audio.removeEventListener('ended', onEnded)
    }
  }, [next])  // Fix #3: next replaces the old [currentTrackIndex, loadTrack] pair

  // Fix #9: removed pointless useMemo — string concat is zero-cost
  const experienceClass = isEntered ? 'experience experience--active' : 'experience'

  return (
    <main className={experienceClass}>
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
        currentTime={currentTime}  // Fix #1
        duration={duration}        // Fix #1
        onPlayPause={togglePlay}
        onPrevious={previous}
        onNext={next}
        onSeek={seek}
      />

      <div className="location-note">FORT · LOWER PAREL · AFTER MIDNIGHT</div>
    </main>
  )
}
