'use client';
import { Provider, useSelector } from 'react-redux';
import store, { useAppDispatch } from '@/store/store';
import { useEffect } from 'react';
import { autoLoginThunk } from '@/store/auth/authThunks';

function AutoLogin() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(autoLoginThunk());
  }, [dispatch]);
  return null;
}

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <AutoLogin />
      {children}
    </Provider>
  );
}