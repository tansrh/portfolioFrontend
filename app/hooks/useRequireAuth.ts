import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation"; 

export function useRequireAuth() {
  const user = useSelector((state: any) => state.auth?.user);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace("/signin");
    }
  }, [user, router]);
}