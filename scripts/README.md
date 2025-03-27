# Utility Scripts

This directory contains utility scripts for installing and configuring various tools.

## Contents

- `install.oh-my-posh.sh` - Installs ZSH and Oh My Posh
- `install.starship.sh` - Installs Starship prompt
- `install.zsh` - Original installation script (legacy)

## Usage

### Installing ZSH and Oh My Posh

```bash
chmod +x scripts/install.oh-my-posh.sh
./scripts/install.oh-my-posh.sh
```

This script detects your operating system and installs ZSH and Oh My Posh accordingly.

### Installing Starship Prompt

```bash
chmod +x scripts/install.starship.sh
./scripts/install.starship.sh
```

This script detects your operating system and installs Starship prompt accordingly.

## Choosing a Prompt

This repository supports two prompt systems:

1. **Starship** - A minimal, blazing-fast, and infinitely customizable prompt for any shell
2. **Oh My Posh** - A prompt theme engine for any shell

You should choose one or the other, not both. After installation:

- For Starship: `./my.zsh --starship`
- For Oh My Posh: Manually add the Oh My Posh initialization to your shell config

See the main [README.md](../README.md) for more details on both prompt systems.