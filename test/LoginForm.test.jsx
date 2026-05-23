import { render, screen, fireEvent } from '@testing-library/react'
import LoginForm from '../components/LoginForm'

describe('LoginForm', () => {
  test('renderizado inicial de inputs y botón', () => {
    render(<LoginForm onSubmit={jest.fn()} />)
    expect(screen.getByLabelText(/correo electrónico/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /iniciar sesión/i })).toBeInTheDocument()
  })

  test('muestra error si el email está vacío', () => {
    render(<LoginForm onSubmit={jest.fn()} />)
    fireEvent.click(screen.getByRole('button', { name: /iniciar sesión/i }))
    expect(screen.getByText(/el correo electrónico es requerido/i)).toBeInTheDocument()
  })

  test('muestra error si el email no es válido', () => {
    render(<LoginForm onSubmit={jest.fn()} />)
    fireEvent.change(screen.getByLabelText(/correo electrónico/i), { target: { value: 'emailinvalido' } })
    fireEvent.click(screen.getByRole('button', { name: /iniciar sesión/i }))
    expect(screen.getByText(/el correo electrónico no es válido/i)).toBeInTheDocument()
  })

  test('muestra error si la contraseña tiene menos de 6 caracteres', () => {
    render(<LoginForm onSubmit={jest.fn()} />)
    fireEvent.change(screen.getByLabelText(/correo electrónico/i), { target: { value: 'test@example.com' } })
    fireEvent.change(screen.getByLabelText(/contraseña/i), { target: { value: '12345' } })
    fireEvent.click(screen.getByRole('button', { name: /iniciar sesión/i }))
    expect(screen.getByText(/la contraseña debe tener al menos 6 caracteres/i)).toBeInTheDocument()
  })

  test('ejecuta onSubmit con datos válidos al enviar', () => {
    const mockSubmit = jest.fn()
    render(<LoginForm onSubmit={mockSubmit} />)
    
    fireEvent.change(screen.getByLabelText(/correo electrónico/i), { target: { value: 'test@example.com' } })
    fireEvent.change(screen.getByLabelText(/contraseña/i), { target: { value: 'password123' } })
    fireEvent.click(screen.getByRole('button', { name: /iniciar sesión/i }))
    
    expect(mockSubmit).toHaveBeenCalledTimes(1)
    expect(mockSubmit).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123',
    })
  })
})
