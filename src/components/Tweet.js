import { deleteDoc, doc } from "@firebase/firestore";
import { dbService } from "myBase";
import React, { useState } from "react";

const Tweet = ({ tweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newTweet, setNewTweet] = useState(tweetObj.text);
  const tweetTextRef = doc(dbService, "tweets", `${tweetObj.id}`);
  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete this tweet?");
    console.log(ok);
    if (ok) {
      await deleteDoc(tweetTextRef);
    }
  };

  const toggleEditing = () => setEditing((prev) => !prev); // 토글 상태값 변경

  return (
    <div>
      {
        editing
          ? (
            <>
              <form>
                <input value={newTweet} required />
              </form>
              <button onClick={toggleEditing}>Cancel</button>
            </>
          ) : (
            <>
              <h4>
                {tweetObj.text}
              </h4>
              {
                isOwner &&
                (
                  <>
                    <button onClick={onDeleteClick} >Delete Tweet</button>
                    <button>Edit Tweet</button>
                  </>
                )
              }
            </>)
      }
    </div>
  )
}

export default Tweet;