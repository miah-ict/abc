-- Enable pgcrypto extension for UUID generation if needed
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Table 1: Users
CREATE TABLE IF NOT EXISTS users (
  id VARCHAR(100) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL DEFAULT 'DAYCARE_OWNER',
  phone VARCHAR(50),
  initials VARCHAR(10),
  verified BOOLEAN DEFAULT TRUE,
  status VARCHAR(50) DEFAULT 'Active',
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Table 2: Plans
CREATE TABLE IF NOT EXISTS plans (
  id VARCHAR(100) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  details TEXT,
  monthly_fee NUMERIC(10,2) DEFAULT 0,
  max_kids INT DEFAULT 100,
  max_staff INT DEFAULT 10,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Table 3: Centers
CREATE TABLE IF NOT EXISTS centers (
  id VARCHAR(100) PRIMARY KEY,
  code VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  is_hq BOOLEAN DEFAULT FALSE,
  address TEXT,
  district VARCHAR(100),
  owner_id VARCHAR(100) REFERENCES users(id) ON DELETE SET NULL,
  enrolled INT DEFAULT 0,
  capacity INT DEFAULT 100,
  teachers_count INT DEFAULT 0,
  staff_count INT DEFAULT 0,
  attendance_rate NUMERIC(5,2) DEFAULT 95.0,
  retention_rate NUMERIC(5,2) DEFAULT 95.0,
  quality_score INT DEFAULT 90,
  monthly_revenue NUMERIC(12,2) DEFAULT 0,
  trend_text VARCHAR(255),
  trend_type VARCHAR(50) DEFAULT 'positive',
  status VARCHAR(50) DEFAULT 'Active',
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Table 4: Subscriptions
CREATE TABLE IF NOT EXISTS subscriptions (
  id VARCHAR(100) PRIMARY KEY,
  center_id VARCHAR(100) REFERENCES centers(id) ON DELETE CASCADE,
  plan_id VARCHAR(100) REFERENCES plans(id) ON DELETE RESTRICT,
  user_id VARCHAR(100) REFERENCES users(id) ON DELETE CASCADE,
  status VARCHAR(50) DEFAULT 'Active',
  days_left INT DEFAULT 30,
  next_billing_date DATE,
  billing_method VARCHAR(100),
  auto_renew BOOLEAN DEFAULT TRUE,
  monthly_fee NUMERIC(10,2) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Table 5: Programs
CREATE TABLE IF NOT EXISTS programs (
  id VARCHAR(100) PRIMARY KEY,
  code VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  emoji VARCHAR(20) DEFAULT '📚',
  age_bracket VARCHAR(100),
  enrolled INT DEFAULT 0,
  capacity INT DEFAULT 100,
  ratio VARCHAR(50),
  ratio_type VARCHAR(100),
  tuition NUMERIC(10,2) DEFAULT 0,
  tuition_type VARCHAR(50) DEFAULT '/ mo',
  curriculum_status VARCHAR(255),
  status_type VARCHAR(50) DEFAULT 'active',
  category VARCHAR(100),
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Table 6: Center Programs Mapping
CREATE TABLE IF NOT EXISTS center_programs (
  center_id VARCHAR(100) REFERENCES centers(id) ON DELETE CASCADE,
  program_id VARCHAR(100) REFERENCES programs(id) ON DELETE CASCADE,
  PRIMARY KEY (center_id, program_id)
);

-- Table 7: Refresh Tokens
CREATE TABLE IF NOT EXISTS refresh_tokens (
  id VARCHAR(100) PRIMARY KEY,
  user_id VARCHAR(100) REFERENCES users(id) ON DELETE CASCADE,
  token TEXT NOT NULL UNIQUE,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Table 8: Audit Logs
CREATE TABLE IF NOT EXISTS audit_logs (
  id VARCHAR(100) PRIMARY KEY,
  user_id VARCHAR(100) REFERENCES users(id) ON DELETE SET NULL,
  user_name VARCHAR(255),
  action VARCHAR(255) NOT NULL,
  category VARCHAR(100) DEFAULT 'System',
  ip_address VARCHAR(50),
  timestamp TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  details JSONB DEFAULT '{}'::jsonb
);

-- Table 9: System Settings
CREATE TABLE IF NOT EXISTS system_settings (
  key VARCHAR(100) PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Table 10: System Backups
CREATE TABLE IF NOT EXISTS system_backups (
  id VARCHAR(100) PRIMARY KEY,
  filename VARCHAR(255) NOT NULL,
  size_mb NUMERIC(8,2) NOT NULL,
  type VARCHAR(50) DEFAULT 'Automated',
  status VARCHAR(50) DEFAULT 'Completed',
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);
