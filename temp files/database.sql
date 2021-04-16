-- 	Topic 1
-- 		Quiz 1
-- 			Question 1-3
-- 		Quiz 2
-- 			Question 4-6
-- 	Topic 2
-- 		Quiz 3
-- 			Question 7-9
-- 		Quiz 4
-- 			Question 10-12

CREATE TABLE Users(
	userID integer PRIMARY KEY NOT NULL,
	username text NOT NULL,
	password text NOT NULL,
	fullname text NOT NULL);
	
CREATE TABLE Topics(
	topicID integer PRIMARY KEY NOT NULL,
	title text NOT NULL,
	description text NOT NULL);

CREATE TABLE Quizes(
	quizID integer PRIMARY KEY NOT NULL,
	topicID integer NOT NULL,
	title text NOT NULL,
	CONSTRAINT quizes_fk_topicID FOREIGN KEY (topicID) 
		REFERENCES Topics(topicID));

CREATE TABLE Questions(
	questionID integer PRIMARY KEY NOT NULL,
	quizID integer NOT NULL,
	title text NOT NULL,
	type text NOT NULL,			-- 'M' for multiple choice, 'O' for open question, 'S' for select question
	statement text NOT NULL,	-- ______ for blank
	correctAnswer text NOT NULL,
	CONSTRAINT questions_fk_quizID FOREIGN KEY (quizID) 
		REFERENCES Quizes(quizID));

CREATE TABLE Answers(
	answerID integer PRIMARY KEY,
	questionID integer NOT NULL,
	answer text NOT NULL,
	CONSTRAINT answers_fk_questionID FOREIGN KEY (questionID) 
		REFERENCES Questions(questionID));

INSERT INTO Users VALUES
	(1618309599882, "snorrit", "123", "Jorrit Koerts");

INSERT INTO Topics VALUES
	(101, "History", "The history of html"),
	(102, "Structure", "The structure of a html file");

INSERT INTO Quizes VALUES
	(201, 101, "History 1"),
	(202, 101, "History 2"),
	(203, 102, "Structure 1"),
	(204, 102, "Structure 2");

INSERT INTO Questions VALUES
	(301, 201, "History quiz 1 question 1", "O", "In January of 2000, ______ became a standard together with HTML 4.01.", "XHTML"),
	(302, 201, "History quiz 1 question 2", "M", "In which country was the World Wide Web invented?", "Switzerland"),
	(303, 201, "History quiz 1 question 3", "S", "What does the H in HTML stand for?", "Hyper"),
	(304, 202, "History quiz 2 question 1", "M", "What is the current version of HTML?", "HTML 5"),
	(305, 202, "History quiz 2 question 2", "O", "______ is used to style a webpage.", "css"),
	(306, 202, "History quiz 2 question 3", "S", "What does the M in HTML stand for?", "Markup"),
	(307, 203, "Structure quiz 3 question 1", "M", "What is the root level tag of an html document?", "<html>"),
	(308, 203, "Structure quiz 3 question 2", "O", "<______>, this tag is used to create a navigation.", "nav"),
	(309, 203, "Structure quiz 3 question 3", "O", "To create a sidebar we use <______>.", "aside"),
	(310, 204, "Structure quiz 4 question 1", "S", "With what tag must a html document start?", "<!DOCTYPE html"),
	(311, 204, "Structure quiz 4 question 2", "M", "What is de tag <head> used for?", "To define metadata"),
	(312, 204, "Structure quiz 4 question 3", "O", "<______> is the parent tag of <body>", "html");

INSERT INTO Answers VALUES
	(401, 302, "France"),
	(402, 302, "Switzerland"),
	(403, 302, "United Kingdom"),
	(404, 302, "United States"),
	(405, 303, "Hyper"),
	(406, 303, "Hard"),
	(407, 303, "Hyper"),
	(408, 303, "Handy"),
	(409, 303, "Historic"),
	(410, 303, "Horror"),
	(411, 303, "Hardware"),
	(412, 304, "HTML 4"),
	(413, 304, "HTML 5"),
	(414, 304, "HTML 6"),
	(415, 304, "XHTML"),
	(416, 306, "Markup"),
	(417, 306, "Machine"),
	(418, 306, "Main"),
	(419, 306, "Minimalistic"),
	(420, 306, "Manual"),
	(421, 306, "Mild"),
	(422, 307, "<head>"),
	(423, 307, "<html>"),
	(424, 307, "<!DOCTYPE html>"),
	(425, 307, "<body>"),
	(426, 310, "<html>"),
	(427, 310, "<!DOCTYPE html>"),
	(428, 310, "<!DOC html>"),
	(429, 311, "To define metadata"),
	(430, 311, "To create a header"),
	(431, 311, "To create response headers"),
	(432, 311, "To give a title to an article");




