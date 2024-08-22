import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate()
  return <div className="grid grid-cols-2">
    <div className="flex justify-center items-center h-screen">
      <h1 className="text-8xl font-bold">Blognest</h1>
    </div>
    <div className="flex justify-center items-center h-screen">
      <div className="space-y-10">
        <h1 className="text-4xl font-bold tracking-widest">Write, share, connect.</h1>
        <div className="flex justify-around space-x-4">

          <button onClick={() => navigate("/signup")} className="border p-4 tracking-wider rounded-lg font-bold text-xl  w-full  shadow-xl hover:shadow-none">
            Signup
          </button>
          <button onClick={() => navigate('/signin')} className="border p-4 tracking-wider rounded-lg font-bold text-xl  w-full  shadow-xl hover:shadow-none">Login</button>
        </div>
      </div>
    </div>
  </div>
}

export default Landing;