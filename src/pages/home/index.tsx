import { useEffect, useState } from "react"
import { api } from "../../service/axios"
import { Movement } from "./components/movement"
import { useAuth } from "../../hooks/auth"
import { useNavigate } from "react-router-dom"
import { CreateMovementModal } from "./components/create-movement-modal.component"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';


const maxItemsPerPage = 13

export function Home() {
  const { signedIn, token, user } = useAuth()
  const navigate = useNavigate()
  const [ movements, setMovements ] = useState<{id: string, name: string, status: 'SPENDING' | 'EARNINGS', value: number, createdAt: string}[]>([])
  const [ showModal, setShowModal ] = useState(false)
  const [ page, setPage ] = useState(1)
  const [ show, setShow ] = useState(movements.slice((page*maxItemsPerPage)-maxItemsPerPage, page*maxItemsPerPage))
  const maxPages = Math.ceil(movements.length/maxItemsPerPage)


  async function getMovements() {
    const { data } = await api.get(`/movement/user/${user.id}`, {
      headers: { Authorization: token }
    })
    setMovements(data)
  }

  useEffect(() => {
    setShow(movements.slice((page*maxItemsPerPage)-maxItemsPerPage, page*maxItemsPerPage))
  }, [page, movements])

  const nextPage = () => {
    setPage(count => {
      if (count > 1)
        return count - 1
      return maxPages
    })
  }
  const backPage = () => {
    setPage(count => {
      if (count < maxPages)
        return count + 1
      return 1
    })
  }

  useEffect(() => {
    if (!signedIn) return navigate('/')
    getMovements()
  }, [])

  return (
    <div className="pt-14">
      {showModal && <CreateMovementModal
        setShowModal={setShowModal}
        getMovements={getMovements}
      />}
      <h1 className="text-2xl font-bold text-center">Movimentações</h1>
      <div className="w-full flex justify-end px-3">
        <button className="bg-sky-300 text-white px-6 py-1 rounded-xl font-semibold text-lg" onClick={() => setShowModal(true)}>Criar</button>
      </div>
      <div className="pr-32 mt-7 pl-3">
        <div className="flex flex-col outline outline-2 outline-gray-300 rounded-xl h-[500px]">
          <div className="grid grid-cols-12 font-semibold py-2 border-b-3 pl-4">
            <p className="col-span-1"></p>
            <p className="col-span-3">Nome</p>
            <p className="col-span-4">Status</p>
            <p className="col-span-1">Valor</p>
          </div>
          <div className="flex flex-col gap-1 select-none">
            {show.map(({id, name, status, value}, index) => {
              return (
                <Movement
                  id={id}
                  name={name}
                  status={status}
                  value={value}
                  index={index}
                  getMovements={getMovements}
                />
              )
            })}
          </div>
          <div className='flex w-auto h-auto justify-end items-end my-2' style={{height: "100%"}}>
        <ArrowBackIcon
          className='cursor-pointer scale-75'
          onClick={nextPage}
          style={{fill: "#969696"}}
        />
        <p className="scale-75" style={{color: "#969696"}}>{page}/{maxPages}</p>
        <ArrowForwardIcon
          className='cursor-pointer scale-75'
          onClick={backPage}
          style={{fill: "#969696"}}
        />
      </div>
        </div>
      </div>
    </div>
  )
}