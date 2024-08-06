import { AxiosError } from "axios"
import { toast } from "react-toastify"
import { api } from "../../../service/axios"
import { useAuth } from "../../../hooks/auth"
import { useState } from "react"
import { EditMovementModal } from "./edit-movement-modal"
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

type movementTypes = {
  name: string,
  id: string,
  status: 'SPENDING' | 'EARNINGS',
  value: number,
  index: number,
  getMovements: () => Promise<void>
}

export function Movement({ id, name, status, value, index, getMovements }: movementTypes) {
  const { token } = useAuth()
  const [ showEdit, setShowEdit ] = useState(false)
  
  async function onDelete() {
    try {
      await api.delete(`movement/${id}`, {
        headers: {
          Authorization: token
        }
      })
      await getMovements()
    } catch(err) {
      if (err instanceof AxiosError) {
        return toast.error(err.message)
      }
    }
  }

  return (
    <div key={id} className="flex items-center gap-3 text-lg grid grid-cols-12 hover:outline-1 outline-0 outline w-full px-4">
      { showEdit && <EditMovementModal
        setShowModal={setShowEdit}
        id={id}
        getMovements={getMovements}
        value={value}
        status={status}
        name={name}
      /> }
      <p className="text-gray-400 text-sm">{index}</p>
      <p className="col-span-3">{name}</p>
      <div className="col-span-4 flex items-center gap-2">
        <div className={`rounded-full w-3 h-3 ${status === 'SPENDING' ? 'bg-red-400' : 'bg-green-400'}`} ></div>
        <p className={`${status === 'SPENDING'? 'text-red-700' : 'text-green-700'}`}>{status === 'SPENDING' ? "Gasto": "Ganho"}</p>
      </div>
      <p className="col-span-3">R${value}</p>
      <div className="col-span-1 flex gap-5">
        <button>
          <EditIcon className="w-4 opacity-75" onClick={() => setShowEdit(true)} />
        </button>
        <button>
          <DeleteIcon className="w-4 opacity-75" onClick={onDelete} />
        </button>
      </div>
    </div>
  )
}