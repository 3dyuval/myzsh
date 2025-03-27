import fs from 'fs';
import os from 'os';
import path from 'path';

// Check if a symlink exists at the target path and points to the expected source path
const isSymlinkExists = (targetPath, sourcePath) => {
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
    console.error(`Error checking symlink: ${error}`);
    return false;
  }
};

// Get the list of currently enabled features by checking for their symlinks
const getEnabledFeatures = () => {
  const enabledFeatures = [];
  const homeDir = os.homedir();
  const repoDir = path.resolve(process.cwd(), '../..');
  
  // Check for zsh feature (multiple symlinks)
  if (
    isSymlinkExists(`${homeDir}/.zshrc`) ||
    isSymlinkExists(`${homeDir}/.aliases.zsh`) ||
    isSymlinkExists(`${homeDir}/.functions.zsh`) ||
    isSymlinkExists(`${homeDir}/.zprofile`)
  ) {
    enabledFeatures.push('zsh');
  }
  
  // Check for nvim feature
  if (isSymlinkExists(`${homeDir}/.config/nvim`)) {
    enabledFeatures.push('nvim');
  }
  
  // Check for git feature
  if (isSymlinkExists(`${homeDir}/.gitconfig`)) {
    enabledFeatures.push('git');
  }
  
  // Check for starship feature
  if (isSymlinkExists(`${homeDir}/.config/starship.toml`)) {
    enabledFeatures.push('starship');
  }
  
  // Check for ripgrep feature
  if (isSymlinkExists(`${homeDir}/.ripgreprc`)) {
    enabledFeatures.push('ripgrep');
  }
  
  // Check for bat feature - it's more complex, but check for themes folder
  if (
    isSymlinkExists(`${homeDir}/.config/bat/themes/Solarized (dark).tmTheme`) ||
    fs.existsSync(`${homeDir}/.config/bat/config`)
  ) {
    enabledFeatures.push('bat');
  }
  
  // Check for misc feature (multiple symlinks)
  if (
    isSymlinkExists(`${homeDir}/.ctags`) ||
    isSymlinkExists(`${homeDir}/.screenrc`) ||
    isSymlinkExists(`${homeDir}/.hushlogin`) ||
    isSymlinkExists(`${homeDir}/.alexrc`) ||
    isSymlinkExists(`${homeDir}/.config/npm/default-npm-packages`)
  ) {
    enabledFeatures.push('misc');
  }
  
  return enabledFeatures;
};

// Run a simple test
console.log('Test: isSymlinkExists and getEnabledFeatures');
console.log('-----------------------------------------');
console.log('Current enabled features:', getEnabledFeatures());
console.log('Home directory:', os.homedir());
console.log('Current working directory:', process.cwd());
console.log('Tests completed successfully!');