import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { goBack } from 'connected-react-router';
import { auth } from '../../services/firebase';
import Btn from '../Btn/Btn';

import './Profile.css';

const Profile = (props) => {
  const dispatch = useDispatch();
  const email = useSelector((state) => state.userReducer.userEmail);
  const onClickHandler = useCallback(() => {
    dispatch(goBack());
  }, [dispatch]);

  const logOut = () => {
    auth().signOut();
  };

  return (
    <div className={`Profile ${props.isOpen ? 'open' : ''}`}>
      Current user: {email}
      <br />
      <Btn handler={logOut} title="LogOut" />
      <Btn handler={() => onClickHandler(dispatch)} title="Close" />
    </div>
  );
};

export default Profile;
