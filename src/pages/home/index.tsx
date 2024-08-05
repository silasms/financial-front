import { useEffect, useState } from "react"
import { api } from "../../service/axios"
import { Movement } from "./components/movement"
import { useAuth } from "../../hooks/auth"
import { useNavigate } from "react-router-dom"

export function Home() {
  const { signedIn } = useAuth()
  const navigate = useNavigate()
  const [ movements, setMovements ] = useState<{id: string, status: 'SPENDING' | 'EARNINGS', value: number, createdAt: string}[]>([])
  useEffect(() => {
    if (!signedIn) navigate('/')
    async function getMovements() {
      const { data } = await api.get('/movements')
      setMovements(data)
    }
    getMovements()
  }, [])
  return (
    <div>
      <p>Movimentações</p>
      <div>
        {movements.map(({id, status, value, createdAt}) => {
          return (
            <Movement id={id} status={status} value={value} createdAt={createdAt}/>
          )
        })}
      </div>
    </div>
  )
}