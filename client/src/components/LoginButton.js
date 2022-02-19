const LoginButton = (props) => {
    const { loginType } = props
    const { name, color } = {
        login: { name: 'Login', color: 'green' },
        create: { name: 'Create', color: 'green' },
        local: { name: 'Login local', color: 'orange' }
    }[loginType]

    return <button className={`pushbutton login-button login-button--${color}`}>{name}</button>
}

export default LoginButton
