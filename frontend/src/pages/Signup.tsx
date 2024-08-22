import { signupInput, SignupInput } from "blognest/dist";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import axios from 'axios';


export const Signup = () => {
  const form = useForm<SignupInput>({
    resolver: zodResolver(signupInput),
    defaultValues: {
      name: "",
      email: "",
      password: ""
    }
  })
  const navigate = useNavigate();

  const onSubmitHandler = async (values: SignupInput) => {
    const myPromise = axios({
      method: 'post',
      url: 'https://blognest.svk.workers.dev/api/v1/user/signup',
      data: values
    });

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
  }


  return <div className="grid grid-cols-2">
    <div className="flex justify-center items-center h-screen">
      <h1 className="text-8xl font-bold">Blognest</h1>
    </div>
    <div className="flex justify-center items-center h-screen">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmitHandler)} className="space-y-10 w-2/4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xl font-semibold tracking-wider">Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xl font-semibold tracking-wider" >Email</FormLabel>
                <FormControl>
                  <Input placeholder="johndoe@gmail.com" {...field} />
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
          <Button className="w-full tracking-wider font-bold" type="submit">Sign up</Button>
          <p>Already have an account? <span onClick={() => navigate("/signin")} className="underline cursor-pointer">Sign in</span></p>
        </form>
      </Form>
    </div>
  </div>
}



export default Signup;