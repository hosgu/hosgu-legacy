CREATE TABLE IF NOT EXISTS "agent" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"businessId" uuid NOT NULL,
	"userId" uuid NOT NULL,
	"isCompany" boolean DEFAULT false NOT NULL,
	"comissionType" varchar(100) DEFAULT 'fixed' NOT NULL,
	"highestCommissionWihoutOffer" integer DEFAULT 0 NOT NULL,
	"highestCommissionWithOffer" integer DEFAULT 0 NOT NULL,
	"lowestCommissionWihoutOffer" integer DEFAULT 0 NOT NULL,
	"lowestCommissionWithOffer" integer DEFAULT 0 NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "business" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userId" uuid NOT NULL,
	"type" varchar(100) NOT NULL,
	"name" varchar(255) NOT NULL,
	"slug" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"phone" varchar(50) NOT NULL,
	"priceRange" varchar(20),
	"website" varchar(200),
	"facebook" varchar(20),
	"instagram" varchar(200),
	"youtube" varchar(200),
	"logo" varchar(255) NOT NULL,
	"raiting" integer NOT NULL,
	"addressLine1" varchar(255),
	"addressLine2" varchar(255),
	"city" varchar(255),
	"state" varchar(255),
	"country" varchar(255),
	"zipCode" varchar(20),
	"active" boolean DEFAULT false NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "cancellation" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"reservationId" uuid NOT NULL,
	"cancellationDate" varchar(20) NOT NULL,
	"securityDepositReturned" integer DEFAULT 0 NOT NULL,
	"securityDepositHeld" integer DEFAULT 0 NOT NULL,
	"securityDepositFile" varchar(255) NOT NULL,
	"reason" text DEFAULT '' NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "comission" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"agentId" uuid NOT NULL,
	"reservationId" uuid NOT NULL,
	"commission" integer DEFAULT 0 NOT NULL,
	"isOffer" boolean DEFAULT false NOT NULL,
	"isPaid" boolean DEFAULT false NOT NULL,
	"paymentMethod" varchar(100) NOT NULL,
	"month" varchar(20) NOT NULL,
	"year" varchar(20) NOT NULL,
	"reservationCost" integer DEFAULT 0 NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "employee" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"businessId" uuid NOT NULL,
	"designation" varchar(100) NOT NULL,
	"fullName" varchar(200) NOT NULL,
	"email" varchar(255) NOT NULL,
	"phone" varchar(40) NOT NULL,
	"salary" integer DEFAULT 0 NOT NULL,
	"jobTitle" varchar(100) NOT NULL,
	"photo" varchar(255) NOT NULL,
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
	"type" varchar(100) NOT NULL,
	"floor" varchar(10) DEFAULT '0' NOT NULL,
	"roomNumber" varchar(10) DEFAULT '0' NOT NULL,
	"roomType" varchar(100) NOT NULL,
	"insideBathrooms" integer DEFAULT 1 NOT NULL,
	"outsideBathrooms" integer DEFAULT 0 NOT NULL,
	"maxGuests" integer DEFAULT 6 NOT NULL,
	"minGuests" integer DEFAULT 1 NOT NULL,
	"cleaningFee" integer DEFAULT 0 NOT NULL,
	"extraGuestFee" integer DEFAULT 0 NOT NULL,
	"extraBedFee" integer DEFAULT 0 NOT NULL,
	"securityDepositFee" integer DEFAULT 0 NOT NULL,
	"weekendFee" integer DEFAULT 0 NOT NULL,
	"weekdayFee" integer DEFAULT 0 NOT NULL,
	"initialOfferFee" integer DEFAULT 0 NOT NULL,
	"secondOfferFee" integer DEFAULT 0 NOT NULL,
	"emergencyOfferFee" integer DEFAULT 0 NOT NULL,
	"highestFee" integer DEFAULT 0 NOT NULL,
	"lowestFee" integer DEFAULT 0 NOT NULL,
	"hasWifi" boolean DEFAULT true NOT NULL,
	"hasTv" boolean DEFAULT true NOT NULL,
	"hasNetflix" boolean DEFAULT true NOT NULL,
	"hasHeat" boolean DEFAULT false NOT NULL,
	"hasAc" boolean DEFAULT false NOT NULL,
	"hasIron" boolean DEFAULT false NOT NULL,
	"hasDesk" boolean DEFAULT false NOT NULL,
	"hasKitchen" boolean DEFAULT true NOT NULL,
	"hasCrib" boolean DEFAULT true NOT NULL,
	"isPetsAllowed" boolean DEFAULT false NOT NULL,
	"isSmokingAllowed" boolean DEFAULT false NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "guest" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"businessId" uuid NOT NULL,
	"fullName" varchar(200) NOT NULL,
	"email" varchar(255) NOT NULL,
	"phone" varchar(40) NOT NULL,
	"website" varchar(200),
	"facebook" varchar(20),
	"instagram" varchar(200),
	"youtube" varchar(200),
	"tiktok" varchar(200),
	"gender" varchar(50) NOT NULL,
	"birthday" varchar(20) NOT NULL,
	"organization" varchar(50) NOT NULL,
	"taxIdentifier" varchar(50) NOT NULL,
	"notes" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "housekeeping" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"businessId" uuid NOT NULL,
	"employeeId" uuid NOT NULL,
	"reservationId" uuid NOT NULL,
	"date" varchar(20) NOT NULL,
	"time" varchar(20) NOT NULL,
	"notes" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "invoice" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"businessId" uuid NOT NULL,
	"reservationId" uuid NOT NULL,
	"invoiceNumber" integer DEFAULT 0 NOT NULL,
	"invoiceDate" varchar(20) NOT NULL,
	"dueDate" varchar(20) NOT NULL,
	"totalAmount" integer DEFAULT 0 NOT NULL,
	"paidAmount" integer DEFAULT 0 NOT NULL,
	"discount" integer DEFAULT 0 NOT NULL,
	"status" varchar(20) DEFAULT 'pending' NOT NULL,
	"paymentMethod" varchar(100) NOT NULL,
	"paymentDate" varchar(20) NOT NULL,
	"nights" integer DEFAULT 1 NOT NULL,
	"nightPrice" integer DEFAULT 0 NOT NULL,
	"cleaningFee" integer DEFAULT 0 NOT NULL,
	"serviceFee" integer DEFAULT 0 NOT NULL,
	"tax" integer DEFAULT 0 NOT NULL,
	"currency" varchar(10) DEFAULT 'USD' NOT NULL,
	"checkIn" varchar(20) NOT NULL,
	"checkOut" varchar(20) NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "property" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"businessId" uuid NOT NULL,
	"type" varchar(100) NOT NULL,
	"name" varchar(255) NOT NULL,
	"slug" varchar(255) NOT NULL,
	"description" text,
	"floors" integer NOT NULL,
	"rooms" integer NOT NULL,
	"photos" jsonb DEFAULT '[]'::jsonb,
	"amenities" jsonb DEFAULT '[{"name":"Wifi","i18n":"wifi","exists":true},{"name":"Parking","i18n":"parking","exists":true},{"name":"Kitchen","i18n":"kitchen","exists":true},{"name":"TV","i18n":"tv","exists":true},{"name":"Washer","i18n":"washer","exists":true},{"name":"Dryer","i18n":"dryer","exists":true},{"name":"Heating","i18n":"heating","exists":true},{"name":"Air Conditioning","i18n":"airConditioning","exists":true},{"name":"Iron","i18n":"iron","exists":true},{"name":"Hair Dryer","i18n":"hairDryer","exists":true},{"name":"Smoke Detector","i18n":"smokeDetector","exists":true},{"name":"Carbon Monoxide Detector","i18n":"carbonMonoxideDetector","exists":true},{"name":"First Aid Kit","i18n":"firstAidKit","exists":true},{"name":"Fire Extinguisher","i18n":"fireExtinguisher","exists":true}]'::jsonb,
	"services" jsonb DEFAULT '[{"name":"Airport Shuttle","i18n":"airportShuttle","exists":true},{"name":"Breakfast","i18n":"breakfast","exists":true},{"name":"Elevator","i18n":"elevator","exists":true},{"name":"Gym","i18n":"gym","exists":true},{"name":"Hot Tub","i18n":"hotTub","exists":true},{"name":"Pool","i18n":"pool","exists":true},{"name":"Spa","i18n":"spa","exists":true},{"name":"Parking","i18n":"parking","exists":true},{"name":"Pets Allowed","i18n":"petsAllowed","exists":true},{"name":"Smoking Allowed","i18n":"smokingAllowed","exists":true},{"name":"Events Allowed","i18n":"eventsAllowed","exists":true},{"name":"Wheelchair Accessible","i18n":"wheelchairAccessible","exists":true}]'::jsonb,
	"sleepingArrangements" jsonb DEFAULT '[{"bedrooom":1,"kingSizeBeds":1,"queenSizeBeds":0,"doubleSizeBeds":0,"singleSizeBeds":0,"sofaBeds":0,"bunkBeds":0,"futons":0,"hammocks":0,"airMattresses":0,"cribs":1},{"bedrooom":2,"kingSizeBeds":0,"queenSizeBeds":1,"doubleSizeBeds":0,"singleSizeBeds":0,"sofaBeds":0,"bunkBeds":0,"futons":0,"hammocks":0,"airMattresses":0,"cribs":0},{"bedrooom":3,"kingSizeBeds":0,"queenSizeBeds":2,"doubleSizeBeds":0,"singleSizeBeds":0,"sofaBeds":0,"bunkBeds":0,"futons":0,"hammocks":0,"airMattresses":0,"cribs":0}]'::jsonb,
	"generalRules" text,
	"safetyRules" text,
	"cancellationPolicy" text,
	"checkIn" varchar(50),
	"checkOut" varchar(50),
	"active" boolean DEFAULT false NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "reservation" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"estateId" uuid NOT NULL,
	"guestId" uuid NOT NULL,
	"startDate" varchar(20) NOT NULL,
	"endDate" varchar(20) NOT NULL,
	"nights" integer DEFAULT 0 NOT NULL,
	"freeNights" integer DEFAULT 0 NOT NULL,
	"occupancy" integer DEFAULT 0 NOT NULL,
	"adults" integer DEFAULT 0 NOT NULL,
	"children" integer DEFAULT 0 NOT NULL,
	"infants" integer DEFAULT 0 NOT NULL,
	"pets" integer DEFAULT 0 NOT NULL,
	"extraOccupancy" integer DEFAULT 0 NOT NULL,
	"pendingAmount" integer DEFAULT 0 NOT NULL,
	"totalAmount" integer DEFAULT 0 NOT NULL,
	"paidAmount" integer DEFAULT 0 NOT NULL,
	"discount" integer DEFAULT 0 NOT NULL,
	"taxes" integer DEFAULT 0 NOT NULL,
	"cleaningFee" integer DEFAULT 0 NOT NULL,
	"serviceFee" integer DEFAULT 0 NOT NULL,
	"securityDeposit" integer DEFAULT 0 NOT NULL,
	"securityDepositFile" varchar(255) NOT NULL,
	"needCrib" boolean DEFAULT false NOT NULL,
	"isCancelled" boolean DEFAULT false NOT NULL,
	"isOffer" boolean DEFAULT false NOT NULL,
	"offerDetails" text DEFAULT '' NOT NULL,
	"notes" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "setting" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userId" uuid NOT NULL,
	"currency" varchar(10) DEFAULT 'USD' NOT NULL,
	"language" varchar(10) DEFAULT 'en' NOT NULL,
	"timezone" varchar(50) DEFAULT 'UTC' NOT NULL,
	"taxesPercentage" integer DEFAULT 0 NOT NULL,
	"minimumBooking" integer DEFAULT 1 NOT NULL,
	"theme" varchar(20) DEFAULT 'dark' NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tier" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tier" varchar(100) NOT NULL,
	"description" text NOT NULL,
	"agents" integer DEFAULT 0 NOT NULL,
	"guests" integer DEFAULT 0 NOT NULL,
	"invoices" integer DEFAULT 0 NOT NULL,
	"users" integer DEFAULT 0 NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	CONSTRAINT "tier_tier_unique" UNIQUE("tier")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tier" varchar(100) NOT NULL,
	"role" varchar(100) NOT NULL,
	"email" varchar(255),
	"password" varchar(40) NOT NULL,
	"fullName" varchar(200),
	"phone" varchar(50),
	"avatar" varchar(255),
	"birthday" varchar(20),
	"website" varchar(255),
	"code" varchar(10),
	"active" boolean DEFAULT false NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	CONSTRAINT "user_email_unique" UNIQUE("email"),
	CONSTRAINT "user_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "userRole" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"role" varchar(100) NOT NULL,
	"description" varchar(255) NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	CONSTRAINT "userRole_role_unique" UNIQUE("role")
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
