export default function Status({ active }) {
  return <div className={`status ${active ? 'status--active' : ''}`}><span className="status__dot" />{active ? '6 INSIDE' : 'DOOR OPEN'}</div>
}
