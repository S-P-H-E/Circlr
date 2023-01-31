import { Children } from "react";
import { MdVerified } from 'react-icons/md';
import profilePhoto from '@/public/images/no-profile-pic.png';

export default function Message({children, avatar, username, timestamp, description}){

    return (
        <div className="p-8 my-5 rounded-lg shadow-lg bg-[color:var(--p1-color)]">
            <div className="flex items-center gap-2">
                <img src={avatar} className="w-10 rounded-full"/>
                <div className="flex space-x-1 items-center">
                    <h2 className='text-[color:var(--tx-color)]'>{username}</h2>
                    {/* <MdVerified color="#5865f2"/> */}
                </div>
            </div>
            <div className="py-4">
                <p>{description}</p>
            </div>
            {children}
        </div>
    )
}
