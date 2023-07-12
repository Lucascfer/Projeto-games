import '../Styles/Form.css'
import { useState } from "react";
import { app } from "../Services/firebaseConfig";
import { Loading } from './Loading';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const auth = getAuth(app);
    const SigninUser = (event) => {
        event.preventDefault();
        setLoading(true);
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                setMessage("Login efetuado com sucesso!");  
                sessionStorage.setItem("user", JSON.stringify(user));
            })
            .catch((e) => {
                setError(e);
                console.log(error);
                setMessage("Login inválido! :(");
            })
            .finally(() => {
                setLoading(false);
            })
    }

    return (
        <div>
            {
                <div className="login">
                    <h2>Login</h2>

                    <form action="/login" method="POST">
                        <b className="label">E-mail:</b>
                        <input type="text" placeholder="Digite seu e-mail" name="email" required
                            onChange={(e) => setEmail(e.target.value)} />

                        <b className="label">Senha:</b>
                        <input type="password" placeholder="Digite sua senha" name="password" required
                            onChange={(e) => setPassword(e.target.value)} />

                        <button type="submit" onClick={SigninUser} >Entrar</button>
                    </form>
                </div>
            }
            {
                loading &&
                <div>
                    <Loading />
                </div>
            }
            {!loading && message && <p className='message'>{message}</p>}
        </div>
    )
}

export default Login
