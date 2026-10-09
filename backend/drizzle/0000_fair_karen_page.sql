CREATE TABLE "provider" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"category_id" text NOT NULL,
	"url" text NOT NULL,
	"description" text,
	"logo" text,
	"language" text
);
--> statement-breakpoint
CREATE TABLE "provider_category" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "provider" ADD CONSTRAINT "provider_category_id_provider_category_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."provider_category"("id") ON DELETE no action ON UPDATE no action;