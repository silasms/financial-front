import { AxiosError } from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { api } from "../../service/axios";
import { FormEvent } from "react";

export function Register() {
  const navigate = useNavigate()
  const onSubmit = async (e: FormEvent<HTMLDivElement>) => {
    e.preventDefault()
    try {
      const user = {
        name: (document.getElementById('name') as HTMLInputElement).value,
        password: (document.getElementById('password') as HTMLInputElement).value,
        email: (document.getElementById('email') as HTMLInputElement).value,
      }
      await api.post('/user/register', user)
      navigate('/')
    } catch(err) {
      if (err instanceof AxiosError)
        toast.error(err.message)
    }
  }

  return (
    <div className="w-full h-screen flex justify-center items-center" onSubmit={onSubmit}>
      <div className="shadow-lg px-4 py-2">
        <form className="flex flex-col gap-4 items-center">
        <h1 className="text-2xl">Registro</h1>
          <input type="name" name="name" id="name" placeholder="Nome" className="outline outline-1 outline-gray-300 px-4 py-1"/>
          <input type="email" name="email" id="email" placeholder="Email" className="outline outline-1 outline-gray-300 px-4 py-1"/>
          <input type="password" name="password" id="password" placeholder="Senha" className="outline outline-1 outline-gray-300 px-4 py-1"/>
          <button type="submit" className="bg-sky-400 px-4 text-white rounded-lg">Registrar</button>
          <p className="text-sm">Já tem conta? <Link to='/'>Entrar</Link></p>
        </form>
      </div>
    </div>
  )
}