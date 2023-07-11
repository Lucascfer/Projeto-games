import '../Styles/Form.css'
import { app } from '../Services/firebaseConfig';
import { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Loading } from './Loading';

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const auth = getAuth(app);
  const CreateUser = (event) => {
    event.preventDefault();
    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        setMessage("Cadastro efetuado com sucesso!");
      })
      .catch((e) => {
        setError(e);
        console.log(error);
        setMessage("Cadastro inválido! :(");
      }).finally(() => {
        setLoading(false);
      });
  }

  return (
    <div>
      {
        <div className="login">

          <h2>Registrar-se</h2>

          <form action="/login" method="POST">
            <b className="label">E-mail:</b>
            <input type="text" placeholder="Digite seu e-mail" name="email" required
              onChange={(e) => setEmail(e.target.value)} />

            <b className="label">Senha:</b>
            <input type="password" placeholder="Digite sua senha" name="password" required
              onChange={(e) => setPassword(e.target.value)} />

            <button type="submit" onClick={CreateUser}>Criar conta</button>
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

export default Register
