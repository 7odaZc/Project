# Deployment & Operation Checklist

## Production
- [x] Next.js application builds locally.
- [x] Production deployment exists on Vercel.
- [ ] Confirm current production build is the exact commit being submitted.
- [x] Configure `OPENROUTER_API_KEY` as a server-side Vercel environment variable for Preview and Production.
- [ ] Configure `OPENROUTER_MODEL` as a server-side Vercel environment variable for Preview, Production, and Development.
- [x] Verify public production routes respond successfully.
- [x] Verify no `.env.local` or API key is present in the submitted repository.
- [ ] Verify `/api/advisor` works on production after configuring credentials.
- [ ] Run Lighthouse on production.
- [ ] Run axe/WAVE on production.
- [ ] Test mobile at approximately 375px.
- [ ] Test desktop at approximately 1280px.

## Safe failure
If the AI service is unavailable, the API route returns a safe error and the UI displays a human-readable error state instead of exposing provider details.

## Rollback plan
The project is deployed through Vercel. If a production deployment introduces a regression:
1. Inspect the deployment in Vercel.
2. Revert the offending Git commit.
3. Push the correction.
4. Confirm the new deployment passes build and smoke tests.
5. Promote the known-good deployment if Vercel's deployment history is being used for rollback.

## Monitoring
Current baseline:
- Vercel deployment/build logs
- Application error logs in the API route

Future:
- Add structured application monitoring and rate-limit alerts.
