import { dbService, storageService } from "myBase";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  collection,
  // addDoc,
  // getDocs,
  onSnapshot,
  query,
  orderBy
} from "firebase/firestore";
import Tweet from "components/Tweet";

const Home = ({ userObj }) => {

  const [tweet, setTweet] = useState("");
  const [tweets, setTweets] = useState([]);
  const [attachment, setAttachment] = useState();

  // const getTweets = async () => {
  //   const dbTweets = await getDocs(collection(dbService, "tweets"));
  //   dbTweets.forEach((doc) => {
  //     const tweetObj = {
  //       ...doc.data(),
  //       id: doc.id,
  //     };
  //     setTweets((prev) => [tweetObj, ...prev]);
  //   });
  // }

  useEffect(() => {
    //getTweets();
    const q = query(collection(dbService, "tweets"), orderBy('createdAt'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const tweetArray = querySnapshot.docs.map(doc => {
        return {
          id: doc.id,
          ...doc.data()
        }
      });
      setTweets(tweetArray);
      console.log(tweetArray);


    });
  }, [])

  const onSubmit = async (event) => {
    event.preventDefault();
    const fileRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
    const response = await uploadString(fileRef, attachment, "data_url");
    console.log(response);
    // await addDoc(collection(dbService, "tweets"), {
    //   text: tweet,
    //   createdAt: Date.now(),
    //   creatorId: userObj.uid,
    // });
    // setTweet("");
  };

  const onChange = (event) => {
    const { target: { value } } = event;
    setTweet(value);
  };

  const onFileChange = (event) => {
    const { target: { files }, } = event;
    const imgFile = files[0];
    //use fileReader API
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const { currentTarget: { result } } = finishedEvent;
      setAttachment(result);
    };

    reader.readAsDataURL(imgFile);
  };

  const onClearAttachment = () => setAttachment(null);

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={tweet}
          type="text"
          onChange={onChange}
          placeholder="What's on your mind?"
          maxLength="{120}"
        />
        <input type="file" accept="image/*" onChange={onFileChange} />
        <input type="submit" value="Tweet" />
        {attachment &&
          <div>
            <img src={attachment} width="50px" height="50px" />
            <button onClick={onClearAttachment}>Clear</button>
          </div>}
      </form>
      <div>
        {tweets.map((tweet) => (
          <Tweet key={tweet.id}
            tweetObj={tweet}
            isOwner={tweet.creatorId === userObj.uid}
          />

        ))}

      </div>
    </div>
  );
};
export default Home;