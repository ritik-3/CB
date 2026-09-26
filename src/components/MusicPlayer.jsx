function formatTime(seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) return '00:00'
  const m = Math.floor(seconds / 60).toString().padStart(2, '0')
  const s = Math.floor(seconds % 60).toString().padStart(2, '0')
  return `${m}:${s}`
}

// Fix #21: accept currentTime + duration props instead of hardcoding
export default function MusicPlayer({
  visible, playing, track, progress, currentTime, duration,
  onPlayPause, onPrevious, onNext, onSeek,
}) {
  // Fix #21: null guard — crash-safe if track is ever undefined
  if (!track) return null

  return (
    <aside
      className={`player ${visible ? 'player--visible' : ''}`}
      aria-label="Music player"
      aria-hidden={!visible}  // Fix #10: screen readers can't traverse before entering
    >
      <div className="player__meta">
        <span className="player__label">NOW PLAYING</span>
        <strong>{track.title}</strong>
        <span>{track.artist}</span>
      </div>

      <div className="player__controls">
        <button type="button" aria-label="Previous track" onClick={onPrevious}>↶</button>
        <button
          type="button"
          className="player__play"
          aria-label={playing ? 'Pause' : 'Play'}
          onClick={onPlayPause}
        >
          {playing ? 'Ⅱ' : '▶'}
        </button>
        <button type="button" aria-label="Next track" onClick={onNext}>↷</button>
      </div>

      <div className="player__progress">
        <span>{formatTime(currentTime)}</span>  {/* Fix #1: real elapsed time */}
        <input
          aria-label="Track progress"
          type="range"
          min="0"
          max="1"
          step="0.001"
          value={progress}
          disabled={!visible}  // Fix #18: not interactive before entering
          onChange={e => onSeek(Number(e.target.value))}
        />
        <span>{formatTime(duration)}</span>     {/* Fix #1: real track duration */}
      </div>
    </aside>
  )
}
