require('dotenv').config();

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://szluxnneifgechhkyhbr.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;

//LEFT FOR LEARNING PURPOSE