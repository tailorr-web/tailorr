const { createClient } = require('@libsql/client');
const fs = require('fs');

async function dump() {
  const client = createClient({ url: 'file:database.db' });
  
  let sql = '';
  
  // Get tables
  const tables = await client.execute("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'");
  
  for (const table of tables.rows) {
    const tableName = table.name;
    
    // Get create statement
    const createRes = await client.execute(`SELECT sql FROM sqlite_master WHERE type='table' AND name='${tableName}'`);
    sql += createRes.rows[0].sql + ';\n';
    
    // Get data
    const dataRes = await client.execute(`SELECT * FROM ${tableName}`);
    for (const row of dataRes.rows) {
      const keys = Object.keys(row);
      const values = Object.values(row).map(v => {
        if (v === null) return 'NULL';
        if (typeof v === 'string') return `'${v.replace(/'/g, "''")}'`;
        return v;
      });
      sql += `INSERT INTO ${tableName} (${keys.join(', ')}) VALUES (${values.join(', ')});\n`;
    }
    sql += '\n';
  }
  
  fs.writeFileSync('migrasi_turso.sql', sql);
  console.log('Dump completed: migrasi_turso.sql');
}

dump();
