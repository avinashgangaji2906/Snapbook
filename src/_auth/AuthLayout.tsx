
import { Navigate, Outlet } from "react-router-dom"


const AuthLayout = () => {
  const isAuthenticated = false;
  return (
    <>
      {isAuthenticated ? (<Navigate to="/" />) : (
        <>
          <section className="flex flex-1 justify-center items-center py-8 flex-col">
            <Outlet />
          </section>
          <img
            src="/assets/images/side-img-2.png"
            alt="sideImage"
            className="hidden xl:block w-1/2 object-cover bg-no-repeat"
          />
        </>
      )}
    </>
  )
}

export default AuthLayout