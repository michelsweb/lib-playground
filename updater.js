import { execSync } from 'child_process';
import fs from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
const targetDir = args[0] || '.'; // Default to the current directory
const cleanInstall = args.includes('--clean');

const packageJsonPath = path.join(targetDir, 'package.json');

if (!fs.existsSync(packageJsonPath)) {
  console.error(`package.json not found in ${targetDir}`);
  process.exit(1);
}

console.log(`Updating dependencies in: ${targetDir}`);

const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

// Helper function to update dependencies with the latest actual versions
const updateDeps = (deps, type) => {
  if (!deps) return;

  console.log(`Fetching latest versions for ${type}...`);

  Object.keys(deps).forEach(dep => {
    try {
      const latestVersion = execSync(`npm show ${dep} version`).toString().trim();
      deps[dep] = `^${latestVersion}`; // Use caret to allow minor updates
      console.log(`✔ Updated ${dep} to ${latestVersion}`);
    } catch (error) {
      console.error(`✖ Failed to fetch latest version for ${dep}: ${error.message}`);
    }
  });
};

// Update dependencies and devDependencies
updateDeps(packageJson.dependencies, 'dependencies');
updateDeps(packageJson.devDependencies, 'devDependencies');

// Write updated package.json
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');

console.log('package.json updated with latest versions.');

// Optionally remove node_modules and package-lock.json
if (cleanInstall) {
  console.log('Removing node_modules and package-lock.json...');
  execSync(`rm -rf ${path.join(targetDir, 'node_modules')} ${path.join(targetDir, 'package-lock.json')}`, { stdio: 'inherit' });
}

// Run npm install
console.log('Installing updated dependencies...');
execSync(`npm install --prefix ${targetDir}`, { stdio: 'inherit' });

console.log('All dependencies updated successfully!');
