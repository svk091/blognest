import CardLayout from "@/components/CardLayout"
import CreateBlogNavbar from "@/components/CreateBlogNavbar";
import { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from 'sonner'



const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const onPublishHandler = () => {
    const myPromise = axios({
      method: 'post',
      url: 'https://blognest.svk.workers.dev/api/v1/blog',
      data: {
        title,
        content
      },
      withCredentials: true,
      headers: {
        Accept: `application/json`,
        'Content-Type': 'application/json',
      },
    });
    axios.post(".com", {

    })
    try {
      toast.promise(myPromise, {
        loading: 'Loading...',
        success: (data) => {
          navigate("/");
          return data.data.msg;
        },
        error: (e) => {
          return e.response.data.error;
        },
      });
    } catch (error) {
      toast.error("Something went wrong?")
    }

  }


  return <div>
    <CreateBlogNavbar onPublish={onPublishHandler} />
    <CardLayout>
      <div className="flex flex-col">
        <TextareaAutosize
          onChange={(event) => {
            setTitle(event.target.value)
          }}
          value={title}
          placeholder="Title"
          className="outline-none resize-none font-serif font-semibold text-4xl p-2 my-2" />

        <TextareaAutosize
          onChange={(event) => {
            setContent(event.target.value)
          }}
          value={content}
          placeholder="Share your thoughts..."
          className="outline-none resize-none font-sans text-xl p-2" />
      </div>
    </CardLayout>
  </div>
}

export default CreateBlog;    