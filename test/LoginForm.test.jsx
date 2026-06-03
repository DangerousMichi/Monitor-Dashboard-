import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LoginForm from '../components/LoginForm'

describe('LoginForm', () => {
  let user

  beforeEach(() => {
    user = userEvent.setup()
  })

  test('initial render of inputs and button', () => {
    render(<LoginForm onSubmit={vi.fn()} />)
    expect(screen.getByLabelText(/correo electrónico/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /iniciar sesión/i })).toBeInTheDocument()
  })

  test('shows error when email is empty', async () => {
    render(<LoginForm onSubmit={vi.fn()} />)

    await user.click(screen.getByRole('button', { name: /iniciar sesión/i }))
    expect(screen.getByText(/el correo electrónico es requerido/i)).toBeInTheDocument()
  })

  test('shows error when email is invalid', async () => {
    render(<LoginForm onSubmit={vi.fn()} />)
    const user = userEvent.setup()

    await user.type(screen.getByLabelText(/correo electrónico/i), 'emailinvalido')
    await user.click(screen.getByRole('button', { name: /iniciar sesión/i }))

    expect(screen.getByText(/el correo electrónico no es válido/i)).toBeInTheDocument()
  })

  test('shows error when password has less than 6 characters', async () => {
    render(<LoginForm onSubmit={vi.fn()} />)
    const user = userEvent.setup()

    await user.type(screen.getByLabelText(/correo electrónico/i), 'test@example.com')
    await user.type(screen.getByLabelText(/contraseña/i), '12345')
    await user.click(screen.getByRole('button', { name: /iniciar sesión/i }))

    expect(screen.getByText(/la contraseña debe tener al menos 6 caracteres/i)).toBeInTheDocument()
  })

  test('calls onSubmit with valid data on submit', async () => {
    const mockSubmit = vi.fn()
    render(<LoginForm onSubmit={mockSubmit} />)
    const user = userEvent.setup()

    await user.type(screen.getByLabelText(/correo electrónico/i), 'test@example.com')
    await user.type(screen.getByLabelText(/contraseña/i), 'password123')
    await user.click(screen.getByRole('button', { name: /iniciar sesión/i }))

    expect(mockSubmit).toHaveBeenCalledTimes(1)
    expect(mockSubmit).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123',
    })
  })

  test('disables submit button while submitting', async () => {
    let resolveSubmit
    const mockSubmit = vi.fn(() => new Promise((resolve) => { resolveSubmit = resolve }))
    render(<LoginForm onSubmit={mockSubmit} />)
    const user = userEvent.setup()

    await user.type(screen.getByLabelText(/correo electrónico/i), 'test@example.com')
    await user.type(screen.getByLabelText(/contraseña/i), 'password123')
    const submitButton = screen.getByRole('button', { name: /iniciar sesión/i })

    await user.click(submitButton)
    expect(submitButton).toBeDisabled()

    resolveSubmit()
    await waitFor(() => expect(submitButton).not.toBeDisabled())
  })

  test('shows global error message when onSubmit rejects', async () => {
    const mockSubmit = vi.fn().mockRejectedValueOnce(new Error('Server error'))
    render(<LoginForm onSubmit={mockSubmit} />)
    const user = userEvent.setup()

    await user.type(screen.getByLabelText(/correo electrónico/i), 'test@example.com')
    await user.type(screen.getByLabelText(/contraseña/i), 'password123')
    await user.click(screen.getByRole('button', { name: /iniciar sesión/i }))

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent(/server error/i)
    })
  })
})
