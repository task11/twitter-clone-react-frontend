import { getDownloadURL, ref, uploadString } from "@firebase/storage";
import { v4 as uuidv4 } from "uuid";
import React from "react";
import { addDoc, collection } from "@firebase/firestore";

const TweetFactory = ({ userObj }) => {
  const onSubmit = async (event) => {
    event.preventDefault();
    let attachmentURL = "";
    if (attachment !== "") {
      const attachmentRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
      const response = await uploadString(attachmentRef, attachment, "data_url");
      attachmentURL = await getDownloadURL(response.ref);
    }

    const tweetObj = {
      text: tweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentURL,
    }

    await addDoc(collection(dbService, "tweets"), tweetObj);
    setTweet("");
    setAttachment("");
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

  const onClearAttachment = () => setAttachment("");
  return (
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

  );

};
export default TweetFactory;