// scripts/auth.ts

import { Buffer } from 'buffer';

const log = {
  info: (msg: string) => console.log(`\x1b[36mℹ️  INFO:\x1b[0m ${msg}`),
  success: (msg: string) => console.log(`\x1b[32m✅ SUCCESS:\x1b[0m ${msg}`),
  error: (msg: string) => console.error(`\x1b[31m❌ ERROR:\x1b[0m ${msg}`),
};

export async function getAccessToken(): Promise<string> {
  const clientId = process.env.QURAN_API_CLIENT_ID!;
  const clientSecret = process.env.QURAN_API_CLIENT_SECRET!;
  const baseUrl =
    process.env.QURAN_API_BASE_URL || 'https://prelive-oauth2.quran.foundation';

  log.info(`Requesting token from ${baseUrl}/oauth2/token`);

  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  const response = await fetch(`${baseUrl}/oauth2/token`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials&scope=content',
  });

  if (!response.ok) {
    const body = await response.text();
    log.error(
      `Failed to fetch token: ${response.status} ${response.statusText}`
    );
    log.error(`Response: ${body}`);
    throw new Error(`Auth failed: ${response.status}`);
  }

  const data = await response.json();
  log.success(`Received token (expires_in=${data.expires_in}s)`);
  return data.access_token as string;
}
