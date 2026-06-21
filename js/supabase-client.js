import { SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY } from "./config.js";

export const isSupabaseConfigured =
  SUPABASE_URL.startsWith("https://") &&
  SUPABASE_URL.includes(".supabase.co") &&
  SUPABASE_PUBLISHABLE_KEY.startsWith("sb_publishable_");

export const supabaseClient = isSupabaseConfigured
  ? window.supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY)
  : null;

export async function getGameId(gameSlug) {
  if (!supabaseClient) return null;
  const { data, error } = await supabaseClient.from("games").select("id").eq("game_slug", gameSlug).single();
  if (error) { console.warn("getGameId error", error); return null; }
  return data?.id || null;
}

export async function getSceneId(gameId, sceneNo) {
  if (!supabaseClient || !gameId) return null;
  const { data, error } = await supabaseClient.from("game_scenes").select("id").eq("game_id", gameId).eq("scene_no", sceneNo).single();
  if (error) { console.warn("getSceneId error", error); return null; }
  return data?.id || null;
}

export async function saveScoreOnline({ gameSlug, sceneNo, playerName, score, correct, total, stars, xp, coins }) {
  if (!supabaseClient) return { ok: false, reason: "Supabase not configured" };
  try {
    const gameId = await getGameId(gameSlug);
    const sceneId = await getSceneId(gameId, sceneNo);
    const { error } = await supabaseClient.from("scores").insert({
      player_name: playerName || "Player",
      game_id: gameId,
      scene_id: sceneId,
      score: score || 0,
      correct: correct || 0,
      total: total || 0,
      stars: stars || 0,
      xp: xp || 0,
      coins: coins || 0
    });
    if (error) throw error;
    return { ok: true };
  } catch (error) {
    console.warn("saveScoreOnline error", error);
    return { ok: false, reason: error.message || String(error) };
  }
}

export async function loadLeaderboard(limit = 20) {
  if (!supabaseClient) return [];
  const { data, error } = await supabaseClient.from("leaderboard_scores")
    .select("player_name,game_name,scene_name,score,correct,total,stars,xp,coins,created_at")
    .order("score", { ascending: false })
    .limit(limit);
  if (error) { console.warn("loadLeaderboard error", error); return []; }
  return data || [];
}
