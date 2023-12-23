
import { sidebarLinks } from "@/constants"
import { useUserContext } from "@/context/AuthContext"
import { INavLink } from "@/types"
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom"
import { Button } from "../ui/button"
import { useSignOutAccount } from "@/lib/react-query/queriesAndMutations"
import { useEffect } from "react"
import { GoGear } from "react-icons/go";


const LeftSidebar = () => {
    const { mutate: signOut, isSuccess } = useSignOutAccount()
    const { pathname } = useLocation()
    const { user } = useUserContext()
    const navigate = useNavigate();

    useEffect(() => {
        if (isSuccess)
            // navigate("/sign-in")
            navigate(0) // means navigate to signup/ signin
    }, [isSuccess])


    return (
        <nav className="leftsidebar">
            <div className="flex flex-col gap-9">
                <Link to="/"
                    className="flex gap-3 flex-center">
                    <img
                        src="/assets/images/Snapbook-poster.svg"
                        alt="logo"
                        width={250}
                        height={50}
                    />
                </Link>
                <Link
                    to={`/profile/${user.id}`}
                    className="flex text-center gap-3"
                >
                    <img
                        src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
                        alt="profile"
                        className="w-14 h-14 rounded-full"
                    />
                    <div className="flex flex-col gap-1">
                        <p className="body-bold">{user.name}</p>
                        <p className="small-regular text-light-3 text-start"
                        >@{user.username}</p>
                    </div>
                </Link>
                <ul className="flex flex-col gap-5">
                    {sidebarLinks.map((link: INavLink) => {
                        const isActive = pathname === link.route;
                        return (
                            <li key={link.label}
                                className={`leftsidebar-link group ${isActive && "bg-primary-500"}`}>

                                <NavLink
                                    to={link.route}
                                    className="flex gap-4 items-center p-4"
                                >
                                    <img
                                        src={link.imgURL}
                                        alt={link.label}
                                        className={`group-hover:invert-white ${isActive && "invert-white"}`}
                                    />
                                    {link.label}
                                </NavLink>
                            </li>
                        )
                    })}
                </ul>
            </div>
            <hr className="w-full border-t border-gray-900" />
            <div className="flex flex-col gap-5 ">

                <Button variant="ghost"
                    className="shad-button_ghost"
                >
                    <Link
                        to="/setting"
                        className="flex gap-4 flex-center"
                    >
                        <div className="text-2xl text-primary-500"> <GoGear /></div>
                        <p className="small-medium lg:base-medium">Setting</p>
                    </Link>
                </Button>
                <Button variant="ghost"
                    className="shad-button_ghost"
                    onClick={() => signOut()}
                >
                    <img
                        src="/assets/icons/logout.svg"
                        alt="logout"
                    />
                    <p className="small-medium lg:base-medium">Logout</p>
                </Button>
            </div>
        </nav>
    )
}


export default LeftSidebar