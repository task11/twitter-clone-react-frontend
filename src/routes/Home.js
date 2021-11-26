import { dbService } from "myBase";
import React, { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  getDocs
} from "firebase/firestore";

const Home = ({ userObj }) => {
  console.log(userObj);
  const [tweet, setTweet] = useState("");
  const [tweets, setTweets] = useState([]);

  const getTweets = async () => {
    const dbTweets = await getDocs(collection(dbService, "tweets"));
    dbTweets.forEach((doc) => {
      const tweetObj = {
        ...doc.data(),
        id: doc.id,
        creatorId: 1122,
      };
      setTweets((prev) => [tweetObj, ...prev]);
    });
  }

  useEffect(() => {
    getTweets();
  }, [])

  const onSubmit = async (event) => {
    event.preventDefault();
    const add = await addDoc(collection(dbService, "tweets"), {
      text: tweet,
      createdAt: Date.now(),

    });
    setTweet("");
  };
  const onChange = (event) => {
    const { target: { value } } = event;
    setTweet(value);
  };
  console.log(tweets);
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
      <div>
        {tweets.map((tweet) => (
          <div key={tweet.id}>
            <h4>{tweet.tweet}</h4>
          </div>

        ))}

      </div>
    </div>
  );
};
export default Home;