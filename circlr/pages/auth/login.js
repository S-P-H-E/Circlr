import { AiOutlineGoogle } from 'react-icons/ai'
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
        <div className="mt-32 p-10 text-white max-w-md mx-auto flex flex-col justify-center items-center bg-[#161618] rounded-xl">
            <h2 className="text-3xl font-bold text-[color:var(--accent-color)] m-5">CIRCLR</h2>
            <h2 className="text-3xl font-medium">Hey, Welcome!</h2>
            <div className="py-4">
                <h3 className="py-4 text-[var(--hl-color)]">Sign in with one of the providers</h3>
                <button onClick={GoogleLogin} className="bg-[color:var(--accent-color)] rounded-full w-full font-medium text-black flex align-middle p-4 gap-1">
                    <AiOutlineGoogle className='text-2x1' size={'23'}/>
                    Sign in with Google
                </button>
            </div>
        </div>
    )
}