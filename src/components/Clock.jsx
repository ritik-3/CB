import { useEffect, useState } from 'react'

export default function Clock() {
  const [now, setNow] = useState(new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])
  return (
    <time className="clock" dateTime={now.toISOString()}>
      <span className="clock__label">LOCAL TIME</span>
      <span>{now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
    </time>
  )
}
