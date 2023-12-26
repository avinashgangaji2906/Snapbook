import z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form"
import { SignupValidation } from "@/lib/validation"
import Loader from "@/components/shared/Loader"
import { Link, useNavigate } from "react-router-dom"
import { useCreateUserAccount, useSignInAccount } from "@/lib/react-query/queriesAndMutations"
import { useUserContext } from "@/context/AuthContext"
// import { signInWithGoogle, signUpWithGoogle } from "@/lib/appwrite/api"



const SignupForm = () => {

  const { toast } = useToast()
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext()
  const { mutateAsync: createUserAccount, isPending: isCreatingAccount } = useCreateUserAccount()
  const { mutateAsync: signInAccount, isPending: isSigningIn } = useSignInAccount()
  const navigate = useNavigate();

  // 1. Define your form.
  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SignupValidation>) {
    // Sign in a user 
    const newUser = await createUserAccount(values)

    if (!newUser) {
      return toast({
        title: "Sign up failed, please try again!",
      });
    }
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

  // // signup using google auth
  // async function handleGoogleSignUp(e: React.MouseEvent<HTMLButtonElement>) {
  //   e.preventDefault();
  //   try {
  //     const newUser = await signUpWithGoogle();
  //     console.log(newUser);

  //     if (!newUser) {
  //       return toast({
  //         title: "Sign up failed, please try again!",
  //       });
  //     }

  //     // login a user
  //     const session = await signInWithGoogle()

  //     if (!session) {
  //       return toast({
  //         title: "Sign in failed, please try again!",
  //       });
  //     }

  //     const isLoggedIn = await checkAuthUser();

  //     if (isLoggedIn) {
  //       form.reset();
  //       navigate("/")
  //     } else {
  //       return toast({
  //         title: "Sign in failed, please try again!",
  //       });
  //     }

  //   } catch (error) {
  //     toast({
  //       title: "Google signup failed, please try again!",
  //     });
  //   }
  // }

  return (

    <Form {...form}>
      {/* logo */}
      <div className="sm:w-420 flex-center flex-col ">
        <img
          src="/assets/images/Snapbook-poster.svg"
          alt="logo"
        />
        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">Create a new account</h2>
        <p className="text-light-3 small-medium md:base-regular">To use Snapbook, please enter your details</p>


        <form onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-2 w-full mt-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
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
            className="shad-button_primary mt-4">
            {isCreatingAccount || isSigningIn || isUserLoading ? (
              <div
                className="flex-center gap-2">
                <Loader /> Loading...</div>
            ) : "Sign up"}
          </Button>

          {/* <Button
            onClick={(e) => handleGoogleSignUp(e)}
            className="bg-white text-black w-full mt-2 gap-2 text-center">
            <img
              src="/assets/icons/google.svg"
              alt="google"
              width={24}
              height={24}
            />
            Sign up with Google
          </Button> */}

          <p className="text-light-2 text-sm text-center mt-2"
          >Already have an account?
            <Link to="/sign-in"
              className="text-primary-500 font-bold ml-2">Sign in</Link>
          </p>
        </form>
      </div>
    </Form>

  )
}

export default SignupForm