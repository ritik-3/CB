import { useEffect, useState } from 'react'

export default function Clock() {
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  const h = now.getHours() % 12 || 12
  const m = now.getMinutes().toString().padStart(2, '0')
  const ampm = now.getHours() >= 12 ? 'PM' : 'AM'

  return (
    <time className="atmo-clock" dateTime={now.toISOString()}>
      <span className="atmo-clock__time">{h}:{m} {ampm}</span>
      <div className="atmo-clock__line" aria-hidden="true" />
      <span className="atmo-clock__loc">MUMBAI &middot; 1998</span>
    </time>
  )
}
