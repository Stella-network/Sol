CREATE TABLE admin_sessions (
  id INT unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
  admin_user_id INT unsigned NOT NULL,
  token TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX admin_user_id_index (admin_user_id),
  FOREIGN KEY (admin_user_id) REFERENCES admin_users(id)
);
