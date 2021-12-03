import { deleteDoc, doc, updateDoc } from "@firebase/firestore";
import { deleteObject, ref } from "@firebase/storage";
import { dbService, storageService } from "myBase";
import React, { useState } from "react";

const Tweet = ({ tweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newTweet, setNewTweet] = useState(tweetObj.text);
  const tweetTextRef = doc(dbService, "tweets", `${tweetObj.id}`);
  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete this tweet?");
    if (ok) {
      await deleteDoc(tweetTextRef);
      if (tweetObj.attachmentURL) {
        await deleteObject(ref(storageService, tweetObj.attachmentURL));
      }
    }
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    await updateDoc(tweetTextRef, {
      text: newTweet,
    });
    setEditing(false);
  }

  const toggleEditing = () => setEditing((prev) => !prev); // 토글 상태값 변경
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewTweet(value);
  }
  return (
    <div>
      {
        editing
          ? (
            <>
              <form onSubmit={onSubmit}>
                <input
                  type="text"
                  placeholder="Edit your tweet"
                  value={newTweet}
                  required
                  onChange={onChange}
                />
                <input type="submit" value="Update Tweet" />
              </form>
              <button onClick={toggleEditing}>Cancel</button>
            </>
          ) : (
            <>
              <h4>
                {tweetObj.text}
                {
                  tweetObj.attachmentURL && (
                    <img src={tweetObj.attachmentURL} width="50px" height="50px" alt={tweetObj.text} />)
                }
              </h4>
              {
                isOwner &&
                (
                  <>
                    <button onClick={onDeleteClick} >Delete Tweet</button>
                    <button onClick={toggleEditing}>Edit Tweet</button>
                  </>
                )
              }
            </>)
      }
    </div>
  )
}

export default Tweet;