CREATE TABLE "battles" (
	"id" uuid PRIMARY KEY NOT NULL,
	"created_at" timestamp,
	"prelude" text NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"image_url" text NOT NULL,
	"video_url" text NOT NULL,
	"date" date NOT NULL,
	"latitude" integer NOT NULL,
	"longitude" integer NOT NULL,
	"army_one" jsonb NOT NULL,
	"army_two" jsonb NOT NULL,
	"result" text NOT NULL,
	"questions" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "commanders" (
	"id" uuid PRIMARY KEY NOT NULL,
	"created_at" timestamp,
	"full_name" text NOT NULL,
	"title" text NOT NULL,
	"loyalty" text NOT NULL,
	"loyalty_image_url" text NOT NULL,
	"image_url" text NOT NULL,
	"birth_date" date NOT NULL,
	"death_date" date NOT NULL,
	"birth_location" text NOT NULL,
	"bio" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY NOT NULL,
	"created_at" timestamp,
	"display_name" text NOT NULL,
	"email" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users_to_battles" (
	"user_id" uuid NOT NULL,
	"battle_id" uuid NOT NULL,
	"progress" integer,
	"status" text,
	CONSTRAINT "users_to_battles_user_id_battle_id_pk" PRIMARY KEY("user_id","battle_id")
);
--> statement-breakpoint
ALTER TABLE "users_to_battles" ADD CONSTRAINT "users_to_battles_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users_to_battles" ADD CONSTRAINT "users_to_battles_battle_id_battles_id_fk" FOREIGN KEY ("battle_id") REFERENCES "public"."battles"("id") ON DELETE no action ON UPDATE no action;