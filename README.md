# Public website (Next.js 15 + Tailwind v4)
npm install && npm run dev

- Tokens: app/globals.css (@theme). Replace with brand values once supplied.
- Content: lib/content.ts is a stand-in for the Admin Panel CMS. Swap each export for a CMS fetch.
- App links: NEXT_PUBLIC_APP_URL plus placeholder paths (spec §21).
- Enquiry: app/api/enquiry/route.ts validates, rate-limits, verifies Turnstile (if keys set) and forwards to ENQUIRY_ENDPOINT.
