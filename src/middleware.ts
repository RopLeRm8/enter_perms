import { NextRequest, NextResponse } from "next/server";
import { NextMiddleware } from "next/server";
import { IRequestRecord } from "./types/api";

const windowMs = 10 * 60 * 1000;
const max = 2000;
const requests = new Map<string, IRequestRecord>();

const rateLimit: NextMiddleware = (req: NextRequest) => {
  const ip = req.ip ?? "unknown";
  const now = Date.now();

  const record = requests.get(ip) || { count: 0, startTime: now };
  const deltaTime = now - record.startTime;

  if (deltaTime > windowMs) {
    record.count = 1;
    record.startTime = now;
  } else {
    record.count += 1;
  }

  if (record.count > max) {
    return new Response("יותר מדי בקשות, אנא המתן כמה זמן לפני שתוכל להמשיך", {
      status: 429,
    });
  }

  requests.set(ip, record);

  return NextResponse.next();
};

export const middleware = rateLimit;
