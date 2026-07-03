import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');
  const redirectParam = searchParams.get('route') || '/';

  // Validate the preview secret token to prevent unauthorized cache bypasses
  const PREVIEW_SECRET = process.env.PREVIEW_SECRET;
  if (PREVIEW_SECRET && secret !== PREVIEW_SECRET) {
    return new Response('Unauthorized!', { status: 401 });
  }

  // Enable Draft Mode
  const draft = await draftMode();
  draft.enable();

  // Sanitize the target redirect path to ensure it is a safe local route (starts with / and not //)
  let targetUrl = redirectParam;
  if (!targetUrl.startsWith('/') || targetUrl.startsWith('//')) {
    targetUrl = '/';
  }

  redirect(targetUrl);
}
