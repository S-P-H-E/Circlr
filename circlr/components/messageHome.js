import { Children } from "react";
import { MdVerified } from 'react-icons/md';
import Link from 'next/link';

export default function Message({children, avatar, username, timestamp, description}) {
  const now = new Date();
  const postTime = new Date(timestamp.seconds * 1000);
  const isToday = postTime.toDateString() === now.toDateString();

  let formattedTime;
  if (isToday) {
    const timeDiffInSeconds = (now - postTime) / 1000;
    if (timeDiffInSeconds < 60) {
      formattedTime = `${Math.round(timeDiffInSeconds)}s`;
    } else if (timeDiffInSeconds < 3600) {
      formattedTime = `${Math.round(timeDiffInSeconds / 60)}m`;
    } else {
      formattedTime = postTime.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
    }
  } else {
    formattedTime = postTime.toLocaleString('en-US', {month: 'short', day: 'numeric'});
  }

  return (
    <div className="text-[color:var(--tx-color)] p-8 my-5 rounded-xl bg-[#161618]">
      <div className="flex items-center gap-2">
        <img src={avatar} className="w-10 rounded-full"/>
        <div className="flex space-x-1 items-center sm:text-[16px] md:text-[18px]">
          <h2 className='font-bold'>{username}</h2>
          <h1 className="text-gray-500 font-thin"> · {formattedTime}</h1>
        </div>
      </div>
      <div className="py-4">
        <p className="">{description}</p>
      </div>
      {children}
    </div>
  )
}
