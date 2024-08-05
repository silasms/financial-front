type movementTypes = {
  id: string,
  status: 'SPENDING' | 'EARNINGS',
  value: number,
  createdAt: string
}

export function Movement({ id, status, value, createdAt }: movementTypes) {
  return (
    <div key={id}>
      <p className={`bg-[${status === 'SPENDING' ? '#FF0000' : '00FF00'}]`}>{value}</p>
      <p >{createdAt}</p>
    </div>
  )
}