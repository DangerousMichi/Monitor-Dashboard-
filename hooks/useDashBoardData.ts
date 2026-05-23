import { useState, useEffect } from 'react'

export interface Metric {
  value: number
  unit: string
  status: string
}

export interface DashboardMetrics {
  cpu: Metric
  memory: Metric
  requests: Metric
  errors: Metric
  [key: string]: Metric
}

export function useDashBoardData() {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdate, setLastUpdate] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        // Simulamos datos de monitoreo (en prod vendría de una API)
        await new Promise(r => setTimeout(r, 800))
        const data: DashboardMetrics = {
          cpu: { value: 67, unit: '%', status: 'warn' },
          memory: { value: 4.2, unit: 'GB', status: 'ok' },
          requests: { value: 1240, unit: 'req/min', status: 'ok' },
          errors: { value: 3, unit: 'errores', status: 'ok' },
        }
        setMetrics(data)
        setLastUpdate(new Date().toLocaleTimeString())
        setError(null)
      } catch (err) {
        setError('Error cargando métricas')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
    const interval = setInterval(fetchData, 5000)
    return () => clearInterval(interval)
  }, [])

  return { metrics, loading, error, lastUpdate }
}
