import React from 'react';
import { Link, NavLink } from "react-router-dom";
import { isAuthenticated } from '../../helpers/UserHelper';

function Header(props) {
    const loginLogoutButton = isAuthenticated() ?
        <div className="pr-0 flex justify-end">
            <div className="flex relative inline-block float-right">
                <div className="relative text-sm">
                    <button
                        onClick={() => props.handleLogout()}
                        className="shadow-xl sm:ml-8 ml-1 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-red-500 hover:text-black">
                        Log out
                    </button>
                </div>
            </div>
        </div>
        :
        <div className="pr-0 flex justify-end">
            <div className="flex relative inline-block float-right">
                <div className="relative text-sm">
                    <Link to="/login"
                        className="whitespace-nowrap sm:ml-1 ml-8 text-lg font-medium text-gray-500 hover:text-blue-500">
                        Sign in
                    </Link>
                    <Link to="/register"
                        className="shadow-xl sm:ml-8 ml-1 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-blue-500 hover:text-black">
                        Sign up
                    </Link>
                </div>
            </div>
        </div>

    return (
        <header>
            <div className="relative bg-white">
                <div className="flex justify-between items-center border-b-2 border-gray-400 p-4 lg:justify-start lg:space-x-5">
                    <div className="flex justify-start xl:flex-auto">
                        <Link to="/">
                            <img
                                className="shadow-xl"
                                height="80"
                                width="80"
                                src="/logo192.png"
                                alt="logo"
                            />
                        </Link>
                    </div>
                    <nav className="flex flex-wrap flex justify-center flex-auto">
                        <NavLink to="/"
                            className="text-lg pr-5 font-medium text-gray-500 hover:text-blue-500">
                            Home</NavLink>
                        { isAuthenticated() && < NavLink to="/"
                            className="text-lg px-5 font-medium text-gray-500 hover:text-blue-500">
                            My statistics</NavLink>
                        }
                        {isAuthenticated() && < NavLink to="/"
                            className="text-lg px-5 font-medium text-gray-500 hover:text-blue-500">
                            Income</NavLink>
                        }
                        {isAuthenticated() && < NavLink to="/"
                            className="text-lg px-5 font-medium text-gray-500 hover:text-blue-500">
                            Expenditures</NavLink>
                        }
                        <NavLink to="/"
                            className="text-lg px-5 font-medium text-gray-500 hover:text-blue-500">
                            Policy</NavLink>
                    </nav>
                    <div className=" items-center justify-end flex-auto">
                        {loginLogoutButton}
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;