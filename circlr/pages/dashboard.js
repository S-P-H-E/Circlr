import Link from "next/link";
import {auth} from '@/utils/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Router, useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { collection, query, where, onSnapshot, doc, deleteDoc } from 'firebase/firestore';
import { db } from '@/utils/firebase';
import Message from "../components/message";
import {HiOutlineTrash} from 'react-icons/hi';
import {FiEdit3} from 'react-icons/fi';
import {toast} from 'react-toastify';

export default function Dashboard(){
    const route = useRouter();
    const [user, loading] = useAuthState(auth);
    const [posts, setPosts] = useState([]);
    //See if user is logged

    const getData = async () => {
        if(loading) return;
        if(!user) return route.push('/auth/login');
        const collectionRef = collection(db, 'posts');
        const q = query(collectionRef, where('user', '==', user.uid));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            setPosts(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id })))
          });
          return unsubscribe;
    };

    //Delete Post
    const deletePost = async(id) => {
        const docRef = doc(db, 'posts', id);
        await deleteDoc(docRef);
    };

    //Get users data
    useEffect(() =>{
        getData();
    }, [user, loading]);

    function signOutButton() {
        auth.signOut()
    }

    return(

        <div className='text-white'>
            <div className='flex justify-between items-center'>
                <h1 className='text-[40px] font-medium text-[color:var(--accent-color)]'>My Posts</h1>
            </div>
            <div>

                {posts.map((post) => {
                    function deleteButton() {
                        deletePost(post.id);
                    }

                    return(
                        <Message {...post} key={post.id}>
                            <div className='flex gap-4'>
                                <Link href={{ pathname: "/post", query: post }}>
                                    <button className='text-blue-600 flex items-center justify-center gap-2 py2 text-sm'><FiEdit3 />Edit</button>
                                </Link>
                                <button onClick={deleteButton} className='text-pink-600 flex items-center justify-center gap-2 py2 text-sm'><HiOutlineTrash />Delete</button>
                            </div>
                        </Message>
                    );
                })}
            </div>
            <button className="font-medium text-black bg-red-600 py-2 px-4 rounded-lg my-6" onClick={signOutButton}>Sign out</button>
        </div>
    );
}