export default function EnterBar({ onEnter }) {
  return (
    // Fix #11: id for targeting, aria-label describing full purpose
    <button
      id="enter-bar-btn"
      className="enter"
      onClick={onEnter}
      type="button"
      aria-label="Enter Chandni Bar and begin the experience"
    >
      <span className="enter__line" aria-hidden="true" />
      <span className="enter__text">ENTER BAR</span>
      <span className="enter__line" aria-hidden="true" />
    </button>
  )
}
