import { Oak } from "./deps.ts"

// Log incoming request details
export function logIncoming (context: Oak.Context) {
  const { headers, method, url } = context.request

  // Prevent Docker health check spam in logs
  if (headers.get("User-Agent") == "Wget" && url.pathname == "/health") {
    return
  }

  console.log(`⇥  ${method} ${url.pathname}`)
}

// Log outgoing response details
export function logOutgoing(context: Oak.Context) {
  const { headers, method, url } = context.request

  // Prevent Docker health check spam in logs
  if (headers.get("User-Agent") == "Wget" && url.pathname == "/health") {
    return
  }

  console.log(`Response:\n\t⇥  ${method} ${url.pathname}`)
  console.log(context.response.status)
}
