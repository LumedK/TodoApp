import { useState } from 'react'

function LoginField(props) {
    const { type, loginType, value, setValue } = props
    const [hintTop, setHintTop] = useState(type === 'email' ? 'Email' : 'Password')
    const placeholder = type === 'email' ? 'Enter your email' : 'Enter your password'
    const hintBottom = type === 'email' ? '' : 'Forgot password ?'

    return (
        <div className="login-field">
            <div className="login-field-hint login-field-hint--top">{hintTop}</div>
            <input
                className="login-field__input"
                type={type}
                placeholder={placeholder}
                spellCheck="false"
                onChange={(e) => {
                    setValue(e.target.value)
                }}
            />
            {loginType === 'login' && (
                <div className="login-field-hint login-field-hint--bottom linked-text">
                    {hintBottom}
                </div>
            )}
        </div>
    )
}

export default LoginField
