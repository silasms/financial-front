import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../hooks/auth"

export function AuthGuard({ isPrivate }: { isPrivate: boolean }) {
  const { signedIn } = useAuth()

  if (!signedIn && isPrivate) {
    return <Navigate to={'/'} replace />;
  }

  if (signedIn && !isPrivate) {
    return <Navigate to={'/home'} replace />;
  }
  return <Outlet />;
}