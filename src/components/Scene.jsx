export default function Scene({ active }) {
  return (
    <div className={`scene ${active ? 'scene--active' : ''}`} aria-hidden="true">
      <div className="scene__image scene__image--exterior" />
      <div className="scene__image scene__image--interior" />

      <div className="scene__light scene__light--one" />
      <div className="scene__light scene__light--two" />

      {/* Fix #6: scene__smoke--one class now has explicit CSS rule */}
      <div className="scene__smoke scene__smoke--one" />
      <div className="scene__smoke scene__smoke--two" />

      {/*
        Fix #7, #23: fan--one/fan--two have explicit CSS rules.
        fan__blades wrapper spins as a unit — blades keep their 120° offsets
        because the static transforms on spans are no longer overridden by animation.
      */}
      <div className="fan fan--one">
        <div className="fan__blades"><span /><span /><span /></div>
      </div>
      <div className="fan fan--two">
        <div className="fan__blades"><span /><span /><span /></div>
      </div>

      <div className="curtain curtain--left" />
      <div className="curtain curtain--right" />
    </div>
  )
}
