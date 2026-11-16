import { createClient } from '@supabase/supabase-js';
const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
const client = url && key ? createClient(url, key, { auth: { persistSession: false } }) : null;
export const isAuditConfigured = Boolean(client);
export async function publishPrediction(row) {
  if (!client) throw new Error('Supabase is not configured');
  const payload = { fixture_id:String(row.id), league:row.league, home_team:row.home, away_team:row.away, kickoff:row.kickoff, logged_at:row.loggedAt, model_version:row.model, p_home:row.p[0], p_draw:row.p[1], p_away:row.p[2], input_home_xg:row.hxg, input_away_xg:row.axg };
  const canonical = JSON.stringify(payload);
  payload.audit_hash = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(canonical)).then(buf => Array.from(new Uint8Array(buf), b => b.toString(16).padStart(2,'0')).join(''));
  const { error } = await client.from('predictions').insert(payload);
  if (error) throw error;
}
export async function fetchPublicPredictions() {
  if (!client) return [];
  const { data, error } = await client.from('predictions').select('id,fixture_id,logged_at,league,home_team,away_team,model_version,audit_hash').order('logged_at', { ascending:false }).limit(500);
  if (error) throw error;
  return data || [];
}
