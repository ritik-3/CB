export default function Scene({ active }) {
  return (
    <div className={`scene ${active ? 'scene--active' : ''}`} aria-hidden="true">
      <div className="scene__image scene__image--exterior" />
      <div className="scene__image scene__image--interior" />
      <div className="scene__image scene__image--corridor" />
      <div className="scene__light scene__light--one" />
      <div className="scene__light scene__light--two" />
      <div className="scene__smoke scene__smoke--one" />
      <div className="scene__smoke scene__smoke--two" />
      <div className="fan fan--one"><span /><span /><span /></div>
      <div className="fan fan--two"><span /><span /><span /></div>
      <div className="curtain curtain--left" />
      <div className="curtain curtain--right" />
    </div>
  )
}
