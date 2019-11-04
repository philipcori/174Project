-- drop tables
/*
DROP TABLE Attends;
DROP TABLE Assists;
DROP TABLE Survey;
DROP TABLE Section;
DROP TABLE Professor;
DROP TABLE TA;
DROP TABLE Student;

*/
-- create tables for entities
CREATE TABLE Professor
(
	professor_name varchar(50),
	professor_email varchar(50) PRIMARY KEY
);

CREATE TABLE Student
(
	student_id integer,
	student_email varchar(50),
	PRIMARY KEY(student_id, student_email)
);

CREATE TABLE TA
(
	ta_id integer PRIMARY KEY
);

CREATE TABLE Section
(
	section_id integer PRIMARY KEY,
	professor_email varchar(50),
	CONSTRAINT FK_Section_Professor FOREIGN KEY (professor_email) REFERENCES Professor(professor_email)
);

CREATE TABLE Survey
(
	survey_id integer PRIMARY KEY AUTO_INCREMENT,
	section_id integer,
	q_1a integer,
	q_1b integer,
	q_1c integer,
	q_1d integer,
	q_1e varchar(4000),
	q_1f varchar(4000),
	q_2a integer,
	q_2b integer,
	q_2c integer,
	q_2d integer,
	q_2e integer,
	q_2f varchar(4000),
	q_3a integer,
	q_3b integer,
	q_3c integer,
	q_3d varchar(4000),
	q_4a integer,
	q_4b integer,
	q_4c integer,
	q_5a varchar(4000),
	CONSTRAINT FK_Survey_Section FOREIGN KEY (section_id) REFERENCES Section(section_id)
);

CREATE TABLE Assists
(
	section_id integer,
	ta_id integer,
	CONSTRAINT FK_Assists_TA FOREIGN KEY (ta_id) REFERENCES TA(ta_id),
	CONSTRAINT FK_Assists_Section FOREIGN KEY (section_id) REFERENCES Section(section_id)
);

CREATE TABLE Attends
(
	section_id integer,
	student_id integer,
	CONSTRAINT FK_Attends_Section FOREIGN KEY (section_id) REFERENCES Section(section_id),
	CONSTRAINT FK_Attends_Student FOREIGN KEY (student_id) REFERENCES Student(student_id)
);

