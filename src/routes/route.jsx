import { createBrowserRouter } from "react-router-dom"

import SignInPage from "../Pages/SignInPage/SignInPage"
import SignUp from "../Pages/SignUpPage/SignUpPage"
import NotFoundPage from "../Pages/NotFoundPage/NotFoundPage"
import ProtectedPage from "../Pages/ProtectedPage/ProtectedPage"
import CheckTokenPage from "../Pages/CheckTokenPage/CheckTokenPage"
import JobDetailPage from "../Pages/JobDetailPage/JobDetailPage"
import MainLayout from "../Pages/MainLayout/MainLayout"

//Protected Route
const protectedRoutes = [{
  path: "/",
  element: <ProtectedPage />,
  children: [{
      path: "/", 
      element: <MainLayout />
    },{
      path: "/jobdetail/:id", 
      element: <JobDetailPage />
    }]
}]

const router = createBrowserRouter([

  {
    path: "/login",
    element: <CheckTokenPage />,
    children: [{
      path: "", 
      element: <SignInPage />
    }],
    errorElement: <NotFoundPage />,
  },
  {
    path: "/signup",
    element: <CheckTokenPage />,
    children: [{
      path: "", 
      element: <SignUp />
    }],
    errorElement: <NotFoundPage />,
  },
  ...protectedRoutes.map((route) => ({
    path: route.path,
    element: route.element,
    children: route.children
  })),
  {
    path: '*',
    element: <NotFoundPage />,
  },
])

export default router
