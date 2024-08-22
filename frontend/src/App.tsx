import { BrowserRouter, Routes, Route } from "react-router-dom"
import Landing from "./pages/Landing"
import Signup from "./pages/Signup"
import Signin from "./pages/Signin"
import { Toaster } from "sonner"
import CreateBlog from "./pages/CreateBlog"
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes >
          <Route path="/" element={<Landing />} />
          <Route path="signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/create-blog" element={<CreateBlog />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </div>
  )
}

export default App

// < Route path = "/" element = {} /> 
