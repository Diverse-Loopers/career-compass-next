import "dotenv/config";
import pkg from "pg";

const { Pool } = pkg;

const createPool = (connectionString) =>
  new Pool({
    connectionString,
    ssl: {
      rejectUnauthorized: false,
    },
  });

export const pools = {
  identity: createPool(process.env.DATABASE_URL_IDENTITY),
  exception: createPool(process.env.DATABASE_URL_EXCEPTION),
  workflow: createPool(process.env.DATABASE_URL_WORKFLOW),
  education: createPool(process.env.DATABASE_URL_EDUCATION),
  employment: createPool(process.env.DATABASE_URL_EMPLOYMENT),
  queue: createPool(process.env.DATABASE_URL_QUEUE),
};

export const checkAllDBConnections = async () => {
  console.log("🔍 Checking database connections...\n");

  const results = await Promise.allSettled(
    Object.entries(pools).map(async ([name, pool]) => {
      const client = await pool.connect();
      client.release();
      return name;
    }),
  );

  results.forEach((result, index) => {
    const dbName = Object.keys(pools)[index];

    if (result.status === "fulfilled") {
      console.log(`✅ ${dbName} DB connected`);
    } else {
      console.error(
        `❌ ${dbName} DB failed:`,
        result.reason?.message || result.reason,
      );
    }
  });

  console.log("\n✅ DB check complete\n");
};

/**
 * Graceful shutdown (VERY IMPORTANT for production)
 */
export const closeAllConnections = async () => {
  console.log("🔌 Closing all DB connections...");

  await Promise.all(Object.values(pools).map((pool) => pool.end()));

  console.log("✅ All DB connections closed");
};
