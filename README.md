# ZSH Configuration and Dotfiles

A comprehensive setup for ZSH with configuration files for various developer tools and utilities.

## Quick Start

### Installation

```bash
# Clone this repository
git clone https://github.com/3dyuval/myzsh.git
cd myzsh

# Install ZSH and Oh My Posh 
chmod +x install-zsh-ohmyposh.sh
./install-zsh-ohmyposh.sh

# Install
./my.zsh --all
```

```bash
# (Optional- for MacOS) Install packages with Homebrew
brew bundle
```
After installation, restart your terminal to apply all changes.

## Features

This repository includes configuration for:

- [ZSH](ZSH.md)
```bash
# Installs ZSH shell configuration with aliases and functions
./my.zsh --zsh
```
- [Neovim](NEOVIM.md)
```bash
# Configures Neovim editor with plugins and custom keymaps
./my.zsh --nvim
```
- [Git](GIT.md)
```bash
# Sets up Git version control with useful defaults and aliases
./my.zsh --git
```
- [Starship](STARSHIP.md)
```bash
# Configures Starship cross-shell prompt with custom theme
./my.zsh --starship
```
- [Ripgrep](RIPGREP.md)
```bash
# Installs Ripgrep configuration with custom file type definitions
./my.zsh --ripgrep
```
- [Homebrew](HOMEBREW.md)
```bash
# Installs essential development packages for macOS/Linux
brew bundle --verbose
```
- [Configuration](CONFIG.md)
```bash
# Sets up ZSH and Oh My Posh environment
./_install.sh --all
```

## Customization (Work in Progress)

> **Note**: Feature-specific opt-in instructions are coming soon. This will allow you to selectively enable only the components you need.
> 
> Check back for updates on customizable installation options.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.