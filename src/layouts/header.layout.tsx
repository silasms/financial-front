import { Outlet } from "react-router-dom";
import user from '../assets/user.png'


export function HeaderLayout() {
  return (
    <div className="w-full h-full relative">
      <header className="w-full fixed flex justify-between items-center max-[500px]:px-[2%] min-[500px]:px-10 py-2 bg-white z-10 drop-shadow-sm min-w-[500px]">
        <div className="flex justify-end w-full">
          <img src={user} className="w-6 opacity-60 cursor-pointer" alt="user" />
        </div>
      </header>
    <Outlet />
    </div>
  )
}