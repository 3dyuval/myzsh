import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';

/**
 * Check if a symlink exists at the target path and points to the expected source path
 * @param targetPath The path where the symlink should be (e.g. ~/.zshrc)
 * @param sourcePath Optional path that the symlink should point to
 * @returns boolean indicating if the symlink exists and points to the source (if provided)
 */
export const isSymlinkExists = (targetPath: string, sourcePath?: string): boolean => {
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

/**
 * Get the list of currently enabled features by checking for their symlinks
 * @returns Array of enabled feature names
 */
export const getEnabledFeatures = (): string[] => {
  const enabledFeatures: string[] = [];
  const homeDir = os.homedir();
  
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

/**
 * Execute a shell command to toggle features
 * @param command The shell command to execute
 * @returns Promise that resolves when the command completes
 */
export const executeShellCommand = async (command: string): Promise<void> => {
  // We need to use require here because the Node.js types don't include exec in a way that works well with ESM
  const { exec } = require('child_process');
  
  return new Promise((resolve, reject) => {
    exec(command, (error: Error | null, stdout: string, stderr: string) => {
      if (error) {
        console.error(`Error executing command: ${error.message}`);
        reject(error);
        return;
      }
      if (stderr) {
        console.error(`Command stderr: ${stderr}`);
      }
      console.log(`Command output: ${stdout}`);
      resolve();
    });
  });
};