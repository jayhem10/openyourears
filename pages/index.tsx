import Main from "@/components/Main";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import {
  useSession,
  useSessionContext,
  useSupabaseClient,
} from "@supabase/auth-helpers-react";
import { IndexLayout } from "@/layout";

type Props = {};

function Home({}: Props) {
  const session = useSession();
  const supabase = useSupabaseClient();
  const context = useSessionContext();

  return (
    <>
      {!session && !context.isLoading && (
        <>
          <IndexLayout>
            <div className="container " style={{ padding: "50px 0 100px 0" }}>
              <Auth
                providers={["google"]}
                supabaseClient={supabase}
                appearance={{ theme: ThemeSupa }}
                theme="dark"
              />
            </div>
          </IndexLayout>
        </>
      )}
      {session && !context.isLoading && (
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
