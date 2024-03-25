import { useDispatch } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import { authActions } from '../store/pay2u/auth.slice';
import { popupActions } from '../store/pay2u/popup.slice';
import { modalActions } from '../store/pay2u/modal.slice';
import { confirmActions } from '../store/pay2u/confirm.slice';


const actions = {
  ...authActions,
  ...popupActions,
  ...modalActions,
  ...confirmActions
};

export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(actions, dispatch);
};
