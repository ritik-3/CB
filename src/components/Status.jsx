import { useState } from 'react'

export default function Status({ active }) {
  // Fix #12: random guest count (4–12) chosen once on mount — atmospheric, not analytics
  const [count] = useState(() => Math.floor(Math.random() * 9) + 4)

  return (
    <div className={`status ${active ? 'status--active' : ''}`}>
      <span className="status__dot" />
      {active ? `${count} INSIDE` : 'DOOR OPEN'}
    </div>
  )
}
