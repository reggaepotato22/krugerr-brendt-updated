-- Users Table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('admin', 'user') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Properties Table
CREATE TABLE properties (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(15, 2),
    currency VARCHAR(10) DEFAULT 'KES',
    location VARCHAR(255),
    type ENUM('Sale', 'Rent'),
    status ENUM('available', 'sold', 'rented') DEFAULT 'available',
    amenities JSON, -- Stored as JSON array
    beds INT,
    baths INT,
    sqft INT,
    coords_lat DECIMAL(10, 8),
    coords_lng DECIMAL(11, 8),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Property Images Table
CREATE TABLE property_images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    property_id INT,
    image_url VARCHAR(255),
    FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE
);

-- Inquiries Table
CREATE TABLE inquiries (
    id INT AUTO_INCREMENT PRIMARY KEY,
    property_id INT NULL,
    customer_name VARCHAR(255),
    email VARCHAR(255),
    message TEXT,
    status ENUM('new', 'contacted', 'closed') DEFAULT 'new',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE SET NULL
);

-- Default Admin User (Password: admin123)
-- Hash generated using PHP password_hash('admin123', PASSWORD_DEFAULT)
INSERT INTO users (email, password_hash, role) VALUES 
('admin@krugerrbrendt.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin');
