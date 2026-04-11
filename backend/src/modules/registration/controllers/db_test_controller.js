import { pools } from "../../../shared/db.js";

export const testDB = async (req, res) => {
  try {
    const results = {};

    for (const [name, pool] of Object.entries(pools)) {
      const result = await pool.query("SELECT NOW()");
      results[name] = result.rows[0];
    }

    res.json({ success: true, dbTime: results });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const testPrisma = async (req, res) => {
  try {
    const results = {};

    for (const [name, client] of Object.entries(prisma)) {
      try {
        await client.$connect();
        await client.$queryRaw`SELECT 1`;
        results[name] = "✅ Connected";
      } catch (err) {
        results[name] = `❌ ${err.message}`;
      }
    }

    res.json({ success: true, prisma: results });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
