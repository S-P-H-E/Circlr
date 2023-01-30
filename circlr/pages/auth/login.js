import { AiOutlineGoogle } from 'react-icons/Ai'
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '@/utils/firebase';
import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect } from 'react';
import {toast} from 'react-toastify';

export default function Login() {
    const route = useRouter();
    const [user, loading] = useAuthState(auth);

    //Sign in with Google
    const googleProvider = new GoogleAuthProvider();
    const GoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            route.push('/');
        } catch (error) {
            console.log(error);
        }
        toast.success('Successfully Signed In 🎉', {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
        })
    }

    useEffect(() => {
        if(user){
            route.push('/');
        }else{
            console.log('login')
        }
    }, [user]);

    return (
        <div className="shadow-xl mt-32 p-10 text-white rounded-lg max-w-md mx-auto bg-[color:var(--p1-color)]">
            <h2 className="text-2xl font-medium">Get Started</h2>
            <div className="py-4">
                <h3 className="py-4">Sign in with one of the providers</h3>
                <button onClick={GoogleLogin} className="bg-[color:var(--bt-color)] w-full font-medium rounded-lg flex align-middle p-4 gap-1 text-black">
                    <AiOutlineGoogle className='text-2x1' size={'23'}/>
                    Sign in with Google</button>
            </div>
        </div>
    )
}