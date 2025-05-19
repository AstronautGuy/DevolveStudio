// supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hegsayxrwfseipitgyed.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhlZ3NheXhyd2ZzZWlwaXRneWVkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc2NjUwODksImV4cCI6MjA2MzI0MTA4OX0.0CkdkaN16jaWRrRJnj6JGmeUt4A9lK0siqv14XHL0oQ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);