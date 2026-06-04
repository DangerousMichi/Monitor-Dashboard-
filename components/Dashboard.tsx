'use client'
import { useDashBoardData } from '../hooks/useDashBoardData'
import MetricCard from './MetricCard'

export default function Dashboard() {
  const { metrics, loading, error, lastUpdate } = useDashBoardData()

  // Lógica de alertas
  const hasAlerts = metrics && Object.values(metrics).some(m => m.status !== 'ok')
  const alertCount = metrics
    ? Object.values(metrics).filter(m => m.status !== 'ok').length
    : 0

  if (loading && !metrics) return <p>Cargando métricas...</p>
  if (error) return <p style={{ color: 'red' }}>{error}</p>

  return (
    <div>
      {hasAlerts && (
        <div style={{
          background: '#fff3cd',
          border: '1px solid #ffebb0',
          borderRadius: 6,
          padding: '8px 12px',
          marginBottom: 16,
          fontSize: 14
        }}>
          {alertCount} métrica(s) requieren atención
        </div>
      )}

      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        {metrics && Object.entries(metrics).map(([key, m]) => (
          <MetricCard
            key={key}
            title={key.toUpperCase()}
            value={m.value}
            unit={m.unit}
            status={m.status}
          />
        ))}
      </div>

      <p style={{ marginTop: 16, fontSize: 12, color: '#999' }}>
        Última actualización: {lastUpdate}
      </p>
    </div>
  )
}
