import { Outlet, useNavigate } from "react-router-dom";
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import user from '../assets/user.png'
import { useAuth } from "../hooks/auth";


export function HeaderLayout() {
  const navigate = useNavigate()
  const { logout } = useAuth()

  return (
    <div className="w-full h-full relative">
      <header className="w-full fixed flex justify-between items-center max-[500px]:px-[2%] min-[500px]:px-10 py-2 bg-white z-10 drop-shadow-sm min-w-[500px]">
        <div className="flex justify-end w-full gap-4">
          <img src={user} className="w-6 opacity-60 cursor-pointer"alt="user" />
          <LogoutOutlinedIcon className="cursor-pointer opacity-60" onClick={() => {
            logout()
            navigate('/')
          }} />
        </div>
      </header>
    <Outlet />
    </div>
  )
}