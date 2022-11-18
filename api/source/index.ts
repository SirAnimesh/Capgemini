import { Oak, CORS } from "./deps.ts"
import { logIncoming, logOutgoing } from "./helpers.ts"
import { healthCheck, getPoliceData } from "./routeHandlers.ts"

const app = new Oak.Application()
const router = new Oak.Router()

/**********************
 *  Routes
 **********************/

router.get("/health", healthCheck)
router.post("/police-data", getPoliceData)

/**********************
 *  Middleware setup
 **********************/

app.use(CORS.oakCors({
  origin: "*"
}))

app.use(async (context, next) => {
  logIncoming(context)
  await next()
})

app.use(router.routes())
app.use(router.allowedMethods())

app.use(logOutgoing)

/**********************
 *  Event handlers
 **********************/

app.addEventListener('listen', () => console.log(`Server accepting connections...`))

/**********************
 *  Start me up!
 **********************/

await app.listen({ port: 80 })
