import Link from "next/link";
import { auth } from '@/utils/firebase';
import { useAuthState } from "react-firebase-hooks/auth";
import {HiOutlinePencilAlt} from 'react-icons/hi'
import {MdDarkMode} from 'react-icons/md'
import {MdOutlineLightMode} from 'react-icons/md'
import {BiHomeAlt} from 'react-icons/bi'

export default function Nav(){
    const [user, loading ] = useAuthState(auth);

    return (
        <nav className="flex justify-between items-center py-10">
            {user && (
                <Link href="/dashboard">
                    <img className="w-12 rounded-full cursor-pointer shadow-sm shadow-black" src={user ? user.photoURL : "`/images/no-profile-pic.png`"} />
                </Link>
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
                    <div className="flex items-center gap-6">
                        <Link href='/post'>
                            <button className="font-medium bg-[color:var(--bt-color)] py-2 px-4 rounded-lg text-sm h-10">
                                <HiOutlinePencilAlt className="scale-[1.9]" color="white"/>
                            </button>
                        </Link>
                        <Link className="font-medium bg-[color:var(--bt-color)] py-2 px-4 rounded-lg text-sm h-10 flex items-center" href="/">
                            <BiHomeAlt className="scale-[1.9]" color="white"/>
                        </Link>
                    </div>
                )}
            </ul>
        </nav>
    );
}