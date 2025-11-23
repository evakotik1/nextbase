ALTER TABLE "cart" DROP CONSTRAINT "cart_product_id_products_id_fk";
--> statement-breakpoint
ALTER TABLE "favorites" DROP CONSTRAINT "favorites_product_id_products_id_fk";
--> statement-breakpoint
ALTER TABLE "cart" ALTER COLUMN "id" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "cart" ALTER COLUMN "id" DROP IDENTITY;--> statement-breakpoint
ALTER TABLE "favorites" ALTER COLUMN "id" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "favorites" ALTER COLUMN "id" DROP IDENTITY;--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "id" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "id" DROP IDENTITY;--> statement-breakpoint
ALTER TABLE "cart" ADD COLUMN "productId" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "favorites" ADD COLUMN "productId" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "created_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "deleted_at" timestamp;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "deleted_at" timestamp;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "updated_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "cart" ADD CONSTRAINT "cart_productId_products_id_fk" FOREIGN KEY ("productId") REFERENCES "public"."products"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "favorites" ADD CONSTRAINT "favorites_productId_products_id_fk" FOREIGN KEY ("productId") REFERENCES "public"."products"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cart" DROP COLUMN "product_id";--> statement-breakpoint
ALTER TABLE "favorites" DROP COLUMN "product_id";