import { useContext } from 'react'
import { LoginPageContext } from '../context/app.context'

const LoginButton = (props) => {
    const loginPageContext = useContext(LoginPageContext)
    const option = {
        login: { title: 'Login', className: 'login-button--green' },
        create: { title: 'Create', className: 'login-button--green' },
        local: { title: 'Login local', className: 'login-button--orange' }
    }[loginPageContext.loginType]

    return (
        <button
            // type="submit"
            className={`pushbutton login-button ${option.className}`}
            onClick={loginPageContext.submitLogin}
        >
            {option.title}
        </button>
    )
}

export default LoginButton
