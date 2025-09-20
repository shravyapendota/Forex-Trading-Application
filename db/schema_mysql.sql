-- MySQL schema for AlphaFxTrader
-- Use MySQL Workbench to import this file

CREATE DATABASE IF NOT EXISTS alpha_fx_trader;
USE alpha_fx_trader;

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Portfolios table
CREATE TABLE IF NOT EXISTS portfolios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  balance DECIMAL(18,4) NOT NULL DEFAULT 0.0,
  base_currency VARCHAR(10) NOT NULL DEFAULT 'USD',
  min_trade_amount DECIMAL(18,4) NOT NULL DEFAULT 100.0,
  total_profit DECIMAL(18,4) NOT NULL DEFAULT 0.0,
  today_profit DECIMAL(18,4) NOT NULL DEFAULT 0.0,
  open_positions INT NOT NULL DEFAULT 0,
  total_trades INT NOT NULL DEFAULT 0,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Trades table
CREATE TABLE IF NOT EXISTS trades (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  portfolio_id INT NOT NULL,
  trade_id VARCHAR(50) NOT NULL,
  timestamp DATETIME NOT NULL,
  pair VARCHAR(20) NOT NULL,
  type ENUM('BUY','SELL') NOT NULL,
  amount DECIMAL(18,4) NOT NULL,
  entry_price DECIMAL(18,8) NOT NULL,
  exit_price DECIMAL(18,8),
  status ENUM('OPEN','CLOSED','PENDING') NOT NULL DEFAULT 'OPEN',
  profit DECIMAL(18,4) NOT NULL DEFAULT 0.0,
  algorithm VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (portfolio_id) REFERENCES portfolios(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Settings table
CREATE TABLE IF NOT EXISTS settings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  key_name VARCHAR(100) NOT NULL,
  value_text VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Sample data
INSERT INTO users (username, email, password_hash) VALUES
('demo', 'demo@example.com', 'password-hash-placeholder');

INSERT INTO portfolios (user_id, balance, base_currency, min_trade_amount, total_profit, today_profit, open_positions, total_trades)
VALUES (1, 5000.00, 'USD', 100.00, 234.56, 45.23, 3, 127);

INSERT INTO trades (user_id, portfolio_id, trade_id, timestamp, pair, type, amount, entry_price, current_price, status, profit, algorithm)
VALUES
(1, 1, 'TXN001', '2024-01-20 14:30:15', 'EUR/USD', 'BUY', 10000.00, 1.0847, 1.0852, 'OPEN', 50.00, 'SMA'),
(1, 1, 'TXN002', '2024-01-20 14:25:30', 'GBP/USD', 'SELL', 5000.00, 1.2734, 1.2720, 'OPEN', 70.00, 'RSI');
