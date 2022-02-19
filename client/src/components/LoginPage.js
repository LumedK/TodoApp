import { useState } from 'react'
import LoginPageContext from '../context/loginPage.context'
import { ReactComponent as WelcomeLogo } from '../assets/welcome_logo.svg'
import LoginField from './LoginField'
import LoginButton from './LoginButton'

function LoginPage() {
    // const LoginPageContext = useContext(LoginPageContext)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loginType, setLoginType] = useState('login')
    const [loginVariant1, setLoginVariant1] = useState('create')
    const [loginVariant2, setLoginVariant2] = useState('local')
    const [busy, setBusy] = useState(false)

    const loginTypes = new Map([
        ['login', 'Login'],
        ['create', 'Create new account'],
        ['local', 'Login as local user']
    ])

    const changeLoginTypeHandler = (event) => {
        const newLoginType = event.target.id
        if (busy || loginType === newLoginType) {
            return
        }
        setBusy(true)
        const variants = []
        loginTypes.forEach((v, k) => {
            if (k !== newLoginType) variants.push(k)
        })
        setLoginType(newLoginType)
        setLoginVariant1(variants[0])
        setLoginVariant2(variants[1])
        setBusy(false)
    }
    const submitLogin = async () => {
        setBusy(true)

        setBusy(false)
        // return <Navigate to="/login" />;
    }

    return (
        <LoginPageContext.Provider
            value={{
                email,
                setEmail,
                password,
                setPassword,
                loginType,
                setLoginType,
                loginVariant1,
                setLoginVariant1,
                loginVariant2,
                setLoginVariant2,
                submitLogin
            }}
        >
            <div className="login-page">
                <div className="login-page__spacer-top"></div>
                <div className="login-card">
                    <WelcomeLogo />
                    <span className="login-card__title">Welcome</span>
                    {loginType !== 'local' && (
                        <LoginField type="email" value={email} setValue={setEmail} />
                    )}
                    {loginType !== 'local' && (
                        <LoginField
                            type="password"
                            loginType={loginType}
                            value={password}
                            setValue={setPassword}
                        />
                    )}
                    <LoginButton loginType={loginType} submitLogin={submitLogin} />
                    <p className="login-card__sub-text">or</p>
                    <p className="login-card__sub-text">
                        <span
                            className="login-card__sub-text linked-text"
                            onClick={changeLoginTypeHandler}
                            id={loginVariant1}
                        >
                            {loginTypes.get(loginVariant1)}
                        </span>
                        <span className="login-card__sub-text"> / </span>
                        <span
                            className="login-card__sub-text linked-text"
                            onClick={changeLoginTypeHandler}
                            id={loginVariant2}
                        >
                            {loginTypes.get(loginVariant2)}
                        </span>
                    </p>
                </div>
                <div className="login-page__spacer-bottom"></div>
            </div>
        </LoginPageContext.Provider>
    )
}

export default LoginPage

//todo
// вынести надписи вариантов в компонент
// переписать с контекстом
// редирект при входе
// валидация полей
// состояние busy
// страница "подтвердите регистрацию"
// страница "восстановления пароля"
