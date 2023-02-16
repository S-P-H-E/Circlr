import Nav from '@/components/Nav';
import React, { useState, useEffect } from 'react';
import { RiInformationFill } from 'react-icons/ri'
import { CgClose } from 'react-icons/cg'
import { Router, useRouter } from 'next/router';

export default function Layout({children}){
    const [showNotification, setShowNotification] = useState(null);
    const route = useRouter();

    function CheckNewFeature(){
        route.push('/post')
        setTimeout(() => {
            setShowNotification(false);
            localStorage.setItem('showNotification', 'false');
        }, 400);
    }
 
    useEffect(() => {
        const NotiVersion = '0.2'

        const show = localStorage.getItem('showNotification');
        const version = localStorage.getItem('version');
        if (show === null || version !== NotiVersion) {
            localStorage.setItem('showNotification', 'true');
            localStorage.setItem('version', NotiVersion);
            setShowNotification(true);
        } else {
            setShowNotification(show === 'true');
        }
    }, []);

    const handleCloseNotification = () => {
        setShowNotification(false);
        localStorage.setItem('showNotification', 'false');
    };

    return (
        <>
        {showNotification === true ? (
            <div className='flex justify-between items-center border-[1px] border-[#1e7c4f] bg-[#0b2b1b] text-white rounded-lg m-5 p-3'>
            <div className='flex justify-center items-center gap-2'>
                <div>
                    <div className='flex gap-2'>
                        <RiInformationFill className='text-[#1e7c4f]' size={23}/>
                        <h1 className='font-bold'>New Update!</h1>
                    </div>
                    <div className='mx-8'>
                        <p className='text-gray-200 text-sm py-1'>You can now see what time you made a post.</p>
                        {/* <button onClick={CheckNewFeature} className='bg-[#f8f7ae] text-black font-medium p-2 rounded-lg border-[1px] border-gray-500 shadow-lg my-3'>Check it out</button> */}
                    </div>
                </div>
            </div>
            <div className='h-[120px] text-gray-500'>
                <CgClose size={21} onClick={handleCloseNotification} className='w-[20px] flex justify-center items-center hover:cursor-pointer'/>
            </div>
        </div>
        ) : (
            null
        )}
        
        <div className='mx-6 md:max-w-2x1 md-mx-auto font-poppins'>
              <Nav />
            <main>{children}</main>
        </div>
        </>
    )
}
