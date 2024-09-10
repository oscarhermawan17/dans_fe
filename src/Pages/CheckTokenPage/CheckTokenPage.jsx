import { Navigate, Outlet } from "react-router-dom"
import useAuth from '../../hooks/useAuth/useAuth';

const CheckTokenPage = () => {
  const { token } = useAuth();

  return token ? <Navigate to="/" /> : <Outlet />
}

export default CheckTokenPage
