-- Users table
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  two_factor_secret VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Platform integrations table
CREATE TABLE platform_integrations (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  platform VARCHAR(50) NOT NULL,
  access_token TEXT NOT NULL,
  refresh_token TEXT,
  expires_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE KEY unique_user_platform (user_id, platform)
);

-- Integration syncs table
CREATE TABLE integration_syncs (
  id INT PRIMARY KEY AUTO_INCREMENT,
  integration_id INT NOT NULL,
  last_sync_at TIMESTAMP,
  status VARCHAR(50) NOT NULL,
  error_message TEXT,
  FOREIGN KEY (integration_id) REFERENCES platform_integrations(id) ON DELETE CASCADE
);

-- Marketing data table
CREATE TABLE marketing_data (
  id INT PRIMARY KEY AUTO_INCREMENT,
  integration_id INT NOT NULL,
  data JSON NOT NULL,
  date_from DATE NOT NULL,
  date_to DATE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (integration_id) REFERENCES platform_integrations(id) ON DELETE CASCADE
);

-- Create indexes
CREATE INDEX idx_user_platform ON platform_integrations(user_id, platform);
CREATE INDEX idx_integration_sync ON integration_syncs(integration_id, last_sync_at);
CREATE INDEX idx_marketing_data_dates ON marketing_data(integration_id, date_from, date_to);