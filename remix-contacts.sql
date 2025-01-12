-- Active: 1705566055231@@127.0.0.1@3306@remix_contacts
CREATE DATABASE IF NOT EXISTS remix_contacts;

USE remix_contacts;

CREATE TABLE contacts (
    _id INT PRIMARY KEY AUTO_INCREMENT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    avatar VARCHAR(255),
    first VARCHAR(50),
    last VARCHAR(50),
    twitter VARCHAR(50),
    favorite BOOLEAN DEFAULT FALSE
);

INSERT INTO contacts (avatar, first, last, twitter)
VALUES
    ('https://sessionize.com/image/df38-400o400o2-JwbChVUj6V7DwZMc9vJEHc.jpg', 'Alex', 'Anderson', '@ralex1993'),
    ('https://sessionize.com/image/c8c3-400o400o2-PR5UsgApAVEADZRixV4H8e.jpeg', 'Alexandra', 'Spalato', '@alexadark'),
    ('https://sessionize.com/image/eec1-400o400o2-HkvWKLFqecmFxLwqR9KMRw.jpg', 'Andre', 'Landgraf', '@AndreLandgraf94'),
    ('https://sessionize.com/image/2694-400o400o2-MYYTsnszbLKTzyqJV17w2q.png', 'Andrew', 'Petersen', NULL),
    ('https://sessionize.com/image/fcda-400o400o2-XiYRtKK5Dvng5AeyC8PiUA.png', 'Arisa', 'Fukuzaki', '@arisa_dev'),
    ('https://sessionize.com/image/5636-400o400o2-TWgi8vELMFoB3hB9uPw62d.jpg', 'Ashley', 'Narcisse', '@_darkfadr'),
    ('https://sessionize.com/image/fb82-400o400o2-LbvwhTVMrYLDdN3z4iEFMp.jpeg', 'Brandon', 'Kish', NULL),
    ('https://sessionize.com/image/cef7-400o400o2-KBZUydbjfkfGACQmjbHEvX.jpeg', 'Brian', 'Lee', '@brian_dlee'),
    ('https://sessionize.com/image/820b-400o400o2-Ja1KDrBAu5NzYTPLSC3GW8.jpg', 'Brooks', 'Lybrand', '@BrooksLybrand'),
    ('https://sessionize.com/image/262f-400o400o2-UBPQueK3fayaCmsyUc1Ljf.jpg', 'Cameron', 'Matheson', '@cmatheson'),
    ('https://sessionize.com/image/7594-400o400o2-hWtdCjbdFdLgE2vEXBJtyo.jpg', 'Cat', 'Johnson', NULL),
    ('https://sessionize.com/image/b07e-400o400o2-KgNRF3S9sD5ZR4UsG7hG4g.jpg', 'Christopher', 'Chedeau', '@Vjeux'),
    ('https://sessionize.com/image/30f1-400o400o2-wJBdJ6sFayjKmJycYKoHSe.jpg', 'Clifford', 'Fajardo', '@cliffordfajard0'),
    ('https://sessionize.com/image/6aeb-400o400o2-Q5tAiuzKGgzSje9ZsK3Yu5.JPG', 'Edmund', 'Hung', '@_edmundhung'),
    ('https://sessionize.com/image/6faa-400o400o2-amseBRDkdg7wSK5tjsFDiG.jpg', 'Erick', 'Tamayo', '@ericktamayo'),
    ('https://sessionize.com/image/08be-400o400o2-WtYGFFR1ZUJHL9tKyVBNPV.jpg', 'Giovanni', 'Benussi', '@giovannibenussi'),
    ('https://sessionize.com/image/1940-400o400o2-Enh9dnYmrLYhJSTTPSw3MH.jpg', 'Glenn', 'Reyes', '@glnnrys'),
    ('https://sessionize.com/image/f814-400o400o2-n2ua5nM9qwZA2hiGdr1T7N.jpg', 'Igor', 'Minar', '@IgorMinar'),
    ('https://sessionize.com/image/6644-400o400o2-aHnGHb5Pdu3D32MbfrnQbj.jpg', 'Jon', 'Jensen', '@jenseng'),
    ('https://sessionize.com/image/5578-400o400o2-BMT43t5kd2U1XstaNnM6Ax.jpg', 'Kent C.', 'Dodds', '@kentcdodds'),
    ('https://sessionize.com/image/fd45-400o400o2-fw91uCdGU9hFP334dnyVCr.jpg', 'Michael', 'Jackson', NULL),
    ('https://sessionize.com/image/c73a-400o400o2-4MTaTq6ftC15hqwtqUJmTC.jpg', 'Monica', 'Powell', '@indigitalcolor'),
    ('https://sessionize.com/image/c9d5-400o400o2-Sri5qnQmscaJXVB8m3VBgf.jpg', 'Nevi', 'Shah', '@nevikashah'),
    ('https://sessionize.com/image/d14d-400o400o2-pyB229HyFPCnUcZhHf3kWS.png', 'Oscar', 'Newman', '@__oscarnewman'),
    ('https://sessionize.com/image/feba-400o400o2-R4GE7eqegJNFf3cQ567obs.jpg', 'Paul', 'Bratslavsky', '@codingthirty'),
    ('https://sessionize.com/image/c315-400o400o2-spjM5A6VVfVNnQsuwvX3DY.jpg', 'Pedro', 'Cattori', '@pcattori'),
    ('https://sessionize.com/image/9273-400o400o2-3tyrUE3HjsCHJLU5aUJCja.jpg', 'Ryan', 'Florence', NULL),
    ('https://sessionize.com/image/907a-400o400o2-9TM2CCmvrw6ttmJiTw4Lz8.jpg', 'Scott', 'Smerchek', '@smerchek'),
    ('https://sessionize.com/image/f83b-400o400o2-Pyw3chmeHMxGsNoj3nQmWU.jpg', 'Sean', 'McQuaid', '@SeanMcQuaidCode'),
    ('https://sessionize.com/image/a9fc-400o400o2-JHBnWZRoxp7QX74Hdac7AZ.jpg', 'Shane', 'Walker', '@swalker326'),
    ('https://sessionize.com/image/124e-400o400o2-wHVdAuNaxi8KJrgtN3ZKci.jpg', 'Shruti', 'Kapoor', '@shrutikapoor08');
