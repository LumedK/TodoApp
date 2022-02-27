import { useContext } from 'react'
import { LoginPageContext } from '../../../context'

function LoginField(props) {
    const { type } = props
    const loginPageContext = useContext(LoginPageContext)
    const option = {
        email: {
            name: 'email',
            hintTop: 'email',
            placeholder: 'Enter your email',
            setValueName: 'setEmail'
        },
        password: {
            name: 'password',
            hintTop: 'Password',
            placeholder: 'Enter your password',
            hintBottom: 'Forgot password ?',
            setValueName: 'setPassword'
        }
    }[type]
    const hide = {
        login: { hintBottom: true },
        create: {},
        local: { field: true }
    }

    if (hide[loginPageContext.loginType].field) return ''

    return (
        <div className="login-field">
            <div className="login-field-hint login-field-hint--top">{option.hintTop}</div>
            <input
                className="login-field__input"
                type={type}
                placeholder={option.placeholder}
                spellCheck="false"
                value={loginPageContext[type]}
                onChange={(e) => {
                    loginPageContext[option.setValueName](e.target.value)
                }}
            />
            {hide[loginPageContext.loginType].hintBottom && option.hintBottom && (
                <div className="login-field-hint login-field-hint--bottom linked-text">
                    {option.hintBottom}
                </div>
            )}
        </div>
    )
}

export default LoginField
