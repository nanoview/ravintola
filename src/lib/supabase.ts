
import { createClient } from '@supabase/supabase-js';

// Use the values from src/integrations/supabase/client.ts
const supabaseUrl = "https://vuzemamgxyzahsuekumb.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ1emVtYW1neHl6YWhzdWVrdW1iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYyODIxNDgsImV4cCI6MjA2MTg1ODE0OH0.cwubAIvc0okDTE1mjBDeDOc06qMvDQNtj3uHs43j194";

// Supabase client is initialized with the correct URL and key
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

console.log('Supabase client initialized');