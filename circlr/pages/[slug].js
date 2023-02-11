import Message from "@/components/message";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { auth, db } from '@/utils/firebase';
import { toast } from 'react-toastify';
import { arrayUnion, doc, getDoc, onSnapshot, Timestamp, updateDoc } from 'firebase/firestore';


export default function Details(){
    const router = useRouter();
    const routerData = router.query;
    const [message, setMessage] = useState('');
    const [allMessage, setAllMessages] = useState([]); 
    
    //Submit a message
    const submitMessage = async() => {
        //Check if the user is logged
        if (!auth.currentUser) return router.push("/auth/login");

        if (!message) {
            toast.error("Empty comment 😞", {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 1500,
            });
            return;
          }
        
          const docRef = doc(db, 'posts', routerData.id);
          await updateDoc(docRef, {
            comments: arrayUnion({
                message,
                avatar: auth.currentUser.photoURL,
                userName: auth.currentUser.displayName,
                time: Timestamp.now(),
            }),
          });

          setMessage('');
    }

    //Get Comments
    const getComments = async () => {
        const docRef = doc(db, "posts", routerData.id);
        const unsubscribe = onSnapshot(docRef, (snapshot) => {
        setAllMessages(snapshot.data()?.comments);
        });
        return unsubscribe;
    };

    useEffect(() => {
        if(!router.isReady) return;
        getComments();
    }, [router.isReady]);
    return(
        <div className="my-1 mx-auto">
            <Message {...routerData}></Message>
            <div className="my-4">
                <div className="flex">
                    <input 
                    onChange={(e) => setMessage(e.target.value)} 
                    type='text' 
                    value={message} 
                    placeholder="Type a comment 💬"
                    className="bg-[#161618] w-full p-2 text-white rounded-lg shadow-lg"
                    />
                    <button onClick={submitMessage} className="bg-[color:var(--accent-color)] text-black py-2 px-4 rounded-lg ml-4">Submit</button>
                </div>
                <div className="my-6">
                    <h2 className="font-bold text-white">Comments</h2>
                    {allMessage?.map(message => (
                        <div className="text-white p-4 my-4 border-b-[1px] shadow-lg" key={message.time}>
                            <div className="flex items-center gap-2 mb-4">
                                <img className="w-10 rounded-full" src={message.avatar} alt="" />
                                <h2>{message.userName}</h2>
                            </div>
                            <h2>{message.message}</h2>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}