import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import Account from "@/components/Auth/Account";
import Navbar from "@/components/Navbar";


type Props = {};

export default function MyAccount({}: Props) {
  const session = useSession();
  const supabase = useSupabaseClient();
console.log("session",session)
  return (
    <>
        {!session ? (
          <div className="container" style={{ padding: "50px 0 100px 0" }}>
          <h1 className="text-center font-bold my-10">Open Your Ears</h1>
              <Auth
                providers={['google']}
                supabaseClient={supabase}
                appearance={{ theme: ThemeSupa }}
                theme="dark"
              />
          </div>
        ) : (
          <>
            <Navbar session={session}/>
            <Account session={session}/>
          </>
        )}
    </>
  );
}
