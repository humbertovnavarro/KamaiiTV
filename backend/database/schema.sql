CREATE SCHEMA public;

CREATE TABLE "public"."sessions" (
  "sessionId" integer NOT NULL
  "ip" TEXT NOT NULL,
  "userId" integer DEFAULT '0',
  "createdAt" timestamp with time zone NOT NULL DEFAULT NOW(),
  CONSTRAINT "rtmpServers_pk" PRIMARY KEY ("id")
) WITH (
  OIDS = FALSE
);

CREATE TABLE "public"."rtmpServers" (
  "id" serial NOT NULL
  "url" TEXT NOT NULL,
  "ip" TEXT NOT NULL,
  "online" BOOLEAN NOT NULL
  "createdAt" timestamp with time zone NOT NULL DEFAULT NOW(),
  CONSTRAINT "rtmpServers_pk" PRIMARY KEY ("id")
) WITH (
  OIDS = FALSE
);

CREATE TABLE "public"."users" (
	"userId" serial NOT NULL,
	"userName" TEXT NOT NULL,
	"email" TEXT NOT NULL,
	"hash" TEXT NOT NULL,
	"streamKey" TEXT,
	"streamKeyExpires" timestamp with time zone,
	"createdAt" timestamp with time zone NOT NULL DEFAULT NOW()
) WITH (
	OIDS=FALSE
);

CREATE TABLE "public"."streams" (
	"streamId" integer NOT NULL,
	"channelId" integer NOT NULL,
	"viewers" integer NOT NULL DEFAULT '0',
	"isLive" boolean NOT NULL DEFAULT 'true',
	"preview" bytea,
	"ip" inet NOT NULL,
  "rtmpServer" integer NOT NULL,
	"createdAt" timestamp with time zone NOT NULL DEFAULT NOW(),
	CONSTRAINT "streams_pk" PRIMARY KEY ("channelId")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "public"."messages" (
	"messageId" serial,
	"userId" integer NOT NULL,
	"channelId" integer NOT NULL,
  "session" integer NOT NULL
	"content" TEXT NOT NULL,
	"deleted" BOOLEAN NOT NULL DEFAULT 'false',
	"createdAt" timestamp with time zone NOT NULL DEFAULT NOW(),
	CONSTRAINT "messages_pk" PRIMARY KEY ("messageId")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "public"."bans" (
	"banId" serial NOT NULL,
	"userId" integer NOT NULL,
	"channelId" integer NOT NULL,
	"expires" timestamp with time zone,
	"createdAt" timestamp with time zone NOT NULL DEFAULT NOW()
) WITH (
  OIDS=FALSE
);

CREATE TABLE "public"."emotes" (
	"emoteId" serial NOT NULL,
	"creatorId" integer NOT NULL,
	"1x" integer NOT NULL,
  "2x" integer NOT NULL,
  "3x" integer NOT NULL,
	"matchString" TEXT NOT NULL,
	"public" BOOLEAN NOT NULL DEFAULT 'false',
	"createdAt" timestamp with time zone NOT NULL DEFAULT NOW(),
	CONSTRAINT "emotes_pk" PRIMARY KEY ("emoteId")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "public"."avatars" (
	"avatarId" serial NOT NULL,
	"creatorId" integer NOT NULL,
	"1x" integer NOT NULL,
  "2x" integer NOT NULL,
  "3x" integer NOT NULL,
	"matchString" TEXT NOT NULL,
	"public" BOOLEAN NOT NULL DEFAULT 'false',
	"createdAt" timestamp with time zone NOT NULL DEFAULT NOW(),
	CONSTRAINT "emotes_pk" PRIMARY KEY ("emoteId")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "public"."images" (
	"imageId" serial NOT NULL,
  "data" bytea NOT NULL,
  "md5" TEXT NOT NULL,
	"createdAt" timestamp with time zone NOT NULL DEFAULT NOW(),
) WITH (
  OIDS=FALSE
);

CREATE TABLE "public"."moderators" (
	"moderatorId" integer NOT NULL,
	"channelId" integer NOT NULL,
	CONSTRAINT "moderators_pk" PRIMARY KEY ("moderatorId")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "public"."admins" (
	"adminId" integer NOT NULL,
	"channelId" integer NOT NULL,
	CONSTRAINT "moderators_pk" PRIMARY KEY ("moderatorId")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "public"."followers" (
	"userId" integer NOT NULL,
	"followerId" integer NOT NULL,
	"createdAt" timestamp with time zone NOT NULL DEFAULT NOW()
) WITH (
  OIDS=FALSE
);

ALTER TABLE "streams" ADD CONSTRAINT "streams_fk0" FOREIGN KEY ("channelId") REFERENCES "users"("userId");
ALTER TABLE "streams" ADD CONSTRAINT "streams_fk1" FOREIGN KEY ("rtmpServer") REFERENCES "rtmpServers"("id");
