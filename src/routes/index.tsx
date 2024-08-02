import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "../pages/login";

export function Router() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Login />}/>
      </Routes>
    </BrowserRouter>
  )
}