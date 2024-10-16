CREATE TABLE sessions (
  id INT unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
  user_id INT unsigned NOT NULL,
  token TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX user_id_index (user_id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);
