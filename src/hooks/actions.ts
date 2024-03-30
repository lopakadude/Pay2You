import { useDispatch } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import { authActions } from '../store/pay2u/auth.slice';
import { popupActions } from '../store/pay2u/popup.slice';
import { modalActions } from '../store/pay2u/modal.slice';
import { confirmActions } from '../store/pay2u/confirm.slice';
import { userActions } from '../store/pay2u/user.slice';
import { currentCardActions } from '../store/pay2u/myCard.slice';
import { coversActions } from '../store/pay2u/covers.slice';
import { currentCoverIdActions } from '../store/pay2u/coverCard.slice';

const actions = {
  ...authActions,
  ...popupActions,
  ...modalActions,
  ...confirmActions,
  ...userActions,
  ...currentCardActions,
  ...coversActions,
  ...currentCoverIdActions,
};

export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(actions, dispatch);
};
