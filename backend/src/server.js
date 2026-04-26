// import dotenv from "dotenv"
// dotenv.config()  
// import app from "./app.js"

// console.log("Cloudinary ENV:", {
//   name: process.env.CLOUD_NAME,
//   key: process.env.API_KEY,
//   secret: process.env.API_SECRET
// });

// // 🔹 Optional (recommended)
// import { checkAllDBConnections, closeAllConnections } from "./shared/db.js"

// // dotenv.config()

// const PORT = process.env.PORT || 5000

// // 🔥 Start server
// const startServer = async () => {
//   try {
//     // 🔹 Check DB connections (your existing util)
//     await checkAllDBConnections()

//     app.listen(PORT, () => {
//       console.log(`🚀 Server running on http://localhost:${PORT}`)
//     })
//   } catch (err) {
//     console.error("❌ Failed to start server:", err)
//     process.exit(1)
//   }
// }

// startServer()

// // // 🔥 Graceful shutdown (VERY IMPORTANT)
// // process.on("SIGINT", async () => {
// //   console.log("\n🛑 Shutting down server...")
// //   await closeAllConnections()
// //   process.exit(0)
// // })

// // process.on("SIGTERM", async () => {
// //   console.log("\n🛑 Server terminated")
// //   await closeAllConnections()
// //   process.exit(0)
// // })

// server.js (new entry point)
import dotenv from "dotenv"
dotenv.config()

// Dynamic import ensures dotenv.config() fully runs BEFORE
// cloudinary.js or cloudinaryStorage.js are even loaded
const { default: app } = await import("./app.js")
const { checkAllDBConnections } = await import("./shared/db.js")

console.log("Cloudinary ENV:", {
  name: process.env.CLOUD_NAME,
  key: process.env.API_KEY,
  secret: process.env.API_SECRET
});

const PORT = process.env.PORT || 5000

const startServer = async () => {
  try {
    await checkAllDBConnections()
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`)
    })
  } catch (err) {
    console.error("❌ Failed to start server:", err)
    process.exit(1)
  }
}

startServer()