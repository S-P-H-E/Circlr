import { Children } from "react";
import { MdVerified } from 'react-icons/md';
import profilePhoto from '@/public/images/no-profile-pic.png';
import Link from 'next/link';

function makeUrlClickable(text) {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const match = text.match(urlRegex);
  
    if (match) {
      return text.replace(urlRegex, function(url) {
        return `<a href="${url}" target="_blank" class="text-[color:var(--hl-color)] underline">${url}</a>`;
      });
    } else {
      return `<p>${text}</p>`;
    }
  }
  
export default function MessageIndex({children, avatar, username, timestamp, description}){
    const clickableDescription = makeUrlClickable(description);

    return (
      <div className="my-1 max-w-lg mx-auto">
        <div className="text-[color:var(--tx-color)] p-8 my-5 rounded-xl  border-[1px] border-gray-600">
            <div className="flex items-center gap-2">
                <img src={avatar} className="w-10 rounded-full"/>
                <div className="flex space-x-1 items-center">
                    <h2 className='font-bold'>{username} </h2>
                    {/* <MdVerified color="#5865f2"/> */}
                </div>
            </div>
            <div className="py-4">
                <div class="text-[color:var(--hl-color)]" dangerouslySetInnerHTML={{ __html: clickableDescription }} />
            </div>
            {children}
        </div>
      </div>
    )
}
