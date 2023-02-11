import Nav from '@/components/Nav';
import React, { useState, useEffect } from 'react';
import { RiInformationFill } from 'react-icons/ri'

export default function Layout({children}){
    const [showNotification, setShowNotification] = useState(null);

    useEffect(() => {
        const NotiVersion = '1.0'

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
            <div className='flex justify-between items-center border-[1px] border-[#555e6d] bg-gray-900 text-white rounded-lg m-5 p-3'>
            <div className='flex justify-center items-center gap-2'>
            <RiInformationFill className='text-[#555e6d]' size={23}/>
                <div>
                    <h1 className='font-bold'>New Update!</h1>
                    <p className='text-gray-200 text-sm'>A new way to make posts.</p>
                </div>
            </div>
            
            <button onClick={handleCloseNotification} className='p-2 h-[20px] w-[20px] flex justify-center items-center rounded-md text-white font-bold'>X</button>
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
