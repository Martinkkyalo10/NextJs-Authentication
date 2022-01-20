// import { getSession } from "next-auth/react";
import ProfileForm from "./profile-form";
import classes from "./user-profile.module.css";
// import { useEffect, useState } from "react";

function UserProfile() {
  // // Redirect away if NOT auth
  // const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   getSession().then((session) => {
  //     // if no session nevigate away by changing url
  //     if (!session) {
  //       window.location.href = "/auth";
  //     } else {
  //       setIsLoading(false);
  //     }
  //   });
  // }, []);

  // if (isLoading) {
  //   return <p className={classes.profile}>Loading...</p>;
  // }

  // the client side code to protect routes is not longer required when getServerSideProps() is used on the page components

  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm />
    </section>
  );
}

export default UserProfile;
