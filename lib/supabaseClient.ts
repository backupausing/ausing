import { createClient } from "@supabase/supabase-js";

// Recuperiamo le variabili o usiamo stringhe vuote come fallback
const envUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const envKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Controllo di sicurezza:
// Se durante la build le chiavi mancano, usiamo valori finti per evitare 
// l'errore "supabaseKey is required" che blocca il deploy.
// Ovviamente le chiamate al DB falliranno, ma il sito andrà online 
// e se le env vars su Vercel sono giuste, a runtime funzionerà tutto.

const supabaseUrl = envUrl || "https://placeholder.supabase.co";
const supabaseAnonKey = envKey || "placeholder-key";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
