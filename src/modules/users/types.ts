//drizzle postgres instance always returns strings for dates
export interface ClientUser {
  id: string;
  created_at: string;
  display_name: string;
  email: string;
}
