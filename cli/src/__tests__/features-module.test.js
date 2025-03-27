import * as featureUtils from '../utils/feature-utils.js';
import * as os from 'os';
import * as fs from 'fs';
import * as path from 'path';

// Log the detected features
console.log('Feature Detection Test');
console.log('=====================');
console.log('Home directory:', os.homedir());

try {
  const enabledFeatures = featureUtils.getEnabledFeatures();
  console.log('Currently enabled features:', enabledFeatures);
  
  if (enabledFeatures.length === 0) {
    console.log('No features are currently enabled.');
  } else {
    console.log('Checking each feature:');
    
    // Check each feature's symlinks
    if (enabledFeatures.includes('zsh')) {
      console.log('\nZSH:');
      console.log('- .zshrc:', featureUtils.isSymlinkExists(`${os.homedir()}/.zshrc`));
      console.log('- .aliases.zsh:', featureUtils.isSymlinkExists(`${os.homedir()}/.aliases.zsh`));
      console.log('- .functions.zsh:', featureUtils.isSymlinkExists(`${os.homedir()}/.functions.zsh`));
      console.log('- .zprofile:', featureUtils.isSymlinkExists(`${os.homedir()}/.zprofile`));
    }
    
    if (enabledFeatures.includes('nvim')) {
      console.log('\nNeovim:');
      console.log('- .config/nvim:', featureUtils.isSymlinkExists(`${os.homedir()}/.config/nvim`));
    }
    
    if (enabledFeatures.includes('git')) {
      console.log('\nGit:');
      console.log('- .gitconfig:', featureUtils.isSymlinkExists(`${os.homedir()}/.gitconfig`));
    }
    
    if (enabledFeatures.includes('starship')) {
      console.log('\nStarship:');
      console.log('- .config/starship.toml:', featureUtils.isSymlinkExists(`${os.homedir()}/.config/starship.toml`));
    }
    
    if (enabledFeatures.includes('ripgrep')) {
      console.log('\nRipgrep:');
      console.log('- .ripgreprc:', featureUtils.isSymlinkExists(`${os.homedir()}/.ripgreprc`));
    }
    
    if (enabledFeatures.includes('bat')) {
      console.log('\nBat:');
      console.log('- .config/bat/themes/Solarized (dark).tmTheme:', 
        featureUtils.isSymlinkExists(`${os.homedir()}/.config/bat/themes/Solarized (dark).tmTheme`));
      console.log('- .config/bat/config file exists:', 
        fs.existsSync(`${os.homedir()}/.config/bat/config`));
    }
    
    if (enabledFeatures.includes('misc')) {
      console.log('\nMisc:');
      console.log('- .ctags:', featureUtils.isSymlinkExists(`${os.homedir()}/.ctags`));
      console.log('- .screenrc:', featureUtils.isSymlinkExists(`${os.homedir()}/.screenrc`));
      console.log('- .hushlogin:', featureUtils.isSymlinkExists(`${os.homedir()}/.hushlogin`));
      console.log('- .alexrc:', featureUtils.isSymlinkExists(`${os.homedir()}/.alexrc`));
      console.log('- .config/npm/default-npm-packages:', 
        featureUtils.isSymlinkExists(`${os.homedir()}/.config/npm/default-npm-packages`));
    }
  }
  
  console.log('\nTest completed successfully!');
} catch (error) {
  console.error('Error during feature detection:', error);
}