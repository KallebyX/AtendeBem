-- AtendeBem Row Level Security (RLS)
-- Version 1.0 - Security Policies

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE procedures ENABLE ROW LEVEL SECURITY;
ALTER TABLE medical_certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE prescriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE exam_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE document_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Users: can only see and update their own profile
CREATE POLICY "Users can view own profile" ON users
    FOR SELECT USING (id = current_setting('app.current_user_id')::uuid);

CREATE POLICY "Users can update own profile" ON users
    FOR UPDATE USING (id = current_setting('app.current_user_id')::uuid);

-- Appointments: users can only see their own appointments
CREATE POLICY "Users can view own appointments" ON appointments
    FOR SELECT USING (user_id = current_setting('app.current_user_id')::uuid);

CREATE POLICY "Users can insert own appointments" ON appointments
    FOR INSERT WITH CHECK (user_id = current_setting('app.current_user_id')::uuid);

CREATE POLICY "Users can update own appointments" ON appointments
    FOR UPDATE USING (user_id = current_setting('app.current_user_id')::uuid);

CREATE POLICY "Users can delete own appointments" ON appointments
    FOR DELETE USING (user_id = current_setting('app.current_user_id')::uuid);

-- Procedures: users can only manage their own procedures
CREATE POLICY "Users can view own procedures" ON procedures
    FOR SELECT USING (user_id = current_setting('app.current_user_id')::uuid);

CREATE POLICY "Users can insert own procedures" ON procedures
    FOR INSERT WITH CHECK (user_id = current_setting('app.current_user_id')::uuid);

CREATE POLICY "Users can update own procedures" ON procedures
    FOR UPDATE USING (user_id = current_setting('app.current_user_id')::uuid);

CREATE POLICY "Users can delete own procedures" ON procedures
    FOR DELETE USING (user_id = current_setting('app.current_user_id')::uuid);

-- Medical Certificates
CREATE POLICY "Users can view own certificates" ON medical_certificates
    FOR SELECT USING (user_id = current_setting('app.current_user_id')::uuid);

CREATE POLICY "Users can insert own certificates" ON medical_certificates
    FOR INSERT WITH CHECK (user_id = current_setting('app.current_user_id')::uuid);

-- Prescriptions
CREATE POLICY "Users can view own prescriptions" ON prescriptions
    FOR SELECT USING (user_id = current_setting('app.current_user_id')::uuid);

CREATE POLICY "Users can insert own prescriptions" ON prescriptions
    FOR INSERT WITH CHECK (user_id = current_setting('app.current_user_id')::uuid);

-- Exam Requests
CREATE POLICY "Users can view own exam requests" ON exam_requests
    FOR SELECT USING (user_id = current_setting('app.current_user_id')::uuid);

CREATE POLICY "Users can insert own exam requests" ON exam_requests
    FOR INSERT WITH CHECK (user_id = current_setting('app.current_user_id')::uuid);

-- AI Conversations
CREATE POLICY "Users can view own conversations" ON ai_conversations
    FOR SELECT USING (user_id = current_setting('app.current_user_id')::uuid);

CREATE POLICY "Users can insert own conversations" ON ai_conversations
    FOR INSERT WITH CHECK (user_id = current_setting('app.current_user_id')::uuid);

CREATE POLICY "Users can update own conversations" ON ai_conversations
    FOR UPDATE USING (user_id = current_setting('app.current_user_id')::uuid);

CREATE POLICY "Users can delete own conversations" ON ai_conversations
    FOR DELETE USING (user_id = current_setting('app.current_user_id')::uuid);

-- AI Messages
CREATE POLICY "Users can view messages from own conversations" ON ai_messages
    FOR SELECT USING (
        conversation_id IN (
            SELECT id FROM ai_conversations 
            WHERE user_id = current_setting('app.current_user_id')::uuid
        )
    );

CREATE POLICY "Users can insert messages in own conversations" ON ai_messages
    FOR INSERT WITH CHECK (
        conversation_id IN (
            SELECT id FROM ai_conversations 
            WHERE user_id = current_setting('app.current_user_id')::uuid
        )
    );

-- Document Templates
CREATE POLICY "Users can view own templates" ON document_templates
    FOR SELECT USING (user_id = current_setting('app.current_user_id')::uuid);

CREATE POLICY "Users can insert own templates" ON document_templates
    FOR INSERT WITH CHECK (user_id = current_setting('app.current_user_id')::uuid);

CREATE POLICY "Users can update own templates" ON document_templates
    FOR UPDATE USING (user_id = current_setting('app.current_user_id')::uuid);

CREATE POLICY "Users can delete own templates" ON document_templates
    FOR DELETE USING (user_id = current_setting('app.current_user_id')::uuid);

-- User Settings
CREATE POLICY "Users can view own settings" ON user_settings
    FOR SELECT USING (user_id = current_setting('app.current_user_id')::uuid);

CREATE POLICY "Users can update own settings" ON user_settings
    FOR UPDATE USING (user_id = current_setting('app.current_user_id')::uuid);

CREATE POLICY "Users can insert own settings" ON user_settings
    FOR INSERT WITH CHECK (user_id = current_setting('app.current_user_id')::uuid);

-- Audit Logs: read-only for users
CREATE POLICY "Users can view own audit logs" ON audit_logs
    FOR SELECT USING (user_id = current_setting('app.current_user_id')::uuid);
