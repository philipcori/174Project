CREATE TABLE Survey
(
	survey_id integer PRIMARY KEY,
	q_1a integer,
	q_1b integer,
	q_1c integer,
	q_1d integer,
	q_1e varchar2(4000),
	q_1f varchar2(4000),
	q_2a integer,
	q_2b integer,
	q_2c integer,
	q_2d integer,
	q_2e integer,
	q_2f integer,
	q_2g varchar2(4000),
	q_3a integer,
	q_3b integer,
	q_3c integer,
	q_3d varchar2(4000),
	q_4a integer,
	q_4b integer,
	q_4c integer,
	q_5a varchar2(4000)
);

CREATE TABLE Professor
(
	email varchar(50) PRIMARY KEY
);

CREATE TABLE Section
(
	section_id integer PRIMARY KEY
);

CREATE TABLE TA
(
	ta_id integer PRIMARY KEY
);

CREATE TABLE Student
(
	student_id integer PRIMARY KEY

);