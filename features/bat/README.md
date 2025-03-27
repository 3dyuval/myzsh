# Bat Configuration

This directory contains themes and configuration for [bat](https://github.com/sharkdp/bat), a cat clone with syntax highlighting and Git integration.

## Contents

- `themes/` - Color themes for syntax highlighting
  - `Solarized (dark).tmTheme` - Solarized Dark theme for bat

## Installation

To install bat configuration:

```bash
./my.zsh --bat
```

This will:

1. Copy the theme to your bat config directory
2. Set up the default theme and options
3. Rebuild the bat cache

## Enable/Disable

```zsh
# Enable bat configuration
../../my.zsh --bat

# Disable bat configuration
../../my.zsh  # Run without the --bat flag
```

## Usage

Once installed, bat will use the Solarized Dark theme and disable paging by default.
