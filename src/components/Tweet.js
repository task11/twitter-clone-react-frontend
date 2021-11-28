import { deleteDoc, doc } from "@firebase/firestore";
import { dbService } from "myBase";
import React from "react";

const Tweet = ({ tweetObj, isOwner }) => {
  const tweetTextRef = doc(dbService, "tweets", `${tweetObj.id}`);
  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete this tweet?");
    console.log(ok);
    if (ok) {
      await deleteDoc(tweetTextRef);
    }
  }

  return (
    <div>
      <h4>{tweetObj.text}</h4>
      {isOwner && (
        <>
          <button onClick={onDeleteClick} >Delete Tweet</button>
          <button>Edit Tweet</button>
        </>
      )}

    </div>
  )
}

export default Tweet;