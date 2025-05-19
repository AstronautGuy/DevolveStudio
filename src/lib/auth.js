// lib/auth.js
import { supabase } from '/supabaseClient'; // Adjust the path if necessary

export const signUp = async (email, password) => {
    const { user, error } = await supabase.auth.signUp({ email, password });
    return { user, error };
};

export const signIn = async (email, password) => {
    const { user, error } = await supabase.auth.signIn({ email, password });
    return { user, error };
};

export const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
};