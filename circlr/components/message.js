import { Children } from "react";
import { MdVerified } from 'react-icons/md';
import profilePhoto from '@/public/images/no-profile-pic.png';
import Link from 'next/link';

export default function Message({children, avatar, username, timestamp, description}){

    return (
        <div className="text-[color:var(--tx-color)] p-8 my-5 rounded-xl bg-[#161618]">
            <div className="flex items-center gap-2">
                <img src={avatar} className="w-10 rounded-full"/>
                <div className="flex space-x-1 items-center">
                    <h2 className='font-bold'>{username}</h2>
                </div>
            </div>
            <div className="py-4">
                <p>{description}</p>
            </div>
            {children}
        </div>
    )
}
