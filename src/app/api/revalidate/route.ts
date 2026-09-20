/**
 * Makes a dashboard save appear on the live site immediately.
 *
 * Called from the Django admin page in the client's browser, not by Django
 * itself — PythonAnywhere's free tier only permits outbound requests to
 * whitelisted hosts, so the backend cannot reach this route directly.
 *
 * Because the caller is a browser on another origin, the request is
 * authenticated with a short-lived HMAC token rather than the shared secret,
 * and CORS is answered for the backend's origin only.
 */

import crypto from "node:crypto";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

import { JOBS_TAG, PROJECTS_TAG } from "@/lib/api";

const REVALIDATE_SECRET = process.env.REVALIDATE_SECRET ?? "";
const BACKEND_URL = process.env.BACKEND_URL ?? "";

// Mirrors admire/revalidate.py on the backend.
const TOKEN_TTL_SECONDS = 30 * 60;

const KNOWN_TAGS = new Set([PROJECTS_TAG, JOBS_TAG]);

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": BACKEND_URL || "null",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, X-Revalidate-Token",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
}

/** Verify "<unix-ts>.<hex hmac-sha256(secret, unix-ts)>". */
function verifyToken(token: string): boolean {
  if (!REVALIDATE_SECRET || !token.includes(".")) return false;

  const separator = token.indexOf(".");
  const timestamp = token.slice(0, separator);
  const signature = token.slice(separator + 1);

  const expected = crypto
    .createHmac("sha256", REVALIDATE_SECRET)
    .update(timestamp)
    .digest("hex");

  const provided = Buffer.from(signature, "utf8");
  const computed = Buffer.from(expected, "utf8");
  if (provided.length !== computed.length) return false;
  if (!crypto.timingSafeEqual(provided, computed)) return false;

  const age = Date.now() / 1000 - Number(timestamp);
  return Number.isFinite(age) && age >= 0 && age <= TOKEN_TTL_SECONDS;
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders() });
}

export async function POST(request: Request) {
  if (!REVALIDATE_SECRET) {
    return NextResponse.json(
      { error: "Revalidation is not configured." },
      { status: 503, headers: corsHeaders() },
    );
  }

  const token = request.headers.get("X-Revalidate-Token") ?? "";
  if (!verifyToken(token)) {
    return NextResponse.json(
      { error: "Invalid or expired token." },
      { status: 401, headers: corsHeaders() },
    );
  }

  const body = await request.json().catch(() => ({}));
  const requested: unknown = body?.tags;

  const tags =
    Array.isArray(requested) && requested.length > 0
      ? requested.filter((tag): tag is string => KNOWN_TAGS.has(tag as string))
      : [...KNOWN_TAGS];

  // Next 16 takes a cache-life profile as the second argument, and it decides
  // how old an entry must be to be dropped. A named profile like "max" expires
  // nothing recent, which silently leaves the stale page in place — `expire: 0`
  // is the immediate-purge case a deliberate publish wants. (`updateTag`, the
  // sugar for this, throws in a route handler.)
  for (const tag of tags) {
    revalidateTag(tag, { expire: 0 });
  }

  return NextResponse.json(
    { revalidated: tags, at: new Date().toISOString() },
    { headers: corsHeaders() },
  );
}
