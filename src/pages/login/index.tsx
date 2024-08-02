import { Link } from "react-router-dom";
import { api } from "../../service/axios";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

export function Login() {
  const onSubmit = async () => {
    const user = {
      email: document.getElementById('email'),
      password: document.getElementById('password')
    }

    try {
      const { data } = await api.post('user/login', user)
      console.log(data)
    } catch(err) {
      if (err instanceof AxiosError) {
        toast.error('Faça o login novamente.')
      }
    }
  }
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="shadow-lg px-4 py-2">
        <form className="flex flex-col gap-4 items-center" onSubmit={onSubmit}>
          <input type="email" name="email" id="email" placeholder="Email" className="outline outline-1 outline-gray-300 px-4 py-1"/>
          <input type="password" name="password" id="password" placeholder="Senha" className="outline outline-1 outline-gray-300 px-4 py-1"/>
          <button type="submit" className="bg-sky-400 px-4 text-white rounded-lg">Entrar</button>
          <Link to='/register' className="text-sm">Cadastre-se</Link>
        </form>
      </div>
    </div>
  ) 
}