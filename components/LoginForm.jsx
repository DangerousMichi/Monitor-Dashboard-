import { useState } from 'react'

export default function LoginForm({ onSubmit }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})

  const validate = () => {
    const tempErrors = {}
    if (!email) {
      tempErrors.email = 'El correo electrónico es requerido'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      tempErrors.email = 'El correo electrónico no es válido'
    }

    if (password.length < 6) {
      tempErrors.password = 'La contraseña debe tener al menos 6 caracteres'
    }

    setErrors(tempErrors)
    return Object.keys(tempErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validate()) {
      onSubmit({ email, password })
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 300 }}>
      <div>
        <label htmlFor="email-input">Correo Electrónico</label>
        <input
          id="email-input"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ display: 'block', width: '100%', padding: 8, marginTop: 4 }}
        />
        {errors.email && (
          <span style={{ color: 'red', fontSize: 12 }}>{errors.email}</span>
        )}
      </div>

      <div>
        <label htmlFor="password-input">Contraseña</label>
        <input
          id="password-input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ display: 'block', width: '100%', padding: 8, marginTop: 4 }}
        />
        {errors.password && (
          <span style={{ color: 'red', fontSize: 12 }}>{errors.password}</span>
        )}
      </div>

      <button type="submit" style={{ padding: '8px 16px', cursor: 'pointer' }}>
        Iniciar Sesión
      </button>
    </form>
  )
}
