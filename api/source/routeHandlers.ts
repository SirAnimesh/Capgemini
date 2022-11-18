import { Oak } from "./deps.ts"
import * as Cache from "./cache.ts"
import * as Police from "./police/index.ts"

type NextMiddleware = () => Promise<unknown>

export async function healthCheck(context: Oak.Context, next: NextMiddleware) {
  try {
    await Cache.ping()
    context.response.body = {
      userAgent: context.request.headers.get("User-Agent"),
      status: "OK"
    }
  } catch (err) {
    console.error(`Cache unavailable: ${err}`)
    context.response.status = Oak.Status.FailedDependency
    context.response.body = {
      userAgent: context.request.headers.get("User-Agent"),
      status: "Cache unavailable"
    }
  }
  await next()
}

export async function getPoliceData(context: Oak.Context, next: NextMiddleware) {
  if (!context.request.hasBody) {
    context.throw(415);
  }

  try {
    const reqBody = await context.request.body().value
    
    const options: Police.GetAggregateOptions =
      context.request.headers.get("Content-Type")?.includes("text/plain")
        ? JSON.parse(reqBody)
        : reqBody
    
    const aggregates = await Police.getCrimeAggregate(options)
    context.response.body = aggregates
  } catch (err) {
    console.error(`Couldn't get police data: ${err}`)
    context.response.status = Oak.Status.InternalServerError
    context.response.body = {
      error: err.message
    }
  }
  await next()
}