-- ==========================================
-- SUPABASE SCHEMA FOR CMS Dr. Usha Chandra
-- Run this in the Supabase SQL Editor
-- ==========================================

CREATE TABLE IF NOT EXISTS public."Varnika_database_CMS" (
    appointment_id TEXT PRIMARY KEY,
    patient_id TEXT,
    name TEXT,
    age TEXT,
    gender TEXT,
    phone TEXT,
    address TEXT,
    symptoms TEXT,
    valid_till TEXT,
    visit_count NUMERIC DEFAULT 1,
    fee NUMERIC DEFAULT 400,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Note: No RLS is enabled here initially so that your anonymous client can insert directly. 
-- In a production environment, you may want to enable RLS and set policies.
