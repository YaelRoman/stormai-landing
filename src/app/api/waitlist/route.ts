/*
 * Copyright 2026 Storm Security Contributors
 * Licensed under the Apache License, Version 2.0
 */

import fs from "fs/promises";
import path from "path";

interface WaitlistEntry {
  email: string;
  company_name?: string;
  timestamp: string;
}

export async function POST(request: Request) {
  try {
    const { email, company_name } = await request.json();

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return Response.json(
        { error: "invalid_email" },
        { status: 400 }
      );
    }

    const dataDir = path.join(process.cwd(), "data");
    const filePath = path.join(dataDir, "waitlist.json");

    await fs.mkdir(dataDir, { recursive: true });

    let entries: WaitlistEntry[] = [];
    try {
      const content = await fs.readFile(filePath, "utf-8");
      entries = JSON.parse(content);
    } catch (err) {
      if ((err as NodeJS.ErrnoException).code !== "ENOENT") throw err;
    }

    const normalizedEmail = email.toLowerCase();
    if (entries.some((e) => e.email.toLowerCase() === normalizedEmail)) {
      return Response.json(
        { error: "already_subscribed" },
        { status: 409 }
      );
    }

    entries.push({
      email: email.trim(),
      company_name: company_name?.trim() || undefined,
      timestamp: new Date().toISOString(),
    });
    await fs.writeFile(filePath, JSON.stringify(entries, null, 2), "utf-8");

    return Response.json({ ok: true });
  } catch (error) {
    console.error("Waitlist POST error:", error);
    return Response.json(
      { error: "server_error" },
      { status: 500 }
    );
  }
}
