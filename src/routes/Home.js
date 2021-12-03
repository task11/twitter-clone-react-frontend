import { dbService } from "myBase";
import React, { useEffect, useState } from "react";
import {
  collection,

  onSnapshot,
  query,
  orderBy
} from "firebase/firestore";
import Tweet from "components/Tweet";
import TweetFactory from "components/TweetFactory";

const Home = ({ userObj }) => {


  const [tweets, setTweets] = useState([]);


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
    onSnapshot(q, (querySnapshot) => {
      const tweetArray = querySnapshot.docs.map(doc => {
        return {
          id: doc.id,
          ...doc.data()
        }
      });
      setTweets(tweetArray);
    });
  }, [])



  return (
    <div>
      <TweetFactory userObj={userObj} />
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