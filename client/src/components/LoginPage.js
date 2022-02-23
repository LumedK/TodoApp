import { useState, useContext } from 'react'
import { LoginPageContext, AuthContext } from '../context/app.context'
import { ReactComponent as WelcomeLogo } from '../assets/welcome_logo.svg'
import LoginField from './LoginField'
import LoginButton from './LoginButton'
import LoginVariant from './LoginVariant'

function LoginPage() {
    const loginTypes = ['login', 'create', 'local']
    const authContext = useContext(AuthContext)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loginType, setLoginType] = useState(loginTypes[0])
    const [loginVariant1, setLoginVariant1] = useState(loginTypes[1])
    const [loginVariant2, setLoginVariant2] = useState(loginTypes[2])
    const [busy, setBusy] = useState(false)

    const submitLogin = async (event) => {
        let errors
        setBusy(true)
        if (loginType === 'login') {
            errors = await authContext.login(email, password)
        } else if (loginType === 'create') {
            errors = await authContext.createAccount(email, password)
        }
        // show errors
        if (!errors.length) return
        console.log(errors)
        setBusy(false)
    }

    return (
        <LoginPageContext.Provider
            value={{
                email,
                setEmail,
                password,
                setPassword,
                loginTypes,
                loginType,
                setLoginType,
                loginVariant1,
                setLoginVariant1,
                loginVariant2,
                setLoginVariant2,
                busy,
                setBusy,
                submitLogin
            }}
        >
            <div className="login-page">
                <div className="spacer-x05"></div>
                <div className="login-card">
                    <WelcomeLogo />
                    <span className="login-card__title">Welcome</span>
                    <LoginField type="email" />
                    <LoginField type="password" />
                    <LoginButton />
                    <p className="login-card__sub-text">or</p>
                    <p>
                        <LoginVariant key="0" idVariant="0" />
                        <span className="login-card__sub-text"> / </span>
                        <LoginVariant key="1" idVariant="1" />
                    </p>
                </div>
                <div className="spacer"></div>
            </div>
        </LoginPageContext.Provider>
    )
}

export default LoginPage

//todo
// валидация полей
// состояние busy
// страница "подтвердите регистрацию"
// страница "восстановления пароля"
