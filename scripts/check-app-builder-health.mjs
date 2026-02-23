import { readFile } from 'node:fs/promises';
import process from 'node:process';

const FILE_TO_CHECK = 'src/api/opsvanta.js';

const requiredExports = [
  'getProjects',
  'createProject',
  'getWorkflows',
  'generateWebsite',
  'getGenerationProgress',
  'getProject',
  'updateProject',
  'deleteProject',
  'searchDomains',
  'getDomains',
  'connectDomain',
];

async function main() {
  const source = await readFile(FILE_TO_CHECK, 'utf8');

  const missing = requiredExports.filter(
    (name) => !new RegExp(`export\\s+async\\s+function\\s+${name}\\s*\\(`).test(source),
  );

  if (missing.length > 0) {
    console.error('❌ App Builder function export check failed.');
    console.error(`Missing exports in ${FILE_TO_CHECK}: ${missing.join(', ')}`);
    process.exit(1);
  }

  console.log('✅ App Builder function export check passed.');
  console.log(`Verified ${requiredExports.length} API functions in ${FILE_TO_CHECK}.`);
}

main().catch((error) => {
  console.error('❌ Health check script failed to execute.');
  console.error(error);
  process.exit(1);
});
