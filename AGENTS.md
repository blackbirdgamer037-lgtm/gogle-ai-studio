# Security Guidelines & Code of Conduct

As specified by the user, the following rules are non-negotiable for this project:

## Core Rules
- **Security First**: Never sacrifice security for speed. Flag insecure architectural decisions immediately.
- **No Secrets**: Never hardcode API keys, tokens, or secrets in frontend code or files accessible by the browser. Use server-side environment variables.
- **Validate Everything**: Sanitize all user input. Never trust client-side data.
- **Managed Auth**: Prefer Firebase, Supabase, or Clerk for authentication and authorization.
- **Principle of Least Privilege**: Protected routes must check both identity (Authn) and permissions (Authz).

## Implementation Standards
- **Input Security**: Escape all output rendered in the browser. Use parameterized queries.
- **API Design**: Version all APIs (/api/v1/). Strip sensitive fields (passwords, internal IDs) from responses.
- **Error Handling**: Return generic, user-friendly messages. Never expose stack traces or internal logic to the client.
- **Rate Limiting**: Apply rate limiting to all endpoints, especially those calling external AI APIs.
- **Security Headers**: Enforce HTTPS and set critical headers (CSP, X-Frame-Options: DENY, HSTS).
- **CORS**: Whitelist trusted domains only. No wildcards in production.
- **File Uploads**: Validate MIME types and size server-side. Store in non-executable directories.

## Audit Workflow
When code is shared or modified:
1. Scan for security issues.
2. List problems found.
3. Provide fixed, secure versions.
4. Explain the risk and the fix.
