CREATE TABLE "users" (
	"user_id" serial PRIMARY KEY NOT NULL,
	"user_uuid" uuid DEFAULT gen_random_uuid() NOT NULL,
	"user_email" text NOT NULL,
	"user_name" text NOT NULL,
	"user_password" text NOT NULL,
	"user_status" smallint DEFAULT 1 NOT NULL,
	"user_level" smallint DEFAULT 3 NOT NULL,
	"user_created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"user_updated_at" timestamp with time zone,
	"user_deleted_at" timestamp with time zone,
	CONSTRAINT "users_user_uuid_unique" UNIQUE("user_uuid"),
	CONSTRAINT "users_user_email_unique" UNIQUE("user_email")
);
