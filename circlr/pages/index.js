import Head from 'next/head';
import MessageHome from '@/components/messageHome';
import { useEffect, useState } from 'react';
import { db } from '@/utils/firebase';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import Link from 'next/link';
import {BsChat} from 'react-icons/bs'

export default function Home() {
  //Create a state with all the posts
  const [allPosts, setAllPosts] = useState([]);

  const getPosts = async () => {
    const collectionRef = collection(db, 'posts');
    const q = query(collectionRef, orderBy('timestamp', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setAllPosts(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id })))
    });
    return unsubscribe;
  };
  

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      <Head>
        <title>CIRCLR</title>
        <meta name="description" content="Public chat app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='flex justify-center'>
        <div className="my-1 text-lg font-medium w-full">
          {/* <h2 className="text-[color:var(--tx-color)] text-[20px] flex justify-center">Recent</h2> */}
          {allPosts.map((post) => {
            return (
              <Link href={{pathname: `/${post.id}`, query: {...post}}}>
                <MessageHome {...post} key={post.id}>
                  
                  {/* Bottom Icons */}
                    <div className='flex gap-2 w-10'>
                      <BsChat color='#4b5563' className='transform translate-y-1'/>
                      <p className='text-gray-600'>{post.comments?.length > 0 ? post.comments?.length : 0}</p>
                    </div>
                </MessageHome>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  )
}
