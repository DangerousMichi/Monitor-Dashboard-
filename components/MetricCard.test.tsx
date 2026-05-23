import { render, screen } from '@testing-library/react'
import MetricCard from './MetricCard'

describe('MetricCard', () => {
  const defaultProps = {
    title: 'CPU',
    value: 67,
    unit: '%',
  }

  test('renders title, value, and unit correctly', () => {
    render(<MetricCard {...defaultProps} status="ok" />)
    
    expect(screen.getByText('CPU')).toBeInTheDocument()
    expect(screen.getByText('67')).toBeInTheDocument()
    expect(screen.getByText('%')).toBeInTheDocument()
  })

  test('applies green color for status "ok"', () => {
    render(<MetricCard {...defaultProps} status="ok" />)
    const valueElement = screen.getByText('67')
    expect(valueElement).toHaveStyle({ color: 'rgb(0, 128, 0)' })
  })

  test('applies orange color for status "warn"', () => {
    render(<MetricCard {...defaultProps} status="warn" />)
    const valueElement = screen.getByText('67')
    expect(valueElement).toHaveStyle({ color: 'rgb(255, 165, 0)' })
  })

  test('applies red color for status "error" (and other values)', () => {
    render(<MetricCard {...defaultProps} status="error" />)
    const valueElement = screen.getByText('67')
    expect(valueElement).toHaveStyle({ color: 'rgb(255, 0, 0)' })
  })
})
