// // import express from "express"
// // import claimRoutes from "./modules/claim/claim.routes.js"

// // const app = express()

// // app.use(express.json())
// // app.use(express.urlencoded({ extended: true }))

// // app.use("/api/claim", claimRoutes)

// // export default app

// import express from "express"
// import claimRoutes from "./modules/claims/routes/claim.routes.js"
// import cors from "cors"
// const app = express()

// // 🔹 Middleware
// app.use(express.json())
// app.use(express.urlencoded({ extended: true }))
// app.use(cors({
//   origin: "http://localhost:3000", // your Next.js frontend
//   credentials: true
// }))
// // 🔹 Routes
// app.use("/api/claim", claimRoutes)

// // 🔹 Health check
// app.get("/", (req, res) => {
//   res.send("Server is running ✅")
// })

// export default app

import express from "express"
import cors from "cors"

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}))

// ✅ Dynamic import — waits until this line actually executes
// by which point dotenv.config() has already run in server.js
const { default: claimRoutes } = await import("./modules/claims/routes/claim.routes.js")
app.use("/api/claim", claimRoutes)

app.get("/", (req, res) => {
  res.send("Server is running ✅")
})

export default app