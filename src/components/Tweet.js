import { deleteDoc, doc, updateDoc } from "@firebase/firestore";
import { deleteObject, ref } from "@firebase/storage";
import { dbService, storageService } from "myBase";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

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
    <div className="tweet">
      {
        editing
          ? (
            <>
              <form onSubmit={onSubmit} className="container tweetEdit">
                <input
                  type="text"
                  placeholder="Edit your tweet"
                  value={newTweet}
                  required
                  autoFocus
                  onChange={onChange}
                  className="formInput"
                />
                <input type="submit" value="Update Tweet" className="formBtn" />
              </form>
              <span onClick={toggleEditing} className="formBtn cancelBtn">
                Cancel
              </span>
            </>
          ) : (
            <>
              <h4>
                {tweetObj.text}
                {tweetObj.attachmentUrl && <img src={tweetObj.attachmentUrl} alt={tweetObj.text} />}
              </h4>
              {
                isOwner &&
                (
                  <div className="tweet__actions">
                    <span onClick={onDeleteClick}>
                      <FontAwesomeIcon icon={faTrash} />
                    </span>
                    <span onClick={toggleEditing}>
                      <FontAwesomeIcon icon={faPencilAlt} />
                    </span>
                  </div>
                )
              }
            </>)
      }
    </div>
  )
}

export default Tweet;