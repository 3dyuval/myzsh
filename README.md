# myzsh

## Installation

### Clone this repository
```bash
git clone https://github.com/3dyuval/myzsh.git
cd myzsh
```

### SH and Oh My Posh environment
- [Configuration](CONFIG.md)
```bash
./_install.sh
```
**Then restart your terminal to apply all changes.**

### Add permissions
```bash
chmod +x my.zsh
```

### (Optional- for MacOS) Install packages with Homebrew
```bash
brew bundle
```


## Features
This repository includes configuration for:

### Installs ZSH aliases and functions
- [ZSH](ZSH.md)
```zsh
sudo ./my.zsh --zsh
```
### Neovim plugins / custom keymaps
- [Neovim](NEOVIM.md)
```zsh
./my.zsh --nvim
```
### Git useful defaults and aliases
- [Git](GIT.md)
```zsh
./my.zsh --git
```
### Starship cross-shell prompt with custom theme
- [Starship](STARSHIP.md)
```zsh
./my.zsh --starship
```
### Ripgrep custom file type definitions
- [Ripgrep](RIPGREP.md)
```zsh
./my.zsh --ripgrep
```
### Development packages for macOS/Linux
- [Homebrew](HOMEBREW.md)
```zsh
brew bundle --verbose
```

#### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.