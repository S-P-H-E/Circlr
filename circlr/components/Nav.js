import Link from "next/link";
import { auth } from '@/utils/firebase';
import { useAuthState } from "react-firebase-hooks/auth";
import {BiUser} from 'react-icons/bi'
import {MdOutlineAdd, MdGroups} from 'react-icons/md'
import {CgProfile} from 'react-icons/cg'
import ProfileDropdown from "../components/profileDropdown";
import { useState } from "react";

export default function Nav(){
    const [user, loading ] = useAuthState(auth);
    const [openProfile, setOpenProfile] = useState(false);

    return (
        <nav className="flex justify-between items-center py-10">
            {user && (
                <div>
                    <Link href="/" className="text-[color:var(--tx-color)] font-medium text-3xl">
                        Home
                    </Link>
                </div>
            )}
            {!user && (
                <Link href={"/"}>
                    <img className="w-12 rounded-full cursor-pointer shadow-sm shadow-black" src={`/images/no-profile-pic.png`} />
                </Link>
            )}
            <ul className="flex items-center gap-10">
                {!user && (
                <Link href={"/auth/login"} className="py-2 px-4 text-sm bg-[color:var(--bt-color)] text-black rounded-lg font-medium ml-8">
                    Get Started
                </Link>
                )}
                {user && (
                    <>
                    <div className="flex items-center gap-4">
                        {/* Add */}
                        <Link href='/post'>
                            <button className="font-medium bg-[color:var(--bt-color)] py-2 px-4 rounded-full text-sm h-11 flex items-center">
                                <MdOutlineAdd className="scale-[1.9]" color="white"/>
                            </button>
                        </Link>
                        {/* Groups */}
                        <Link className="font-medium bg-[color:var(--bt-color)] py-2 px-4 rounded-full text-sm h-11 flex items-center" href="/groups">
                            <MdGroups className="scale-[1.8]" color="white"/>
                        </Link>
                        {/* Profile */}
                        <div>
                            <button onClick={() => setOpenProfile((prev) => !prev)} className="font-medium bg-[color:var(--bt-color)] py-2 px-4 rounded-full text-sm h-11 flex items-center">
                                <BiUser className="scale-[1.8]" color="white"/>
                            </button>
                        
                            
                        {
                            openProfile && (
                                <ProfileDropdown />
                            )
                        }
                        </div>
                    </div>
                    </>
                )}
            </ul>
        </nav>
    );
}