import { DataSource } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';

const MIGRATION_DIR = path.join(__dirname, 'migrations/sqls');

export async function runSqlMigrations(dataSource: DataSource) {
  await dataSource.initialize();

  await dataSource.query(`
    CREATE TABLE IF NOT EXISTS migrations (
      version VARCHAR(50) PRIMARY KEY,
      name VARCHAR(255),
      run_on TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
    )
  `);

  const appliedMigrations = await dataSource.query(
    `SELECT version FROM migrations`,
  );
  const appliedVersions = new Set(appliedMigrations.map((m: any) => m.version));

  const migrationFiles = fs
    .readdirSync(MIGRATION_DIR)
    .filter((file) => /^V\d+__.+\.sql$/.test(file))
    .sort();

  for (const file of migrationFiles) {
    const [versionPart, namePart] = file.split('__');
    const version = versionPart.substring(1); // remove 'V'

    if (appliedVersions.has(version)) continue;

    const fullPath = path.join(MIGRATION_DIR, file);
    const sql = fs.readFileSync(fullPath, 'utf-8');

    console.log(`[SQL-MIGRATION] Applying V${version} - ${namePart}`);
    await dataSource.query(sql);
    await dataSource.query(
      `INSERT INTO migrations (version, name) VALUES ($1, $2)`,
      [version, namePart.replace('.sql', '')],
    );
  }

  await dataSource.destroy();
}
