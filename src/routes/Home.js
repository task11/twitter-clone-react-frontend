import { dbService } from "myBase";
import React, { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  getDocs
} from "firebase/firestore";

const Home = () => {
  const [tweet, setTweet] = useState("");
  const [tweets, setTweets] = useState([]);

  const getTweets = async () => {
    const dbTweets = await getDocs(collection(dbService, "tweet"));
    dbTweets.forEach((doc) => {
      const tweetObj = {
        ...doc.data(),
        id: doc.id,
      }
    });
  }

  useEffect(() => {
    getTweets();
  }, [])

  const onSubmit = async (event) => {
    event.preventDefault();
    const add = await addDoc(collection(dbService, "tweets"), {
      tweet,
      createdAt: Date.now(),

    });
    setTweet("");
  };
  const onChange = (event) => {
    const { target: { value } } = event;
    setTweet(value);
  };
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
        <input type="submit" value="Tweet" />
      </form>
    </div>
  );
};
export default Home;