import { AxiosError } from "axios"
import { useAuth } from "../../hooks/auth"
import { toast } from "react-toastify"
import { api } from "../../service/axios"
import { useNavigate } from "react-router-dom"

export function Edit() {
  const navigate = useNavigate()
  const { user, token, logout } = useAuth()

  const onDelete = async () => {
    try {
      await api.delete(`user/${user.id}`, {
        headers: {
          Authorization: token
        }
      })
      logout()
      navigate('/')
    } catch(err) {
      if (err instanceof AxiosError) {
        toast.error(err.message)
      }
    }
  }

  const onSubmit = async () => {
    const account = {
      name: (document.getElementById('name') as HTMLInputElement).value,
      password: (document.getElementById('password') as HTMLInputElement).value,
      id: user.id
    }

    try {
      await api.patch('user/edit', account, {
        headers: {
          Authorization: token
        }
      })
      navigate('/home')
    } catch(err) {
      if (err instanceof AxiosError) {
        toast.error(err.message)
      }
    }
  }

  return (
    <div className="pt-14">
      <div className="flex justify-center items-center flex-col">
        <h1 className="text-2xl font-semibold mb-4">Editar</h1>
        <div className="flex flex-col gap-3">
          <div className="flex gap-4">
            <label htmlFor="name" className="font-semibold">Nome</label>
            <input type="text" name="name" id="name" className="outline outline-1 outline-gray-300 rounded-lg px-2" defaultValue={user.name}/>
          </div>
          <div className="flex gap-4">
            <label htmlFor="password" className="font-semibold">Senha</label>
            <input type="password" name="password" id="password" className="outline outline-1 outline-gray-300 rounded-lg px-2" />
          </div>
          <div className="flex justify-center gap-4">
            <button className="bg-red-400 text-white px-3 rounded-lg" onClick={onDelete}>Excluir conta</button>
            <button className="bg-sky-400 text-white px-3 rounded-lg" onClick={onSubmit}>Salvar</button>
          </div>
        </div>
      </div>
    </div>
  )
}