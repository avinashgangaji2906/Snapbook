import z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form"
import { SigninValidation } from "@/lib/validation"
import Loader from "@/components/shared/Loader"
import { useSignInAccount } from "@/lib/react-query/queriesAndMutations"
import { useUserContext } from "@/context/AuthContext"
import TextCopy from "./TextCopy"


// type TextRefProps = {
//   current: any
//   emailTextRef : string,
//   passWordTextRef : number
// }

const SigninForm = () => {

  const { toast } = useToast()
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext()
  const { mutateAsync: signInAccount, isPending: isSigningIn } = useSignInAccount()
  const navigate = useNavigate();

  // 1. Define your form.
  const form = useForm<z.infer<typeof SigninValidation>>({
    resolver: zodResolver(SigninValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SigninValidation>) {

    // login a user
    const session = await signInAccount({ email: values.email, password: values.password })

    if (!session) {
      return toast({
        title: "Sign in failed, please try again!",
      });
    }

    const isLoggedIn = await checkAuthUser();

    if (isLoggedIn) {
      form.reset();  // isLoggedIn means user is authenticated, so reset the sign in form
      navigate("/")  // navigate to home
    } else {
      return toast({
        title: "Sign in failed, please try again!",
      });
    }

  }



  return (
    <>
      <Form {...form}>
        {/* logo */}
        <div className="sm:w-420 flex-center flex-col">
          <img
            src="/assets/images/Snapbook-poster.svg"
            alt="logo"
          />
          <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">Sign in to your account</h2>
          <p className="text-light-3 small-medium md:base-regular">Welcome, please sign in</p>


          <form onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4 w-full mt-4">

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" className="shad-input" {...field} />
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
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" className="shad-input" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit"
              className="shad-button_primary mt-2">
              {isSigningIn || isUserLoading ? (
                <div
                  className="flex-center gap-2">
                  <Loader /> Loading...</div>
              ) : "Sign in"}
            </Button>

            {/* <Button
            // onClick={}
            className="bg-white text-black w-full mt-2 gap-2 text-center">
            <img
              src="/assets/icons/google.svg"
              alt="google"
              width={24}
              height={24}
            />
            Sign in with Google
          </Button> */}

            <p className="text-light-2 text-sm  text-center"
            >Don't have an account?
              <Link to="/sign-up"
                className="text-primary-500 font-bold ml-2">Sign up</Link>
            </p>
          </form>
        </div>
      </Form>
      <hr className="border-t border-gray-600 w-1/2 mt-10" />
      <TextCopy />
    </>

  )
}

export default SigninForm