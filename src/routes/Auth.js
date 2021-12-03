import { authService } from "myBase";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import React from "react";

const Auth = () => {
  const onSocialClick = async (event) => {
    const { target: { name } } = event;
    let provider;
    if (name === "google") {
      provider = new GoogleAuthProvider();
    } else if (name === "github") {
      provider = new GithubAuthProvider();
    }
    await signInWithPopup(authService, provider);
  }
  return (
    <div>
      <div>
        <button onClick={onSocialClick} name="google">Countinue with Google</button>
        <button onClick={onSocialClick} name="github">Countinue with Github</button>
      </div>
    </div>);
}
export default Auth;