# Installation Process

This repository includes an installation script to set up all dotfiles with minimal effort.

## Current Installation Process

The `install.zsh` script performs the following actions:

1. **Neovim Configuration Setup**:
   - Creates a symlink from the repo's nvim directory to `~/.config/nvim`
   - Uses interactive mode to prompt before overwriting existing files

2. **Dotfiles Symlinking**:
   - Iterates through all files in the `source` directory
   - Creates symlinks for each file in the home directory with a dot prefix
   - Example: `source/zshrc` → `~/.zshrc`
   - Checks if symlinks already exist and only creates new ones if needed

3. **Invoke Completion Setup**:
   - Symlinks `invoke-completion.zsh` to `~/.zsh-custom/invoke-completion.zsh`
   - This enables shell completion for the invoke task runner

4. **Bat Configuration** (if installed):
   - Creates a themes directory if it doesn't exist
   - Symlinks the Solarized dark theme for bat
   - Configures bat to use this theme and disable paging
   - Rebuilds the bat cache

## Features

* **Neovim Configuration Setup**
  ```zsh
  # From /install.zsh
  ln -i -s $project_dir/nvim ${HOME}/.config/nvim
  ```
  Example: Symlinks the Neovim configuration to `~/.config/nvim`

* **Dotfiles Symlink Creation**
  ```zsh
  # From /install.zsh
  for dotfile in $(ls); do
      local full_path="$(cd "$(dirname "$dotfile")" && pwd)/$(basename "$dotfile")"
      if [ "$(readlink -- "${HOME}/.$dotfile")" != "$full_path" ]; then
          ln -i -s $full_path ${HOME}/.$dotfile
      fi
  done
  ```
  Example: Creates symbolic links from `source/zshrc` to `~/.zshrc` preserving the files in the repo

* **Shell Completion Setup**
  ```zsh
  # From /install.zsh
  ln -sf $invoke_completion $custom_dir/$INVOKE_COMPLETION
  ```
  Example: Sets up shell completion for the invoke task runner

* **Configuration for Tools**
  ```zsh
  # From /install.zsh
  if [ -x "$(command -v bat)" ]; then
      readonly local themes_dir=$(bat --config-dir)/themes
      readonly local bat_theme_name="Solarized (dark)"
      readonly local bat_theme="$bat_theme_name.tmTheme"
      mkdir -p $themes_dir
      local bat_theme_full_path="$(cd "$(dirname "$bat_theme")" && pwd)/$(basename "$bat_theme")"
      ln -sf $bat_theme_full_path $themes_dir/$bat_theme
      echo --theme="\"$bat_theme_name\"" > $(bat --config-file)
      echo "--paging=never" >> $(bat --config-file)
      bat cache --build
  fi
  ```
  Example: Configures the bat tool with a Solarized theme if installed

## Implementation

The installation process is managed by `/install.zsh`. To install:

1. For Zsh and Oh My Posh (if needed):
   ```bash
   chmod +x install-zsh-ohmyposh.sh
   ./install-zsh-ohmyposh.sh
   ```

2. Clone the repository:
   ```bash
   git clone https://github.com/username/dotfiles.git
   cd dotfiles
   ```

3. Run the installation script:
   ```bash
   ./install.zsh
   ```

4. For Homebrew packages (optional):
   ```bash
   brew bundle
   ```

The installation is non-destructive - it creates symlinks to the repository files rather than copying them, allowing updates to be pulled from git.