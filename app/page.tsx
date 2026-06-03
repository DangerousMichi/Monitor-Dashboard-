import Dashboard from '../components/Dashboard'
import MonitorEmma from '../components/MonitorEmma'

export default function Home() {
  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Monitor de Sistema</h1>
      <Dashboard />
      <MonitorEmma />
    </main>
  )
}
