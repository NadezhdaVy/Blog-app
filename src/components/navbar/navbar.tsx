import { Link, useNavigate } from 'react-router-dom';
import { Avatar } from 'antd';

import { useAppDispatch, useAppSelector } from '@/redux/store';
import { logIn, signUp, profile, newArticle } from '@/router/routePaths';
import { logOut } from '@/redux/slices/authSlice';

import styles from './navbar.module.scss';

function Navbar() {
  const { userInfo: user, userToken } = useAppSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const onLogOut = () => {
    localStorage.removeItem('token');
    dispatch(logOut());
    navigate(logIn);
  };

  let content;

  if (!userToken) {
    content = (
      <>
        <Link to={logIn}>Log in</Link>
        <Link className={styles.signUp} to={signUp}>
          Sign Up
        </Link>
      </>
    );
  } else {
    content = (
      <>
        <Link className={styles.createArticle} to={newArticle}>
          Create article
        </Link>
        <Link to={profile}>
          <div className={styles.personInfo}>
            <div className={styles.userName}>
              <div>{user.username}</div>
            </div>
            <Avatar onError={() => false} className={styles.avatar} src={user.image} size={42} />
          </div>
        </Link>
        <button type="button" className={styles.logOut} onClick={onLogOut}>
          Log out
        </button>
      </>
    );
  }

  return (
    <nav className={styles.nav}>
      <div className={styles.navContent}>
        <div className={styles.navLinks}>
          <Link to="/">Realworld Blog</Link>
          {content}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
