import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import UserPage from "./pages/UserPage"
import AdminDashboard from "./pages/AdminDashboard "
import { Provider } from "react-redux"
import store from "./store/store.js"
import Home from "./pages/Home"
import Layout from "./components/layout/Layout.jsx"

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="admin" element={<AdminDashboard />} />
            <Route path="user" element={<UserPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App
