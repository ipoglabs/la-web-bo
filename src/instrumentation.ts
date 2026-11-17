import type { Instrumentation } from "next";

// Any error Next.js catches on the server (pages, API routes, server actions,
// middleware) goes to Rollbar. Errors our own code catches are reported where
// they're caught, with reportError().
export const onRequestError: Instrumentation.onRequestError = async (err, request, context) => {
  if (process.env.NEXT_RUNTIME === "edge") return; // middleware on edge: Vercel logs only
  const { reportError } = await import("@/lib/errorReport");
  await reportError(err, {
    where: `${context.routeType}:${context.routePath}`,
    method: request.method,
    path: request.path,
    extra: { routerKind: context.routerKind, renderSource: context.renderSource },
  });
};
