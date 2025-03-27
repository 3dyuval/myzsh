# Setting Up Starship Prompt

Starship is a minimal, fast, and customizable prompt for any shell. This guide will help you set it up with this dotfiles repository.

## What is Starship?

Starship is a cross-shell prompt that:
- Shows information you need while keeping the prompt clean and minimal
- Works with any shell (Bash, Zsh, Fish, etc.)
- Is fast and efficient
- Is highly customizable

## Installation

### 1. Install Starship

First, install Starship on your system:

```bash
# On macOS
brew install starship

# On Ubuntu/Debian
curl -sS https://starship.rs/install.sh | sh

# On Windows with Chocolatey
choco install starship
```

### 2. Enable Starship in this dotfiles repo

```bash
./my.zsh --starship
```

This will create a symlink from this repository's `features/starship/starship.toml` to `~/.config/starship.toml`.

## Configuration

The Starship configuration in this repository:

- Shows git branch and status information
- Displays current directory
- Shows Python, Node.js, and Ruby environments
- Indicates Kubernetes context and namespace
- Includes AWS profile information
- Shows command status
- Displays shell nesting level

## Using with ZSH

When you enable both ZSH and Starship features:

```bash
./my.zsh --zsh --starship
```

Starship will automatically be initialized in your ZSH configuration through the Oh My ZSH Starship plugin.

## Alternative to Oh My Posh

Starship and Oh My Posh serve similar purposes - they both enhance your terminal prompt. Key differences:

- **Starship** is written in Rust, works across any shell, and has a more minimal design philosophy
- **Oh My Posh** has more elaborate themes and visual options by default

To use Oh My Posh instead of Starship:

1. Install Oh My Posh following the [themes/README.md](themes/README.md) instructions
2. Disable the Starship feature: `./my.zsh --zsh` (without the `--starship` flag)
3. Add this to your shell profile:
   ```bash
   eval "$(oh-my-posh init zsh --config ~/WebstormProjects/dotfiles/themes/ohmyposh/dracula.omp.json)"
   ```

## Customizing Starship

To modify the Starship configuration:

1. Edit `features/starship/starship.toml`
2. The changes will automatically apply to your terminal

### Common customizations:

1. **Change the prompt symbol**:
   ```toml
   [character]
   success_symbol = "[➜](bold green)"
   error_symbol = "[✗](bold red)"
   ```

2. **Modify directory display**:
   ```toml
   [directory]
   truncation_length = 3
   truncate_to_repo = true
   ```

3. **Add or remove modules**:
   Modify the `format` string at the top of the file to add or remove components.

## Troubleshooting

- **Icons not displaying**: Install a [Nerd Font](https://www.nerdfonts.com/) and configure your terminal to use it
- **Slow prompt**: Disable modules you don't need in the `format` string
- **Conflicts with other prompts**: Make sure you're not loading other prompt systems (like Oh My Posh) simultaneously

## Resources

- [Starship Documentation](https://starship.rs/guide/)
- [Starship Configuration](https://starship.rs/config/)
- [Starship GitHub Repository](https://github.com/starship/starship)