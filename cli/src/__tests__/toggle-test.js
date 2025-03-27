import fs from 'fs';
import os from 'os';
import path from 'path';
import { exec } from 'child_process';
import util from 'util';

const execPromise = util.promisify(exec);

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
  
  // Check for bat feature
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

// Mock shell command execution
const executeShellCommand = async (command) => {
  try {
    console.log(`Executing: ${command}`);
    const { stdout, stderr } = await execPromise(command);
    if (stderr) {
      console.error(`Command stderr: ${stderr}`);
    }
    return stdout;
  } catch (error) {
    console.error(`Error executing command: ${error.message}`);
    throw error;
  }
};

// Simulate feature toggle
const toggleFeature = async (feature, enable) => {
  const scriptPath = '/home/yuval/WebstormProjects/dotfiles/my.zsh';
  
  try {
    // Build the command
    const command = enable ? 
      `${scriptPath} --${feature}` : 
      `${scriptPath} --disable-all`;
    
    // Execute the command
    await executeShellCommand(command);
    
    // Check if the feature is now enabled/disabled as expected
    const enabledFeatures = getEnabledFeatures();
    const isEnabled = enabledFeatures.includes(feature);
    
    console.log(`Feature ${feature} is now ${isEnabled ? 'enabled' : 'disabled'}`);
    
    return isEnabled === enable;
  } catch (error) {
    console.error(`Error toggling feature ${feature}: ${error}`);
    return false;
  }
};

// Run a simple test of the toggle functionality
const runTest = async () => {
  console.log('Test: Feature Toggle Functionality');
  console.log('---------------------------------');
  
  // Get initial state
  const initialFeatures = getEnabledFeatures();
  console.log('Initial enabled features:', initialFeatures);
  
  // Test a single feature - we'll use zsh as an example
  const testFeature = 'zsh';
  const wasEnabled = initialFeatures.includes(testFeature);
  
  // Toggle feature OFF if it was ON, or ON if it was OFF
  console.log(`Testing toggle ${testFeature} to ${!wasEnabled ? 'ON' : 'OFF'}`);
  const success = await toggleFeature(testFeature, !wasEnabled);
  
  // Verify result
  console.log(`Toggle test ${success ? 'PASSED' : 'FAILED'}`);
  
  // Restore original state
  console.log(`Restoring original state: ${testFeature} to ${wasEnabled ? 'ON' : 'OFF'}`);
  await toggleFeature(testFeature, wasEnabled);
  
  // Final verification
  const finalFeatures = getEnabledFeatures();
  console.log('Final enabled features:', finalFeatures);
  
  const restoredCorrectly = 
    wasEnabled === finalFeatures.includes(testFeature);
  
  console.log(`Restore test ${restoredCorrectly ? 'PASSED' : 'FAILED'}`);
  console.log('Tests completed!');
};

// Run the test
runTest().catch(console.error);