function formatTime(seconds) {
  if (!Number.isFinite(seconds) || seconds <= 0) return '0:00'
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60).toString().padStart(2, '0')
  return `${m}:${s}`
}

export default function MusicPlayer({
  visible,
  playing,
  track,
  progress,
  currentTime,
  duration,
  volume = 40,
  isMuted = false,
  onPlayPause,
  onPrevious,
  onNext,
  onSeek,
  onVolumeChange,
  onToggleMute,
}) {
  if (!track) return null

  const progressPercent = Math.min(Math.max((progress || 0) * 100, 0), 100)
  const effectiveVol = isMuted ? 0 : volume

  const displayArtist = (track.artist || '')
    .replace(/\s*[-–—|•/]\s*topic\b/gi, '')
    .replace(/\btopic\b/gi, '')
    .replace(/\s+/g, ' ')
    .trim()

  return (
    <aside
      className={`player ${visible ? 'player--visible' : ''}`}
      aria-label="Music player"
      aria-hidden={!visible}
    >
      {/* ── Row 1 & 2: Header with Glowing Dot, Title & Artist ── */}
      <div className="player__header">
        <div className="player__title-row">
          <div className="player__dot" aria-hidden="true" />
          <h2 className="player__title" title={track.title}>{track.title}</h2>
        </div>
        <p className="player__artist">{displayArtist || '—'}</p>
      </div>

      {/* ── Row 3: Progress Rail & Timestamp ── */}
      <div className="player__progress-area">
        <div className="player__slider-wrap">
          <div
            className="player__track-fill"
            style={{ width: `${progressPercent}%` }}
            aria-hidden="true"
          />
          <input
            type="range"
            className="player__seek-input"
            aria-label="Seek track position"
            min="0"
            max="1"
            step="0.001"
            value={progress || 0}
            disabled={!visible}
            onChange={(e) => onSeek?.(Number(e.target.value))}
          />
        </div>
        <span className="player__time" aria-label="Playback time">
          {formatTime(currentTime)} / {formatTime(duration)}
        </span>
      </div>

      {/* ── Row 4: Controls Dock (Prev, Play/Pause, Next, Volume) ── */}
      <div className="player__controls-dock" role="group" aria-label="Playback and volume controls">
        <div className="player__transport">
          {/* Previous Track */}
          <button
            type="button"
            className="player__btn player__btn--prev"
            aria-label="Previous track"
            onClick={onPrevious}
          >
            <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
              <path d="M6 6h2v12H6zm3.5 6 8.5 6V6z" />
            </svg>
          </button>

          {/* Play / Pause */}
          <button
            type="button"
            className="player__btn player__btn--play"
            aria-label={playing ? 'Pause' : 'Play'}
            onClick={onPlayPause}
          >
            {playing ? (
              <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true">
                <path d="M6 5h4v14H6zm8 0h4v14h-4z" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>

          {/* Next Track */}
          <button
            type="button"
            className="player__btn player__btn--next"
            aria-label="Next track"
            onClick={onNext}
          >
            <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
              <path d="m6 18 8.5-6L6 6zm10-12v12h2V6z" />
            </svg>
          </button>
        </div>

        {/* Volume & Mute Controls (Always Visible) */}
        <div className="player__volume-wrap">
          <button
            type="button"
            className="player__btn player__btn--vol"
            aria-label={isMuted || volume === 0 ? 'Unmute' : 'Mute'}
            onClick={onToggleMute}
          >
            {isMuted || volume === 0 ? (
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
                <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3 3 4.27l4.73 4.73H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4 9.91 6.09 12 8.18V4z" />
              </svg>
            ) : volume < 50 ? (
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
                <path d="M7 9v6h4l5 5V4l-5 5H7zm11.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
              </svg>
            )}
          </button>

          {/* Volume Slider — Always Visible */}
          <div className="player__vol-slider-box">
            <input
              type="range"
              className="player__vol-input"
              aria-label="Volume level"
              min="0"
              max="100"
              step="1"
              value={effectiveVol}
              style={{ '--vol-percent': `${effectiveVol}%` }}
              onChange={(e) => onVolumeChange?.(Number(e.target.value))}
            />
          </div>
        </div>
      </div>
    </aside>
  )
}
