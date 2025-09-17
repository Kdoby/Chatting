//**************************************************************************
// Member

ALTER TABLE member
ADD CONSTRAINT uq_member_nickname UNIQUE (nickname);

/* ALTER TABLE member
DROP INDEX uq_member_nickname; */

//**************************************************************************
// Chat

ALTER TABLE chat
ALTER COLUMN message SET NOT NULL;