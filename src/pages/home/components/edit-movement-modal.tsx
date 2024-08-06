import { AxiosError } from "axios";
import { Modal } from "./modal.component";
import { toast } from "react-toastify";
import { api } from "../../../service/axios";
import { useAuth } from "../../../hooks/auth";
import { Dispatch } from "react";

type props = {
  setShowModal: Dispatch<React.SetStateAction<boolean>>
  getMovements: () => Promise<void>
  id: string
  name: string
  value: number
  status: 'SPENDING' | 'EARNINGS'
}

export function EditMovementModal({ setShowModal, getMovements, id, name, value, status }: props) {
  const { token } = useAuth()

  const onSubmit = async () => {
    const movement = {
      name: (document.getElementById("name") as HTMLInputElement).value,
      status: (document.getElementById("movements") as HTMLInputElement).value,
      value: Number((document.getElementById("value") as HTMLInputElement).value),
      id: id
    }
    try {
      await api.patch('movement', movement, {
        headers: { Authorization: token }
      })
      await getMovements()
      setShowModal(false)
    } catch(err) {
      if (err instanceof AxiosError) {
        toast.error(err.message)
      }
    }
  }

  return (
    <Modal>
      <div className="bg-white outline-2 outline outline-gray-700 px-3 py-2 rounded-xl">
        <h1 className="text-xl text-center font-bold mt-2 mb-5">Editar</h1>
        <div className="flex flex-col gap-3 px-5">
          <div className="flex justify-between gap-32">
            <label htmlFor="name" className="text-lg font-semibold">Nome</label>
            <input type="text" name="name" id="name" className="outline outline-1 outline-gray-300 w-52 px-3 py-1" defaultValue={name} />
          </div>
            
          <div className="flex justify-between">
            <label htmlFor="movements" className="text-lg font-semibold">Tipo</label>
            <select className="outline-1 outline outline-gray-300 w-52 py-1" name="movements" id="movements" defaultValue={status}>
              <option value="SPENDING">Gasto</option>
              <option value="EARNINGS">Ganho</option>
            </select>
          </div>

          <div className="flex justify-between items-center">
            <label htmlFor="value" className="text-lg font-semibold">Valor</label>
            <input type="text" placeholder="" name="value" id="value" className="outline outline-1 outline-gray-300 w-52 px-3 py-1" defaultValue={value}/>
          </div>
          <div className="flex justify-center gap-4">
            <button className="bg-gray-300 w-24 py-0.5 text-white rounded-xl my-2" onClick={() => setShowModal(false)}>Cancelar</button>
            <button className="bg-sky-300 w-16 py-0.5 text-white rounded-xl my-2" onClick={onSubmit}>Editar</button>
          </div>
        </div>
      </div>
    </Modal>
  )
}