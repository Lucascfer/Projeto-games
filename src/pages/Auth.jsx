import { useState } from "react"
import Login from "../components/Login"
import Register from "../components/Register"
import '../Styles/Auth.css'

const Auth = () => {
    const [register, setRegister] = useState(false)

    function switchTab() {
        setRegister(!register)
    }

    return (
        <div className="auth">
            {!register && <div className="authPage">
                <Login />
                <p>Não possui uma conta? <a onClick={() => {switchTab()}}>Cadastre-se</a></p>
            </div>}
            {register && <div className="authPage">
                <Register />
                <p>Possui uma conta? <a onClick={() => {switchTab()}}>Entrar</a></p>
            </div>}
        </div>
    )
}

export default Auth;