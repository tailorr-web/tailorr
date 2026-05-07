import { createClient } from '@libsql/client';

const url = process.env.TURSO_DATABASE_URL || 'file:database.db';
const authToken = process.env.TURSO_AUTH_TOKEN;

const db = createClient({
  url: url,
  authToken: authToken,
});

export default db;
