import {auth, db} from '@/utils/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Router, useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { addDoc, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import {toast} from 'react-toastify';

export default function Post(){
    //Form state
    const [post, setPost] = useState({ description: ""});
    const [user, loading] = useAuthState(auth);
    const route = useRouter();
    const routeData = route.query;

    //Submit Post
    const submitPost = async (e) => {
        e.preventDefault();

        //Run checks for description
        if (!post.description){
            toast.error('Description Field empty âšī¸',{
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000,
            });
            return;
        }
        if (post.description.length > 300){
            toast.error('Description too long đ',{
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000,
            });
            return;
        }

        if(post?.hasOwnProperty("id")){
            const docRef = doc(db, 'posts', post.id);
            const updatedPost = {...post, timestamp: serverTimestamp()}
            await updateDoc(docRef, updatedPost);
            toast.success('Post has been updated đ', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000,
            })
            return route.push('/')
        }else{
        //Make a new post
        const collectionRef = collection(db, 'posts');
        await addDoc(collectionRef, {
            ...post,
            timestamp: serverTimestamp(),
            user: user.uid,
            avatar: user.photoURL,
            username: user.displayName,
        });
        setPost({ description: ""});
        toast.success('Post has been made đ', {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
        })
        return route.push('/');
    }
    };

    //Check our user
    const checkUser = async () => {
        if(loading) return;
        if(!user) return route.push('/auth/login');
        if (routeData.id) {
            setPost({description: routeData.description, id: routeData.id});
        }
    };


    useEffect(() => {
        checkUser();
    }, [user, loading]);

    return (
        <div className='my-20 p-8 max-w-md mx-auto text-white bg-[#161618] rounded-xl'>
            <form onSubmit={submitPost}>
                <h1 className='text-2xl font-bold text-[color:var(--accent-color)]'>
                    {post.hasOwnProperty('id') ? "Edit your post" : "Create a new post"}
                </h1>
                <div className='py-2'>
                    <h3 className='text-lg font-medium py-2'>Description</h3>
                    <textarea 
                    value={post.description}
                    onChange={(e) => setPost({...post, description: e.target.value})}
                    className='bg-[#161618] border-[1px] rounded-lg h-52 w-full p-2 text-sm'></textarea>
                    <p className={`font-medium text-sm ${post.description.length > 20 ? "text-red-600" : ""}`}>{post.description.length}/20</p>
                </div>
                {post.description.length > 20 ? null : <button 
                type="sumbit"
                className='w-full bg-[var(--accent-color)] font-medium rounded-lg align-middle p-2 gap-1 text-black'>
                    {post.hasOwnProperty('id') ? "Update" : "Submit"}
                </button>}
                
            </form>
        </div>
    )
}