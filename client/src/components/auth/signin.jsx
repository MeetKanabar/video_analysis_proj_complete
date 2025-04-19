import { SignIn } from "@clerk/clerk-react";

export default function Signin() {
    return (
        <section className="min-h-svh flex justify-center items-center">
            <SignIn />
        </section>
    );
}
