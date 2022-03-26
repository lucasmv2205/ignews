import { useState } from "react";
import { FaGithub } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import styles from "./styles.module.scss";
import { signIn, useSession, signOut } from "next-auth/react"

export function SignInbutton() {
  const { data: session } = useSession()

  console.log(session)

  return session ? (
    <button onClick={() => signOut()} className={styles.SignInButton} type="button">
      <FaGithub color="#04d361" />
      {session.user.name}
      <FiX color="#737380" className={styles.closeIcon} />
    </button>
  ) : ( 
    <button onClick={() => signIn('github')} className={styles.SignInButton} type="button">
      <FaGithub color="#eba417" />
      Sign in with Github
    </button>
  );
}
