import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const fetchProducts = async () => {
    const { data, error } = await supabase
        .from('products')
        .select('*');

    if (error) {
        throw new Error(error.message);
    }

    return data;
};

export const fetchProductById = async (id: string) => {
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        throw new Error(error.message);
    }

    return data;
};

export const addUser = async (userData: any) => {
    const { data, error } = await supabase
        .from('users')
        .insert([userData]);

    if (error) {
        throw new Error(error.message);
    }

    return data;
};