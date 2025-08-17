'use client';
import { Provider, useSelector } from 'react-redux';
import store, { useAppDispatch } from '@/store/store';
import { useEffect } from 'react';
import { autoLoginThunk } from '@/store/auth/authThunks';
import { usePathname } from 'next/navigation';

function AutoLogin() {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  useEffect(() => {
    if(!pathname.startsWith('/u')){
    dispatch(autoLoginThunk());}
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