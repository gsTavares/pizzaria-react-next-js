import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Login",
    description: "Comece agora e faça seu login!",
  };
  

export default function LoginLayout({ children }: { children: React.ReactNode }) {
    return (
        <section>
            {children}
        </section>
    );
}