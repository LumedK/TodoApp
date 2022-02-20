import { useContext } from 'react'
import { LoginPageContext } from '../context/app.context'
const LoginVariant = (props) => {
    const { idVariant } = props
    const loginPageContext = useContext(LoginPageContext)
    const option = [
        {
            value: loginPageContext['loginVariant1'],
            setValue: loginPageContext['setLoginVariant1']
        },
        {
            value: loginPageContext['loginVariant2'],
            setValue: loginPageContext['setLoginVariant2']
        }
    ][idVariant]
    const inscriptionText = {
        login: 'Login',
        create: 'Create new account',
        local: 'Login as local user'
    }

    const onClickHandler = (event) => {
        loginPageContext.setBusy(true)
        const newLoginType = event.target.id.replace('login-variant__', '')
        if (loginPageContext.busy || newLoginType === loginPageContext.loginType) return
        const variants = loginPageContext.loginTypes.filter((type) => type !== newLoginType)

        loginPageContext.setLoginType(newLoginType)
        loginPageContext.setLoginVariant1(variants[0])
        loginPageContext.setLoginVariant2(variants[1])
        loginPageContext.setBusy(false)
    }

    return (
        <span
            id={`login-variant__${option.value}`}
            className="login-card__sub-text linked-text"
            onClick={onClickHandler}
        >
            {inscriptionText[option.value]}
        </span>
    )
}
export default LoginVariant
