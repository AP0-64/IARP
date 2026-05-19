CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    username VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE characters (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    name VARCHAR(255) NOT NULL,
    system_prompt TEXT,
    description_ia TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE conversations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    user_id UUID REFERENCES users(id) NOT NULL,
    character_id UUID REFERENCES characters(id) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    conversation_id UUID REFERENCES conversations(id) NOT NULL,
    role_ia ENUM('user', 'assistant') NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);