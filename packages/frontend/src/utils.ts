import determStringify from "fast-json-stable-stringify";

export async function calculateDigest(secret: string, body: any): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(`${secret}${determStringify(body)}`);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const base64String = btoa(hashArray.map(byte => String.fromCharCode(byte)).join(""));
  return base64String;
}
