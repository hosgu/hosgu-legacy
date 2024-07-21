CREATE TABLE IF NOT EXISTS "agent" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"businessId" uuid NOT NULL,
	"userId" uuid NOT NULL,
	"isCompany" boolean DEFAULT false,
	"commissionType" varchar(100) DEFAULT 'fixed',
	"highestCommissionWithoutOffer" integer DEFAULT 0,
	"highestCommissionWithOffer" integer DEFAULT 0,
	"lowestCommissionWithoutOffer" integer DEFAULT 0,
	"lowestCommissionWithOffer" integer DEFAULT 0,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "asr" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"amenities" jsonb DEFAULT '[]'::jsonb,
	"services" jsonb DEFAULT '[]'::jsonb,
	"rules" jsonb DEFAULT '[]'::jsonb,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "asset" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"roomId" uuid,
	"unitId" uuid,
	"assetType" varchar(100),
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "business" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userId" uuid NOT NULL,
	"name" varchar(255),
	"slug" varchar(255),
	"email" varchar(255),
	"phone" varchar(50),
	"priceRange" varchar(5),
	"website" varchar(200),
	"facebook" varchar(200),
	"instagram" varchar(200),
	"logo" varchar(255),
	"rating" integer,
	"addressLine1" varchar(255),
	"addressLine2" varchar(255),
	"city" varchar(255),
	"state" varchar(255),
	"country" varchar(255),
	"zipCode" varchar(20),
	"googleMapsUrl" text,
	"active" boolean DEFAULT false,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "cancellation" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"reservationId" uuid NOT NULL,
	"cancellationDate" varchar(20),
	"securityDepositReturned" integer DEFAULT 0,
	"securityDepositHeld" integer DEFAULT 0,
	"securityDepositFile" varchar(255),
	"reason" text DEFAULT '',
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "commission" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"agentId" uuid NOT NULL,
	"reservationId" uuid NOT NULL,
	"commission" integer DEFAULT 0,
	"isOffer" boolean DEFAULT false,
	"isPaid" boolean DEFAULT false,
	"paymentMethod" varchar(100),
	"reservationCost" integer DEFAULT 0,
	"month" varchar(20),
	"year" varchar(20),
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "employee" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"businessId" uuid NOT NULL,
	"designation" varchar(100),
	"fullName" varchar(200),
	"email" varchar(255),
	"phone" varchar(40),
	"salary" integer DEFAULT 0,
	"jobTitle" varchar(100),
	"photo" varchar(255),
	"addressLine1" varchar(255),
	"addressLine2" varchar(255),
	"city" varchar(255),
	"state" varchar(255),
	"country" varchar(255),
	"zipCode" varchar(20),
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "fee" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"cleaningFee" integer DEFAULT 0,
	"emergencyOfferFee" integer DEFAULT 0,
	"extraBedFee" integer DEFAULT 0,
	"extraGuestFee" integer DEFAULT 0,
	"highestFee" integer DEFAULT 0,
	"initialOfferFee" integer DEFAULT 0,
	"lowestFee" integer DEFAULT 0,
	"secondOfferFee" integer DEFAULT 0,
	"securityDepositFee" integer DEFAULT 0,
	"weekdayFee" integer DEFAULT 0,
	"weekendFee" integer DEFAULT 0,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "guest" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"businessId" uuid NOT NULL,
	"fullName" varchar(200),
	"email" varchar(255),
	"phone" varchar(40),
	"website" varchar(200),
	"facebook" varchar(200),
	"instagram" varchar(200),
	"gender" varchar(50),
	"birthday" varchar(20),
	"organization" varchar(50),
	"taxIdentifier" varchar(50),
	"notes" text,
	"photo" varchar(250),
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "housekeeping" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"businessId" uuid NOT NULL,
	"employeeId" uuid NOT NULL,
	"reservationId" uuid NOT NULL,
	"date" varchar(20),
	"time" varchar(20),
	"notes" text DEFAULT '',
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "invoice" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"businessId" uuid NOT NULL,
	"reservationId" uuid NOT NULL,
	"invoiceNumber" integer DEFAULT 0,
	"invoiceDate" varchar(20),
	"dueDate" varchar(20),
	"totalAmount" integer DEFAULT 0,
	"paidAmount" integer DEFAULT 0,
	"discount" integer DEFAULT 0,
	"status" varchar(20) DEFAULT 'pending',
	"paymentMethod" varchar(100),
	"paymentDate" varchar(20),
	"nights" integer DEFAULT 1,
	"nightPrice" integer DEFAULT 0,
	"cleaningFee" integer DEFAULT 0,
	"serviceFee" integer DEFAULT 0,
	"tax" integer DEFAULT 0,
	"currency" varchar(10) DEFAULT 'USD',
	"checkIn" varchar(20),
	"checkOut" varchar(20),
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "photo" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"propertyId" uuid NOT NULL,
	"url" varchar(255),
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "property" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"businessId" uuid NOT NULL,
	"asrId" uuid NOT NULL,
	"typeOfBuilding" varchar(50),
	"name" varchar(255),
	"slug" varchar(255),
	"description" text,
	"floors" integer,
	"rooms" integer,
	"generalRules" text,
	"safetyRules" text,
	"cancellationPolicy" text,
	"checkIn" varchar(50),
	"checkOut" varchar(50),
	"active" boolean DEFAULT false,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "reservation" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"guestId" uuid NOT NULL,
	"assetId" uuid NOT NULL,
	"startDate" varchar(20),
	"endDate" varchar(20),
	"nights" integer DEFAULT 0,
	"freeNights" integer DEFAULT 0,
	"occupancy" integer DEFAULT 0,
	"adults" integer DEFAULT 0,
	"children" integer DEFAULT 0,
	"infants" integer DEFAULT 0,
	"pets" integer DEFAULT 0,
	"extraOccupancy" integer DEFAULT 0,
	"pendingAmount" integer DEFAULT 0,
	"totalAmount" integer DEFAULT 0,
	"paidAmount" integer DEFAULT 0,
	"discount" integer DEFAULT 0,
	"taxes" integer DEFAULT 0,
	"cleaningFee" integer DEFAULT 0,
	"serviceFee" integer DEFAULT 0,
	"securityDeposit" integer DEFAULT 0,
	"securityDepositFile" varchar(255),
	"needCrib" boolean DEFAULT false,
	"isCancelled" boolean DEFAULT false,
	"isOffer" boolean DEFAULT false,
	"offerDetails" text DEFAULT '',
	"notes" text DEFAULT '',
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "room" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"propertyId" uuid NOT NULL,
	"feeId" uuid NOT NULL,
	"asrId" uuid NOT NULL,
	"floor" varchar(10) DEFAULT '0',
	"roomNumber" varchar(10) DEFAULT '0',
	"roomType" varchar(100),
	"maxGuests" integer DEFAULT 6,
	"bathrooms" integer,
	"cribs" integer DEFAULT 0,
	"kingSizeBeds" integer DEFAULT 0,
	"queenSizeBeds" integer DEFAULT 0,
	"singleSizeBeds" integer DEFAULT 0,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "setting" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userId" uuid NOT NULL,
	"currency" varchar(10) DEFAULT 'USD',
	"language" varchar(10) DEFAULT 'en-us',
	"timezone" varchar(50) DEFAULT 'UTC',
	"taxesPercentage" integer DEFAULT 0,
	"minimumBooking" integer DEFAULT 1,
	"theme" varchar(20) DEFAULT 'dark',
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tier" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tier" varchar(100),
	"description" text,
	"agents" integer DEFAULT 0,
	"guests" integer DEFAULT 0,
	"invoices" integer DEFAULT 0,
	"users" integer DEFAULT 0,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	CONSTRAINT "tier_tier_unique" UNIQUE("tier")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "unit" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"propertyId" uuid NOT NULL,
	"feeId" uuid NOT NULL,
	"asrId" uuid NOT NULL,
	"maxGuests" integer DEFAULT 6,
	"bedrooms" integer,
	"bathrooms" integer,
	"cribs" integer DEFAULT 0,
	"kingSizeBeds" integer DEFAULT 0,
	"queenSizeBeds" integer DEFAULT 0,
	"singleSizeBeds" integer DEFAULT 0,
	"sofaBeds" integer DEFAULT 0,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tier" varchar(100),
	"role" varchar(100),
	"email" varchar(255),
	"password" varchar(40),
	"fullName" varchar(200),
	"phone" varchar(50),
	"avatar" varchar(255),
	"birthday" varchar(20),
	"website" varchar(255),
	"code" varchar(10),
	"active" boolean DEFAULT false,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	CONSTRAINT "user_email_unique" UNIQUE("email"),
	CONSTRAINT "user_code_unique" UNIQUE("code")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "agent" ADD CONSTRAINT "agent_businessId_business_id_fk" FOREIGN KEY ("businessId") REFERENCES "public"."business"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "agent" ADD CONSTRAINT "agent_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "asset" ADD CONSTRAINT "asset_roomId_room_id_fk" FOREIGN KEY ("roomId") REFERENCES "public"."room"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "asset" ADD CONSTRAINT "asset_unitId_unit_id_fk" FOREIGN KEY ("unitId") REFERENCES "public"."unit"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "business" ADD CONSTRAINT "business_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "cancellation" ADD CONSTRAINT "cancellation_reservationId_reservation_id_fk" FOREIGN KEY ("reservationId") REFERENCES "public"."reservation"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "commission" ADD CONSTRAINT "commission_agentId_agent_id_fk" FOREIGN KEY ("agentId") REFERENCES "public"."agent"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "commission" ADD CONSTRAINT "commission_reservationId_reservation_id_fk" FOREIGN KEY ("reservationId") REFERENCES "public"."reservation"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "employee" ADD CONSTRAINT "employee_businessId_business_id_fk" FOREIGN KEY ("businessId") REFERENCES "public"."business"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "guest" ADD CONSTRAINT "guest_businessId_business_id_fk" FOREIGN KEY ("businessId") REFERENCES "public"."business"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "housekeeping" ADD CONSTRAINT "housekeeping_businessId_business_id_fk" FOREIGN KEY ("businessId") REFERENCES "public"."business"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "housekeeping" ADD CONSTRAINT "housekeeping_employeeId_employee_id_fk" FOREIGN KEY ("employeeId") REFERENCES "public"."employee"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "housekeeping" ADD CONSTRAINT "housekeeping_reservationId_reservation_id_fk" FOREIGN KEY ("reservationId") REFERENCES "public"."reservation"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "invoice" ADD CONSTRAINT "invoice_businessId_business_id_fk" FOREIGN KEY ("businessId") REFERENCES "public"."business"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "invoice" ADD CONSTRAINT "invoice_reservationId_reservation_id_fk" FOREIGN KEY ("reservationId") REFERENCES "public"."reservation"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "photo" ADD CONSTRAINT "photo_propertyId_property_id_fk" FOREIGN KEY ("propertyId") REFERENCES "public"."property"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "property" ADD CONSTRAINT "property_businessId_business_id_fk" FOREIGN KEY ("businessId") REFERENCES "public"."business"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "property" ADD CONSTRAINT "property_asrId_asr_id_fk" FOREIGN KEY ("asrId") REFERENCES "public"."asr"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "reservation" ADD CONSTRAINT "reservation_guestId_guest_id_fk" FOREIGN KEY ("guestId") REFERENCES "public"."guest"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "reservation" ADD CONSTRAINT "reservation_assetId_asset_id_fk" FOREIGN KEY ("assetId") REFERENCES "public"."asset"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "room" ADD CONSTRAINT "room_propertyId_property_id_fk" FOREIGN KEY ("propertyId") REFERENCES "public"."property"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "room" ADD CONSTRAINT "room_feeId_fee_id_fk" FOREIGN KEY ("feeId") REFERENCES "public"."fee"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "room" ADD CONSTRAINT "room_asrId_asr_id_fk" FOREIGN KEY ("asrId") REFERENCES "public"."asr"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "setting" ADD CONSTRAINT "setting_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "unit" ADD CONSTRAINT "unit_propertyId_property_id_fk" FOREIGN KEY ("propertyId") REFERENCES "public"."property"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "unit" ADD CONSTRAINT "unit_feeId_fee_id_fk" FOREIGN KEY ("feeId") REFERENCES "public"."fee"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "unit" ADD CONSTRAINT "unit_asrId_asr_id_fk" FOREIGN KEY ("asrId") REFERENCES "public"."asr"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
