import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "../pages/login";
import { Register } from "../pages/register";
import { AuthGuard } from "../guard/auth.guard";
import { Home } from "../pages/home";

export function Router() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route element={<AuthGuard isPrivate={false} />}>
          <Route path="/" element={<Login />}/>
          <Route path="/register" element={<Register />}/>
        </Route>
        <Route element={<AuthGuard isPrivate={true} />}>
          <Route path="/home" element={<Home />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}