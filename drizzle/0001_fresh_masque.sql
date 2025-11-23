CREATE TABLE "users" (
	"id" varchar(255),
	"name" varchar(255),
	"email" varchar(255) NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
