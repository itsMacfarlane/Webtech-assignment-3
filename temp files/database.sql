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

INSERT INTO Users VALUES
	(1618309599882, "snorrit", "123", "Jorrit Koerts");
	
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
	type text NOT NULL,
	statement text NOT NULL,
	correctAnswer text NOT NULL,
	CONSTRAINT questions_fk_quizID FOREIGN KEY (quizID) 
		REFERENCES Quizes(quizID));

CREATE TABLE Answers(
	answerID integer PRIMARY KEY,
	questionID integer NOT NULL,
	answer text NOT NULL,
	CONSTRAINT answers_fk_questionID FOREIGN KEY (questionID) 
		REFERENCES Questions(questionID));

INSERT INTO Topics VALUES
	(001, "History", "desc 1"),
	(002, "Structure", "desc 2");

INSERT INTO Quizes VALUES
	(101, 001, "History 1"),
	(102, 001, "History 2"),
	(103, 002, "Structure 1"),
	(104, 002, "Structure 2");

INSERT INTO Questions VALUES
	(201, 101, "History quiz 1 question 1", "type 1", "statement 1", "cor. ans. 1"),
	(202, 101, "History quiz 1 question 2", "type 2", "statement 2", "cor. ans. 2"),
	(203, 101, "History quiz 1 question 3", "type 3", "statement 3", "cor. ans. 3"),
	(204, 102, "History quiz 2 question 1", "type 4", "statement 4", "cor. ans. 4"),
	(205, 102, "History quiz 2 question 2", "type 5", "statement 5", "cor. ans. 5"),
	(206, 102, "History quiz 2 question 3", "type 6", "statement 6", "cor. ans. 6"),
	(207, 103, "History quiz 3 question 1", "type 7", "statement 7", "cor. ans. 7"),
	(208, 103, "History quiz 3 question 2", "type 8", "statement 8", "cor. ans. 8"),
	(209, 103, "History quiz 3 question 3", "type 9", "statement 9", "cor. ans. 9"),
	(210, 104, "History quiz 4 question 1", "type 10", "statement 10", "cor. ans. 10"),
	(211, 104, "History quiz 4 question 2", "type 11", "statement 11", "cor. ans. 11"),
	(212, 104, "History quiz 4 question 3", "type 12", "statement 12", "cor. ans. 12");
