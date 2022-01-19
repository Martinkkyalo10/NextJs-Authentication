import { useSession } from "next-auth/react";
import Link from "next/link";

import classes from "./main-navigation.module.css";

function MainNavigation() {
  const [session, loading] = useSession();
  return (
    <header className={classes.header}>
      <Link href="/">
        <a>
          <div className={classes.logo}>Next Auth</div>
        </a>
      </Link>
      <nav>
        <ul>
          {/* show login link when there is not active session or loading */}
          {!session &&
            !loading(
              <li>
                <Link href="/auth">Login</Link>
              </li>
            )}

          {/* profile only appears when there is an active session */}
          {session && (
            <li>
              <Link href="/profile">Profile</Link>
            </li>
          )}

          {/* only show logout when u have a session */}
          {session && (
            <li>
              <button>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
