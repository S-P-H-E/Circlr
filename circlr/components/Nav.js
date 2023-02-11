import Link from "next/link";
import { auth } from '@/utils/firebase';
import { useAuthState } from "react-firebase-hooks/auth";
import {BiUser} from 'react-icons/bi'
import {MdOutlineAdd, MdGroups} from 'react-icons/md'
import {CgProfile} from 'react-icons/cg'
import { useState } from "react";

export default function Nav(){
    const [user, loading ] = useAuthState(auth);
    const [openProfile, setOpenProfile] = useState(false);

    return (
        <nav className="flex justify-between items-center py-10">
            {user && (
                <div>
                    <Link href="/" className="text-[color:var(--tx-color)] font-medium text-3xl flex justify-center items-center gap-2">
                        CIRCLR
                    </Link>
                </div>
            )}
            {!user && (
                <div>
                    <Link href="/" className="text-[color:var(--tx-color)] font-medium text-3xl flex justify-center items-center gap-2">
                        CIRCLR
                    </Link>
            </div>
            )}
            <ul className="flex items-center gap-10">
                {!user && (
                <Link href={"/auth/login"} className="py-2 px-4 text-sm border-[1px] border-[color:var(--accent-color)] rounded-full text-[color:var(--accent-color)] font-medium ml-8">
                    Get Started
                </Link>
                )}
                {user && (
                    <>
                    <div className="flex items-center gap-4">
                        {/* Add */}
                        <Link href='/post'>
                            <button className="font-medium border-[1px] border-[color:var(--accent-color)] py-2 px-4 rounded-full text-sm h-11 flex items-center gap-1 text-[color:var(--accent-color)]">
                                <MdOutlineAdd className="scale-[1.4]"/>
                                <p>Post</p>
                            </button>
                        </Link>
                        {/* Groups
                        <Link className="font-medium bg-[color:var(--bt-color)] py-2 px-4 rounded-full text-sm h-11 flex items-center" href="/groups">
                            <MdGroups className="scale-[1.8]" color="black"/>
                        </Link> */}
                        {/* Profile */}
                        <Link className="font-medium text-sm h-11" href="/dashboard">
                            <img className="w-12 rounded-full cursor-pointer" src={user.photoURL}/>
                        </Link>
                    </div>
                    </>
                )}
            </ul>
        </nav>
    );
}