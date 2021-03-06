interface UserData {
  avatar_url?: string | null;
  bio?: string | null;
  blog?: string | null;
  company?: null | null;
  created_at?: string | null;
  email?: null | string;
  events_url?: string | null;
  followers?: number;
  followers_url?: string | null;
  following?: number;
  following_url?: string | null;
  gists_url?: string | null;
  gravatar_id?: '';
  hireable?: null;
  html_url?: string;
  id?: number;
  location?: string;
  login?: string;
  name?: string;
  node_id?: string;
  organizations_url?: string | null;
  public_gists?: 0;
  public_repos?: 58;
  received_events_url?: string | null;
  repos_url?: string | null;
  site_admin?: false;
  starred_url?: string | null;
  subscriptions_url?: string | null;
  twitter_username?: null | string;
  type?: 'User';
  updated_at?: Date;
  url?: string | null;
}

export type { UserData };
