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
      console.log(`File does not exist: ${expandedTarget}`);
      return false;
    }
    
    // Check if it's a symlink
    const stats = fs.lstatSync(expandedTarget);
    if (!stats.isSymbolicLink()) {
      console.log(`Not a symlink: ${expandedTarget}`);
      return false;
    }
    
    // If source path provided, check if symlink points to it
    if (sourcePath) {
      const expandedSource = sourcePath.replace(/^~/, os.homedir());
      const linkTarget = fs.readlinkSync(expandedTarget);
      const resolvedTarget = path.resolve(path.dirname(expandedTarget), linkTarget);
      const resolvedSource = path.resolve(expandedSource);
      
      console.log(`Symlink target: ${resolvedTarget}`);
      console.log(`Expected source: ${resolvedSource}`);
      
      return resolvedTarget === resolvedSource;
    }
    
    console.log(`Symlink exists: ${expandedTarget}`);
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
  
  console.log('\nChecking zsh feature');
  if (
    isSymlinkExists(`${homeDir}/.zshrc`) ||
    isSymlinkExists(`${homeDir}/.aliases.zsh`) ||
    isSymlinkExists(`${homeDir}/.functions.zsh`) ||
    isSymlinkExists(`${homeDir}/.zprofile`)
  ) {
    enabledFeatures.push('zsh');
  }
  
  console.log('\nChecking nvim feature');
  if (isSymlinkExists(`${homeDir}/.config/nvim`)) {
    enabledFeatures.push('nvim');
  }
  
  console.log('\nChecking git feature');
  if (isSymlinkExists(`${homeDir}/.gitconfig`)) {
    enabledFeatures.push('git');
  }
  
  console.log('\nChecking starship feature');
  if (isSymlinkExists(`${homeDir}/.config/starship.toml`)) {
    enabledFeatures.push('starship');
  }
  
  console.log('\nChecking ripgrep feature');
  if (isSymlinkExists(`${homeDir}/.ripgreprc`)) {
    enabledFeatures.push('ripgrep');
  }
  
  console.log('\nChecking bat feature');
  if (
    isSymlinkExists(`${homeDir}/.config/bat/themes/Solarized (dark).tmTheme`) ||
    fs.existsSync(`${homeDir}/.config/bat/config`)
  ) {
    enabledFeatures.push('bat');
  }
  
  console.log('\nChecking misc feature');
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

// Run a detailed feature detection test
console.log('Feature Detection Test');
console.log('---------------------');
console.log('Home directory:', os.homedir());
console.log('Current working directory:', process.cwd());

const enabledFeatures = getEnabledFeatures();
console.log('\nSummary of enabled features:', enabledFeatures);