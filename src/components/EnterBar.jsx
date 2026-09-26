export default function EnterBar({ onEnter }) {
  return (
    <button className="enter" onClick={onEnter} type="button">
      <span className="enter__line" />
      <span className="enter__text">ENTER BAR</span>
      <span className="enter__line" />
    </button>
  )
}
