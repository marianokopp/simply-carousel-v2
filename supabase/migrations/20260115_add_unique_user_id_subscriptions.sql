-- Migration: add_unique_constraint_to_subscriptions_user_id
-- Agrega constraint UNIQUE a user_id para permitir upserts

ALTER TABLE subscriptions ADD CONSTRAINT subscriptions_user_id_key UNIQUE (user_id);
