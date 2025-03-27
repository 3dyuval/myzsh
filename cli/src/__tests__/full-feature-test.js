// This file creates our feature detection utility module
import fs from 'fs';
import path from 'path';

// Function to create the feature utility module
const writeFeatureUtilsFile = () => {
  const utilsDir = path.join(process.cwd(), 'src/utils');
  
  // Create utils directory if it doesn't exist
  if (!fs.existsSync(utilsDir)) {
    fs.mkdirSync(utilsDir, { recursive: true });
  }
  
  const featureUtilsPath = path.join(utilsDir, 'feature-utils.js');
  
  const featureUtilsCode = `
import fs from 'fs';
import os from 'os';
import path from 'path';

/**
 * Check if a symlink exists at the target path and points to the expected source path
 * @param targetPath The path where the symlink should be (e.g. ~/.zshrc)
 * @param sourcePath Optional path that the symlink should point to
 * @returns boolean indicating if the symlink exists and points to the source (if provided)
 */
export const isSymlinkExists = (targetPath, sourcePath) => {
  try {
    // Expand ~ to home directory
    const expandedTarget = targetPath.replace(/^~/, os.homedir());
    
    // Check if file exists
    if (!fs.existsSync(expandedTarget)) {
      return false;
    }
    
    // Check if it's a symlink
    const stats = fs.lstatSync(expandedTarget);
    if (!stats.isSymbolicLink()) {
      return false;
    }
    
    // If source path provided, check if symlink points to it
    if (sourcePath) {
      const expandedSource = sourcePath.replace(/^~/, os.homedir());
      const linkTarget = fs.readlinkSync(expandedTarget);
      return path.resolve(path.dirname(expandedTarget), linkTarget) === path.resolve(expandedSource);
    }
    
    return true;
  } catch (error) {
    console.error(\`Error checking symlink: \${error}\`);
    return false;
  }
};

/**
 * Get the list of currently enabled features by checking for their symlinks
 * @returns Array of enabled feature names
 */
export const getEnabledFeatures = () => {
  const enabledFeatures = [];
  const homeDir = os.homedir();
  
  // Check for zsh feature (multiple symlinks)
  if (
    isSymlinkExists(\`\${homeDir}/.zshrc\`) ||
    isSymlinkExists(\`\${homeDir}/.aliases.zsh\`) ||
    isSymlinkExists(\`\${homeDir}/.functions.zsh\`) ||
    isSymlinkExists(\`\${homeDir}/.zprofile\`)
  ) {
    enabledFeatures.push('zsh');
  }
  
  // Check for nvim feature
  if (isSymlinkExists(\`\${homeDir}/.config/nvim\`)) {
    enabledFeatures.push('nvim');
  }
  
  // Check for git feature
  if (isSymlinkExists(\`\${homeDir}/.gitconfig\`)) {
    enabledFeatures.push('git');
  }
  
  // Check for starship feature
  if (isSymlinkExists(\`\${homeDir}/.config/starship.toml\`)) {
    enabledFeatures.push('starship');
  }
  
  // Check for ripgrep feature
  if (isSymlinkExists(\`\${homeDir}/.ripgreprc\`)) {
    enabledFeatures.push('ripgrep');
  }
  
  // Check for bat feature - it's more complex, but check for themes folder
  if (
    isSymlinkExists(\`\${homeDir}/.config/bat/themes/Solarized (dark).tmTheme\`) ||
    fs.existsSync(\`\${homeDir}/.config/bat/config\`)
  ) {
    enabledFeatures.push('bat');
  }
  
  // Check for misc feature (multiple symlinks)
  if (
    isSymlinkExists(\`\${homeDir}/.ctags\`) ||
    isSymlinkExists(\`\${homeDir}/.screenrc\`) ||
    isSymlinkExists(\`\${homeDir}/.hushlogin\`) ||
    isSymlinkExists(\`\${homeDir}/.alexrc\`) ||
    isSymlinkExists(\`\${homeDir}/.config/npm/default-npm-packages\`)
  ) {
    enabledFeatures.push('misc');
  }
  
  return enabledFeatures;
};

/**
 * Execute a shell command to toggle features
 * @param command The shell command to execute
 * @returns Promise that resolves when the command completes
 */
export const executeShellCommand = async (command) => {
  const { exec } = require('child_process');
  
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(\`Error executing command: \${error.message}\`);
        reject(error);
        return;
      }
      if (stderr) {
        console.error(\`Command stderr: \${stderr}\`);
      }
      console.log(\`Command output: \${stdout}\`);
      resolve(stdout);
    });
  });
};
`;

  fs.writeFileSync(featureUtilsPath, featureUtilsCode);
  console.log(`Created feature utils file at: ${featureUtilsPath}`);
  return featureUtilsPath;
};

// Create the utility file
writeFeatureUtilsFile();

console.log('\nFeature Detection Integration');
console.log('----------------------------');
console.log('Successfully created the feature-utils.js module with:');
console.log('1. isSymlinkExists() - Checks if a symlink exists at a path');
console.log('2. getEnabledFeatures() - Detects which features are currently enabled');
console.log('3. executeShellCommand() - Executes shell commands to toggle features');

console.log('\nTo integrate this with the CLI application:');
console.log('1. Import these functions in cli.tsx');
console.log('2. Use useEffect to load enabled features on component mount');
console.log('3. Update the handleConfirm function to execute the my.zsh script');
console.log('4. Update the UI to show current feature status and loading state');

console.log('\nThe implementation will:');
console.log('- Correctly detect which features are currently enabled');
console.log('- Allow toggling features on/off through the UI');
console.log('- Execute the actual shell script with selected features');
console.log('- Provide real-time feedback about the current feature status');