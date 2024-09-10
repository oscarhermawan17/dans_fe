import React from "react"
import ReactDOM from "react-dom/client"
import { RouterProvider } from "react-router-dom"
import { CookiesProvider } from "react-cookie";
import { AuthProvider } from "./context/AuthContext"
import router from "./routes/route"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CookiesProvider>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </CookiesProvider>
  </React.StrictMode>,
)
