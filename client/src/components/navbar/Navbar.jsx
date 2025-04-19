import { Disclosure } from "@headlessui/react";
import { Link } from "react-router-dom";
import React from "react";
import Signdialog from "./Signdialog";
import Registerdialog from "./Registerdialog";
import { UserButton, useUser } from "@clerk/clerk-react";
import logo from "../../assets/logo/logo.png"; // Correct logo path

const navigation = [
    { name: "Home", href: "/", current: true },
    { name: "Services", href: "#services", current: false },
    { name: "About", href: "#about", current: false },
    { name: "Practice", href: "/practice ", current: false },
    { name: "Chat", href: "", current: false },
    { name: "Games", href: "/games", current: false },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

const Navbar = () => {
    const { isLoaded, user } = useUser();

    return (
        <Disclosure as="nav" className="navbar">
            <>
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="relative flex h-24 items-center justify-between">
                        <div className="flex flex-1 items-center sm:items-stretch sm:justify-start">
                            {/* LOGO */}
                            <div className="flex flex-shrink-0 items-center">
                                <img
                                    className="h-24 w-48"
                                    src={logo}
                                    alt="ConfidentSpeak-logo"
                                />
                            </div>

                            {/* LINKS (Visible on Desktop) */}
                            <div className="hidden lg:block m-auto">
                                <div className="flex space-x-6">
                                    {navigation.map((item) => (
                                        <Link
                                            key={item.name}
                                            to={item.href} 
                                            className={classNames(
                                                item.current
                                                    ? "text-black hover:opacity-100"
                                                    : "hover:text-black hover:opacity-100",
                                                "px-4 py-5 text-xl font-medium opacity-75 space-links"
                                            )}
                                            aria-current={
                                                item.href ? "page" : undefined
                                            }
                                        >
                                            {item.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Authentication Buttons */}
                        {!isLoaded || !user ? (
                            <>
                                <Signdialog />
                                <Registerdialog />
                            </>
                        ) : (
                            <UserButton />
                        )}
                    </div>
                </div>
            </>
        </Disclosure>
    );
};

export default Navbar;