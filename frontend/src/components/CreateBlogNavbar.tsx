import { Button } from "./ui/button";

const CreateBlogNavbar = ({ onPublish }: { onPublish: () => void }) => {
  return <nav className=" flex w-full fixed justify-between items-center px-10 p-2 bg-black text-white">
    <h1 className="text-xl font-bold">Blognest</h1>
    <Button onClick={onPublish}>Publish</Button>
  </nav>
}

export default CreateBlogNavbar;  