# Security Policy

## Reporting

Please do not open public issues for vulnerabilities. Report security issues by email or private advisory in the GitHub repository once configured.

Include:

- Affected version or commit.
- Steps to reproduce.
- Expected impact.
- Any suggested fix.

## API Key Handling

The web app keeps `OPENAI_API_KEY` on the Node server and gives the browser only a short-lived Realtime client secret. Never expose a long-lived API key in frontend code or screenshots.

The Android wrapper stores the API key in local app preferences after the user enters it. Do not ship APKs with embedded API keys.
