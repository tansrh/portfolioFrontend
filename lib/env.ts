// Next.js automatically loads environment variables prefixed with NEXT_PUBLIC_ for frontend use.
class Env {
    static BACKEND_URL: string = process.env.NEXT_PUBLIC_BACKEND_APP_URL!;
    static APP_URL: string = process.env.NEXT_PUBLIC_APP_URL!;
}
export default Env;