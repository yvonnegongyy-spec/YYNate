
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.warn('Supabase credentials missing. Check .env.local');
}

export const supabase = createClient(supabaseUrl || '', supabaseKey || '');

import { Venue, Session } from '../types';

export const getVenues = async (): Promise<Venue[]> => {
    const { data, error } = await supabase
        .from('venues')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching venues:', error);
        return [];
    }

    return (data || []).map((v: any) => ({
        id: v.id,
        name: v.name,
        distance: v.distance || '',
        action: v.action || '',
        buyIn: v.buy_in || '',
        status: v.status || '',
        tables: v.tables || 0,
        imageUrl: v.image_url || '',
        isTopChoice: v.is_top_choice || false
    }));
};

// DEMO USER ID for testing/anonymous usage
const DEMO_USER_ID = '00000000-0000-0000-0000-000000000000';

export const getSessions = async (userId: string = DEMO_USER_ID): Promise<Session[]> => {
    const { data, error } = await supabase
        .from('sessions')
        .select('*')
        .eq('user_id', userId) // Filter by USER ID
        .order('date', { ascending: false });

    if (error) {
        console.error('Error fetching sessions:', error);
        return [];
    }

    return (data || []).map((s: any) => ({
        id: s.id,
        venue: s.venue,
        game: s.game,
        duration: s.duration || '',
        profit: Number(s.profit),
        date: new Date(s.date).toLocaleDateString(),
        isLive: s.is_live,
        buyIn: s.buy_in ? Number(s.buy_in) : undefined,
        cashOut: s.cash_out ? Number(s.cash_out) : undefined,
    }));
};

export const createSession = async (session: Omit<Session, 'id'>, userId: string = DEMO_USER_ID): Promise<Session | null> => {
    // 1. Convert to DB format
    const dbSession = {
        user_id: userId, // Use Authorization ID or Demo ID
        venue: session.venue,
        game: session.game,
        profit: session.profit,
        duration: session.duration,
        date: new Date().toISOString(), // Use current time for new sessions
        is_live: session.isLive || false,
    };

    const { data, error } = await supabase
        .from('sessions')
        .insert([dbSession])
        .select()
        .single();

    if (error) {
        console.error('Error creating session:', error);
        return null; // Return null on error
    }

    // 2. Convert back to App format
    return {
        id: data.id,
        venue: data.venue,
        game: data.game,
        duration: data.duration,
        profit: Number(data.profit),
        date: new Date(data.date).toLocaleDateString(),
        isLive: data.is_live
    };
};
