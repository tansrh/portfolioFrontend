import ResetPassword from "@/components/auth/ResetPassword";
import Loading from "@/components/common/Loading";
import { Suspense } from "react";

const ResetPasswordPage: React.FC = () => {
    return (
        <Suspense fallback={<Loading/>}>
        <div className="min-h-[70vh] flex items-center justify-center px-4">
            <ResetPassword />
        </div>
        </Suspense>
    );
}
export default ResetPasswordPage;