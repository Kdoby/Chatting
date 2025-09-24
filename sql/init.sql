//**************************************************************************
// Member

DROP TABLE if EXISTS member CASCADE;
CREATE TABLE member
(
    user_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    nickname VARCHAR(255) UNIQUE NOT NULL,
    refresh_token varchar(255),
    refresh_token_expiry DATETIME,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

DROP TABLE if EXISTS friendship CASCADE;
CREATE TABLE friendship
(
    friendship_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    requester_id BIGINT NOT NULL,   -- 요청 보낸 사람
    addressee_id BIGINT NOT NULL,   -- 요청 받은 사람(수신인)
    status ENUM('WAITING', 'ACCEPTED') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (requester_id) REFERENCES member(user_id),
    FOREIGN KEY (addressee_id) REFERENCES member(user_id),
    UNIQUE (requester_id, addressee_id)
);

//**************************************************************************
// Chat

DROP TABLE if EXISTS chat_room CASCADE;
CREATE TABLE chat_room
(
    room_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id bigint NOT NULL,
    room_name varchar(100) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES member(user_id)
);

DROP TABLE if EXISTS chat CASCADE;
CREATE TABLE chat
(
    chat_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    room_id BIGINT NOT NULL,    -- 어떤 채팅방의 메시지인지
    user_id BIGINT NOT NULL,    -- 메시지 보낸 사람
    message TEXT NOT NULL,
    message_type ENUM('CHAT', 'IMAGE', 'JOIN', 'LEAVE'),
    send_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (room_id) REFERENCES chat_room(room_id),
    FOREIGN KEY (user_id) REFERENCES member(user_id)
);

DROP TABLE if EXISTS chat_room_member CASCADE;
CREATE TABLE chat_room_member
(
    room_member_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    room_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    enter_time DATETIME,
    FOREIGN KEY (room_id) REFERENCES chat_room(room_id),
    FOREIGN KEY (user_id) REFERENCES member(user_id),
    UNIQUE (room_id, user_id)   -- 한 채팅방에 같은 유저 중복 방지
);

DROP TABLE if EXISTS chat_image CASCADE;
CREATE TABLE chat_image
(
    chat_image_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    room_id BIGINT NOT NULL,
    chat_id BIGINT NOT NULL,
    original_file_name varchar(255),
    stored_file_name varchar(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (room_id) REFERENCES chat_room(room_id),
    FOREIGN KEY (chat_id) REFERENCES chat(chat_id)
);

//**************************************************************************
// Archive

DROP TABLE if EXISTS archive CASCADE;
CREATE TABLE archive
(
    archive_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    room_id BIGINT NOT NULL,    -- 어떤 채팅방의 아카이브(게시물)인지
    thumbnail_id BIGINT NOT NULL,
    content TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (room_id) REFERENCES chat_room(room_id)
);

DROP TABLE if EXISTS archive_image CASCADE;
CREATE TABLE archive_image
(
    archive_image_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    archive_id BIGINT NOT NULL,
    chat_image_id BIGINT NOT NULL,
    is_thumbnail BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (archive_id) REFERENCES archive(archive_id),
    FOREIGN KEY (chat_image_id) REFERENCES chat_image(chat_image_id)
);