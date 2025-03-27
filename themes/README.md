# Terminal Themes

This directory contains color themes for various terminal environments and tools.

## Contents

### Terminal Color Schemes
- `iterm/tokyonight_storm.itermcolors` - Tokyo Night Storm theme for iTerm2

### Oh My Posh Themes
- `ohmyposh/atomic.omp.json` - A modern, colorful theme with detailed git information
- `ohmyposh/dracula.omp.json` - Dark theme based on the popular Dracula color scheme
- `ohmyposh/nord.omp.json` - Clean, minimal theme using the Nord color palette
- `ohmyposh/agnoster.omp.json` - Rich powerline-style theme with extensive segment support

## Installation

### iTerm2 (macOS)

1. Open iTerm2
2. Go to Preferences > Profiles > Colors
3. Click on "Color Presets..." in the bottom right
4. Select "Import..."
5. Navigate to the `iterm` directory and select the `.itermcolors` file
6. Select the imported theme from the "Color Presets..." dropdown

### Oh My Posh

To use any of the Oh My Posh themes:

1. Make sure Oh My Posh is installed:
   ```bash
   # Windows (PowerShell)
   winget install JanDeDobbeleer.OhMyPosh -s winget

   # macOS
   brew install jandedobbeleer/oh-my-posh/oh-my-posh

   # Linux
   curl -s https://ohmyposh.dev/install.sh | bash -s
   ```

2. Apply a theme:
   ```bash
   # In your shell profile (e.g., .zshrc, .bashrc, etc.)
   eval "$(oh-my-posh init bash --config /path/to/dotfiles/themes/ohmyposh/dracula.omp.json)"
   # Replace "bash" with your shell (zsh, fish, powershell)
   # Replace "dracula" with the theme you want to use
   ```

3. Restart your terminal or reload your profile:
   ```bash
   source ~/.zshrc  # or .bashrc, etc.
   ```

4. [Optional] Install Nerd Fonts for proper icon display:
   ```bash
   # macOS
   brew tap homebrew/cask-fonts
   brew install font-hack-nerd-font

   # Other systems
   # Download from https://www.nerdfonts.com/font-downloads
   ```

## Creating Custom Themes

### Oh My Posh

To create your own Oh My Posh theme:

1. Start with an existing theme as a template
2. Edit the JSON configuration to customize segments, colors, and icons
3. See the [Oh My Posh documentation](https://ohmyposh.dev/docs/configuration/overview) for details
4. Test your theme with: `oh-my-posh init bash --config ./your-theme.omp.json | bash`
5. Once satisfied, save it to the `themes/ohmyposh` directory