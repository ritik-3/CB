function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return '00:00'
  const m = Math.floor(seconds / 60).toString().padStart(2, '0')
  const s = Math.floor(seconds % 60).toString().padStart(2, '0')
  return `${m}:${s}`
}

export default function MusicPlayer({ visible, playing, track, progress, onPlayPause, onPrevious, onNext, onSeek }) {
  return (
    <aside className={`player ${visible ? 'player--visible' : ''}`} aria-label="Music player">
      <div className="player__meta">
        <span className="player__label">NOW PLAYING</span>
        <strong>{track.title}</strong>
        <span>{track.artist}</span>
      </div>
      <div className="player__controls">
        <button type="button" aria-label="Previous track" onClick={onPrevious}>↶</button>
        <button type="button" className="player__play" aria-label={playing ? 'Pause' : 'Play'} onClick={onPlayPause}>
          {playing ? 'Ⅱ' : '▶'}
        </button>
        <button type="button" aria-label="Next track" onClick={onNext}>↷</button>
      </div>
      <div className="player__progress">
        <span>00:00</span>
        <input aria-label="Track progress" type="range" min="0" max="1" step="0.001" value={progress} onChange={e => onSeek(Number(e.target.value))} />
        <span>{formatTime(60)}</span>
      </div>
    </aside>
  )
}
