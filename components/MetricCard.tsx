interface MetricCardProps {
  title: string
  value: number
  unit: string
  status: string
}

export default function MetricCard({ title, value, unit, status }: MetricCardProps) {
  const color = status === 'ok' ? 'green' : status === 'warn' ? 'orange' : 'red'
  return (
    <div style={{
      border: '1px solid #ddd',
      borderRadius: 8,
      padding: '1rem',
      minWidth: 140,
      textAlign: 'center'
    }}>
      <p style={{ margin: 0, fontSize: 13, color: '#666' }}>{title}</p>
      <p style={{ margin: '8px 0 0', fontSize: 28, fontWeight: 600, color }}>{value}</p>
      <p style={{ margin: 0, fontSize: 12, color: '#999' }}>{unit}</p>
    </div>
  )
}
