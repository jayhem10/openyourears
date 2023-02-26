import Main from "@/components/Main";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { IndexLayout } from "@/layout";

type Props = {};

 function Home({ }: Props) {
  const session = useSession();
  const supabase = useSupabaseClient();

  return (
    <>
      {!session ? (
        <>
        <IndexLayout>
          <div className="container " style={{ padding: "50px 0 100px 0" }}>
            <Auth
              providers={['google']}
              supabaseClient={supabase}
              appearance={{ theme: ThemeSupa }}
              theme="dark"
            />
          </div>
        </IndexLayout>
        </>

      ) : (
        <>
        <IndexLayout>
            <Main />
        </IndexLayout>
        </>
      )}
      
    </>
    
  );
}

export default Home;
