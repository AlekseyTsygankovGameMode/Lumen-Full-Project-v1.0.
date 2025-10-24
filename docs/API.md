# Lumen Chat API

## Endpoint

POST /api/chat

## Request

{
  "message": string (required, max 4000 chars),
  "mode": "lumen5" | "classic" (optional, default: "lumen5"),
  "adaptivity": "collab" | "guide" | "mirror" (optional, default: "collab")
}

## Response

Success:
{
  "reply": string,
  "reasoning": string[],
  "efv": { tone, engagement },
  "esi": number,
  "tone": ToneType,
  "model": string,
  "fallback?": boolean,
  "recoveryType?": string
}

Error:
{
  "error": string,
  "details?": string
}