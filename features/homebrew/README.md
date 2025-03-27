# Homebrew Configuration

This repository includes a Brewfile for managing packages, applications, and dependencies with Homebrew.

## Features

* **Core Utilities**
  ```ruby
  # From /Brewfile
  brew "coreutils"
  brew "findutils"
  brew "gnu-sed"
  brew "grep"
  ```
  Example: Installs GNU versions of essential command-line tools

* **Development Tools**
  ```ruby
  # From /Brewfile
  brew "git"
  brew "git-lfs"
  brew "node"
  brew "python"
  brew "go"
  brew "rust"
  ```
  Example: Installs programming languages and version control tools

* **Shell Utilities**
  ```ruby
  # From /Brewfile
  brew "zsh"
  brew "starship"
  brew "fzf"
  brew "ripgrep"
  brew "bat"
  brew "fd"
  brew "jq"
  ```
  Example: Installs modern shell tools for improved productivity

* **Applications (Casks)**
  ```ruby
  # From /Brewfile
  cask "iterm2"
  cask "visual-studio-code"
  cask "docker"
  cask "rectangle"
  ```
  Example: Installs GUI applications like terminal emulators and editors

* **Fonts**
  ```ruby
  # From /Brewfile
  tap "homebrew/cask-fonts"
  cask "font-fira-code"
  cask "font-jetbrains-mono"
  ```
  Example: Installs programming fonts with ligatures

## Enable/Install

```zsh
# Install Homebrew packages
brew bundle --file=features/homebrew/Brewfile
```

## Implementation

The Homebrew configuration is stored in `Brewfile` within this directory.

To install all packages listed in the Brewfile:
```bash
brew bundle --file=features/homebrew/Brewfile
```

This is not automatically run by the installation script and should be executed manually after cloning the repository.