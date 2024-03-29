import { useState, useEffect } from "react";
import {
  useUser,
  useSupabaseClient,
  Session,
} from "@supabase/auth-helpers-react";
import Profiles from "@/interfaces/profile";
import supabase from "@/utils/supabase";
import Router from "next/router";
import { IndexLayout } from "@/layout";
import { toast } from "react-toastify";

export default function Account({ session }: { session: Session }) {
  const user = useUser();
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState<Profiles["username"]>();
  const [website, setWebsite] = useState<Profiles["website"]>();
  const [avatar_url, setAvatarUrl] = useState<Profiles["avatar_url"]>();

  useEffect(() => {
    getProfile();
  }, [session]);

  async function getProfile() {
    try {
      setLoading(true);
      if (!user) throw new Error("No user");

      let { data, error, status } = await supabase
        .from("profiles")
        .select(`username, website, avatar_url`)
        .eq("id", user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.username);
        setWebsite(data.website);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      toast.error("Error loading user data!")
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile({
    username,
    website,
    avatar_url,
  }: {
    username: Profiles["username"];
    website: Profiles["website"];
    avatar_url: Profiles["avatar_url"];
  }) {
    try {
      setLoading(true);
      if (!user) throw new Error("No user");

      const updates = {
        id: user.id,
        username,
        website,
        avatar_url,
        updated_at: new Date().toISOString(),
      };

      let { error } = await supabase.from("profiles").upsert(updates);
      if (error) throw error;
      Router.push("/");
    } catch (error) {
      toast.error("Error updating the data!")
    } finally {
      setLoading(false);
    }
  }

  return (
    <IndexLayout>
      <div className="container" style={{ padding: "50px 0 100px 0" }}>
        <h1 className="text-center text-white">My account</h1>
        <div className="form-widget">
          <div>
            <label htmlFor="email">Email</label>
            <input id="email" type="text" value={session.user.email} disabled />
          </div>
          <div>
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              value={username || ""}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="website">Website</label>
            <input
              id="website"
              type="website"
              value={website || ""}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </div>
          <div>
            <button
              className="button primary block"
              onClick={() => updateProfile({ username, website, avatar_url })}
              disabled={loading}
            >
              {loading ? "Loading ..." : "Update"}
            </button>
          </div>
          <div>
            <button
              className="button block"
              onClick={() => supabase.auth.signOut()}
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </IndexLayout>
  );
}
