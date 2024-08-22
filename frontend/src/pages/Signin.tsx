import { SigninInput, signinInput } from "blognest/dist";

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from 'sonner'

export const Signin = () => {
  const form = useForm<SigninInput>({
    resolver: zodResolver(signinInput),
    defaultValues: {
      email: "",
      password: ""
    }
  })

  const onSubmitHandler = async (values: SigninInput) => {

    const myPromise = axios({
      method: 'post',
      url: 'https://blognest.svk.workers.dev/api/v1/user/signin',
      data: values
    });

    toast.promise(myPromise, {
      loading: 'Loading...',
      success: (data) => {
        navigate("/create-blog");
        return data.data.msg;
      },
      error: (e) => {
        return e.response.data.error;
      },
    });
  }



  const navigate = useNavigate();
  return <div className="grid grid-cols-2">
    <div className="flex justify-center items-center h-screen">
      <h1 className="text-8xl font-bold">Blognest</h1>
    </div>
    <div className="flex justify-center items-center h-screen">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmitHandler)} className="space-y-10 w-2/4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xl font-semibold tracking-wider" >Email</FormLabel>
                <FormControl>
                  <Input  {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xl font-semibold tracking-wider">Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full tracking-wider" type="submit">Sign in</Button>
          <p>Don't have an account? <span onClick={() => navigate("/signup")} className="underline cursor-pointer">Sign up</span></p>
        </form>
      </Form>
    </div>
  </div>
}



export default Signin;