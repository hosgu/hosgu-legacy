CREATE TABLE IF NOT EXISTS "agent" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"businessId" uuid NOT NULL,
	"userId" uuid NOT NULL,
	"isCompany" boolean DEFAULT false,
	"comissionType" varchar(100) DEFAULT 'fixed',
	"highestCommissionWihoutOffer" integer DEFAULT 0,
	"highestCommissionWithOffer" integer DEFAULT 0,
	"lowestCommissionWihoutOffer" integer DEFAULT 0,
	"lowestCommissionWithOffer" integer DEFAULT 0,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "business" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userId" uuid NOT NULL,
	"type" varchar(100),
	"name" varchar(255),
	"slug" varchar(255),
	"email" varchar(255),
	"phone" varchar(50),
	"priceRange" varchar(20),
	"website" varchar(200),
	"facebook" varchar(200),
	"instagram" varchar(200),
	"logo" varchar(255),
	"raiting" integer,
	"addressLine1" varchar(255),
	"addressLine2" varchar(255),
	"city" varchar(255),
	"state" varchar(255),
	"country" varchar(255),
	"zipCode" varchar(20),
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
CREATE TABLE IF NOT EXISTS "comission" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"agentId" uuid NOT NULL,
	"reservationId" uuid NOT NULL,
	"commission" integer DEFAULT 0,
	"isOffer" boolean DEFAULT false,
	"isPaid" boolean DEFAULT false,
	"paymentMethod" varchar(100),
	"month" varchar(20),
	"year" varchar(20),
	"reservationCost" integer DEFAULT 0,
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
CREATE TABLE IF NOT EXISTS "estate" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"propertyId" uuid NOT NULL,
	"type" varchar(100),
	"floor" varchar(10) DEFAULT '0',
	"roomNumber" varchar(10) DEFAULT '0',
	"roomType" varchar(100),
	"insideBathrooms" integer DEFAULT 1,
	"outsideBathrooms" integer DEFAULT 0,
	"maxGuests" integer DEFAULT 6,
	"minGuests" integer DEFAULT 1,
	"cleaningFee" integer DEFAULT 0,
	"extraGuestFee" integer DEFAULT 0,
	"extraBedFee" integer DEFAULT 0,
	"securityDepositFee" integer DEFAULT 0,
	"weekendFee" integer DEFAULT 0,
	"weekdayFee" integer DEFAULT 0,
	"initialOfferFee" integer DEFAULT 0,
	"secondOfferFee" integer DEFAULT 0,
	"emergencyOfferFee" integer DEFAULT 0,
	"highestFee" integer DEFAULT 0,
	"lowestFee" integer DEFAULT 0,
	"hasWifi" boolean DEFAULT true,
	"hasTv" boolean DEFAULT true,
	"hasNetflix" boolean DEFAULT true,
	"hasHeat" boolean DEFAULT false,
	"hasAc" boolean DEFAULT false,
	"hasIron" boolean DEFAULT false,
	"hasDesk" boolean DEFAULT false,
	"hasKitchen" boolean DEFAULT true,
	"hasCrib" boolean DEFAULT true,
	"isPetsAllowed" boolean DEFAULT false,
	"isSmokingAllowed" boolean DEFAULT false,
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
	"notes" jsonb DEFAULT '[]'::jsonb,
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
CREATE TABLE IF NOT EXISTS "property" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"businessId" uuid NOT NULL,
	"type" varchar(100),
	"name" varchar(255),
	"slug" varchar(255),
	"description" text,
	"floors" integer,
	"rooms" integer,
	"photos" jsonb DEFAULT '[]'::jsonb,
	"amenities" jsonb DEFAULT '[{"name":"Wifi","i18n":"wifi","exists":true},{"name":"Parking","i18n":"parking","exists":true},{"name":"Kitchen","i18n":"kitchen","exists":true},{"name":"TV","i18n":"tv","exists":true},{"name":"Washer","i18n":"washer","exists":true},{"name":"Dryer","i18n":"dryer","exists":true},{"name":"Heating","i18n":"heating","exists":true},{"name":"Air Conditioning","i18n":"airConditioning","exists":true},{"name":"Iron","i18n":"iron","exists":true},{"name":"Hair Dryer","i18n":"hairDryer","exists":true},{"name":"Smoke Detector","i18n":"smokeDetector","exists":true},{"name":"Carbon Monoxide Detector","i18n":"carbonMonoxideDetector","exists":true},{"name":"First Aid Kit","i18n":"firstAidKit","exists":true},{"name":"Fire Extinguisher","i18n":"fireExtinguisher","exists":true}]'::jsonb,
	"services" jsonb DEFAULT '[{"name":"Airport Shuttle","i18n":"airportShuttle","exists":true},{"name":"Breakfast","i18n":"breakfast","exists":true},{"name":"Elevator","i18n":"elevator","exists":true},{"name":"Gym","i18n":"gym","exists":true},{"name":"Hot Tub","i18n":"hotTub","exists":true},{"name":"Pool","i18n":"pool","exists":true},{"name":"Spa","i18n":"spa","exists":true},{"name":"Parking","i18n":"parking","exists":true},{"name":"Pets Allowed","i18n":"petsAllowed","exists":true},{"name":"Smoking Allowed","i18n":"smokingAllowed","exists":true},{"name":"Events Allowed","i18n":"eventsAllowed","exists":true},{"name":"Wheelchair Accessible","i18n":"wheelchairAccessible","exists":true}]'::jsonb,
	"sleepingArrangements" jsonb DEFAULT '[{"bedrooom":1,"kingSizeBeds":1,"queenSizeBeds":0,"doubleSizeBeds":0,"singleSizeBeds":0,"sofaBeds":0,"bunkBeds":0,"futons":0,"hammocks":0,"airMattresses":0,"cribs":1},{"bedrooom":2,"kingSizeBeds":0,"queenSizeBeds":1,"doubleSizeBeds":0,"singleSizeBeds":0,"sofaBeds":0,"bunkBeds":0,"futons":0,"hammocks":0,"airMattresses":0,"cribs":0},{"bedrooom":3,"kingSizeBeds":0,"queenSizeBeds":2,"doubleSizeBeds":0,"singleSizeBeds":0,"sofaBeds":0,"bunkBeds":0,"futons":0,"hammocks":0,"airMattresses":0,"cribs":0}]'::jsonb,
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
	"estateId" uuid NOT NULL,
	"guestId" uuid NOT NULL,
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
	"notes" jsonb DEFAULT '[]'::jsonb,
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
 ALTER TABLE "agent" ADD CONSTRAINT "agent_businessId_business_id_fk" FOREIGN KEY ("businessId") REFERENCES "business"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "agent" ADD CONSTRAINT "agent_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "business" ADD CONSTRAINT "business_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "cancellation" ADD CONSTRAINT "cancellation_reservationId_reservation_id_fk" FOREIGN KEY ("reservationId") REFERENCES "reservation"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "comission" ADD CONSTRAINT "comission_agentId_agent_id_fk" FOREIGN KEY ("agentId") REFERENCES "agent"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "comission" ADD CONSTRAINT "comission_reservationId_reservation_id_fk" FOREIGN KEY ("reservationId") REFERENCES "reservation"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "employee" ADD CONSTRAINT "employee_businessId_business_id_fk" FOREIGN KEY ("businessId") REFERENCES "business"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "estate" ADD CONSTRAINT "estate_propertyId_property_id_fk" FOREIGN KEY ("propertyId") REFERENCES "property"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "guest" ADD CONSTRAINT "guest_businessId_business_id_fk" FOREIGN KEY ("businessId") REFERENCES "business"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "housekeeping" ADD CONSTRAINT "housekeeping_businessId_business_id_fk" FOREIGN KEY ("businessId") REFERENCES "business"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "housekeeping" ADD CONSTRAINT "housekeeping_employeeId_employee_id_fk" FOREIGN KEY ("employeeId") REFERENCES "employee"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "housekeeping" ADD CONSTRAINT "housekeeping_reservationId_reservation_id_fk" FOREIGN KEY ("reservationId") REFERENCES "reservation"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "invoice" ADD CONSTRAINT "invoice_businessId_business_id_fk" FOREIGN KEY ("businessId") REFERENCES "business"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "invoice" ADD CONSTRAINT "invoice_reservationId_reservation_id_fk" FOREIGN KEY ("reservationId") REFERENCES "reservation"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "property" ADD CONSTRAINT "property_businessId_business_id_fk" FOREIGN KEY ("businessId") REFERENCES "business"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "reservation" ADD CONSTRAINT "reservation_estateId_estate_id_fk" FOREIGN KEY ("estateId") REFERENCES "estate"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "reservation" ADD CONSTRAINT "reservation_guestId_guest_id_fk" FOREIGN KEY ("guestId") REFERENCES "guest"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "setting" ADD CONSTRAINT "setting_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
