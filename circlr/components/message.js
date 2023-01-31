import { Children } from "react";
import { MdVerified } from 'react-icons/md';
import profilePhoto from '@/public/images/no-profile-pic.png';
import Link from 'next/link';

// function makeUrlClickable(text, options = { linkText: null, target: "_blank", className: "text-blue-500 underline" }) {
//     const urlRegex = /(https?:\/\/[^\s]+)/g;
//     const matches = text?.match(urlRegex);
  
//     if (matches) {
//       return matches.map((url) => {
//         const linkText = options.linkText || url;
//         return `<a href="${url}" target="${options.target}" class="${options.className}">${linkText}</a>`;
//       }).join("");
//     } else {
//       return `<p>${text}</p>`;
//     }
// }

export default function Message({children, avatar, username, timestamp, description}){
    // const clickableDescription = makeUrlClickable(description);

    return (
        <div className="text-[color:var(--tx-color)] p-8 my-5 rounded-xl border-[1px] border-gray-600">
            <div className="flex items-center gap-2">
                <img src={avatar} className="w-10 rounded-full"/>
                <div className="flex space-x-1 items-center">
                    <h2 className='font-bold'>{username}</h2>
                    {/* <MdVerified color="#5865f2"/> */}
                </div>
            </div>
            <div className="py-4">
                <p>{description}</p>
                {/* <div dangerouslySetInnerHTML={{ __html: clickableDescription }} /> */}

            </div>
            {children}
        </div>
    )
}
