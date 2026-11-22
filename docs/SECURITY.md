# HTTPS and deployment security

## Development

`pnpm dev` starts the supported Next.js HTTPS development server at `https://localhost:3000`, bound to `127.0.0.1`. Next.js uses mkcert when no custom certificate is provided. The certificates directory and common private-key extensions are ignored by Git. Keep the development CA private key in mkcert's local store.

If the browser reports a trust error, install mkcert from its official release or a trusted package manager, then run `mkcert -install` under the local development account and relaunch the browser. To provision a custom setup, generate a key and cert for `localhost 127.0.0.1 ::1` with mkcert and pass their paths using `--experimental-https-key` and `--experimental-https-cert`. Install only the locally generated mkcert root in the appropriate trust store. Verify in a browser or use Node with the Windows trust store via `node --use-system-ca -e 'fetch("https://localhost:3000/").then(r => console.log(r.status))'`. Windows curl with Schannel can reject mkcert certificates because a local CA supplies no revocation endpoint. If a client uses a separate trust store, point that client to the local CA PEM. [Next.js HTTPS CLI](https://nextjs.org/docs/app/api-reference/cli/next) · [mkcert](https://github.com/FiloSottile/mkcert)

## Headers

`next.config.ts` serves Referrer-Policy, X-Content-Type-Options, X-Frame-Options, a restricted Permissions-Policy, and CSP. CSP allows same-origin bundles, connections, images and fonts, plus data images. Objects and framing are blocked. Static App Router HTML uses inline bootstrap scripts and component styles, so the policy permits inline scripts and styles. Development adds the evaluation permission React uses for debugging. Production omits that permission. A stricter nonce policy would need a dynamic rendering decision when the site gains user input or a different security requirement. [Next.js CSP guidance](https://nextjs.org/docs/app/guides/content-security-policy)

## Before production delivery

Vercel or the HTTPS proxy should terminate TLS and redirect HTTP to HTTPS. Verify both behaviors on the real domain, review the headers actually emitted by the host, and enable host-managed HSTS only after HTTPS has been verified for the relevant hostname. Keep the first policy hostname-scoped and omit preload. The app sets no HSTS, including on localhost. Local `next start` serves HTTP to simulate the app behind a TLS-terminating proxy. If authentication is added, use Secure and HttpOnly cookies, choose SameSite for the real flow, and review CSP for approved providers. [Vercel SSL](https://vercel.com/docs/domains/working-with-ssl)

Phase 01 requires no secrets. Keep future private configuration in server-only environment variables and use `.env.example` for harmless examples. The diagnostic route is guarded by development mode and returns a 404 from the production build.
