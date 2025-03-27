# myzsh: Quick Start Guide

### 1. Clone the Repository
```bash
git clone https://github.com/3dyuval/myzsh.git
cd myzsh
```

### 2. Install a Shell and Prompt (if needed)

Choose one of the following options:

```bash
# Option A: Install ZSH and Oh My Posh
chmod +x scripts/install.oh-my-posh.sh
./scripts/install.oh-my-posh.sh

# Option B: Install Starship prompt
chmod +x scripts/install.starship.sh
./scripts/install.starship.sh
```
**Restart your terminal after this step**

### 3. Enable the Features You Want
```zsh
# Make the installer executable
chmod +x my.zsh
```

```zsh
# Example: Enable specific features
./my.zsh --zsh --git --starship

# Or enable everything at once
./my.zsh --all
```

### 4. Sync Across Machines
Once you've customized your configuration, commit your changes to keep everything in sync:
```bash
git add .
git commit -m "Update my configuration"
git push
```

On a new machine, just clone and repeat steps 2-3 to get your familiar environment back.

## Available Features

Choose which features to enable based on your needs:

| Feature | Description | Installation Command |
|---------|-------------|----------------------|
| [ZSH](features/zsh/README.md) | Shell configuration with aliases and functions | `./my.zsh --zsh` |
| [Neovim](features/neovim/README.md) | Text editor with plugins and custom keymaps | `./my.zsh --nvim` |
| [Git](features/git/README.md) | Version control with useful defaults and aliases | `./my.zsh --git` |
| [Starship](features/starship/README.md) | Cross-shell prompt with custom theme | `./my.zsh --starship` |
| [Ripgrep](features/ripgrep/README.md) | Search tool with custom file type definitions | `./my.zsh --ripgrep` |
| [Bat](features/bat/README.md) | Cat alternative with syntax highlighting | `./my.zsh --bat` |
| [Misc](features/misc/README.md) | Various utility configurations | `./my.zsh --misc` |

### Prompt Systems & Themes

This repository supports two powerful prompt systems with different approaches to customization:

#### Starship Prompt

**Starship** is a minimal, blazing-fast prompt written in Rust that works across any shell.

- **Installation**: `./scripts/install.starship.sh`
- **Activation**: `./my.zsh --starship`
- **Features**:
  - Cross-shell compatibility (works in Bash, Zsh, Fish, etc.)
  - Shows git status, runtime environments, system info
  - Single configuration file in TOML format
  - Simple, declarative configuration
  - Extremely fast performance

The Starship configuration in this repo shows information like:
- Current directory
- Git branch & status
- Python, Node.js, and Ruby environments
- Kubernetes context and namespace
- AWS profile

#### Oh My Posh

**Oh My Posh** is a prompt theme engine that focuses on extensive visual customization.

- **Installation**: `./scripts/install.oh-my-posh.sh`
- **Available Themes**:
  - **Atomic**: Modern, colorful theme with detailed git info
  - **Dracula**: Dark theme using the popular Dracula palette
  - **Nord**: Clean, minimal theme using Nord colors
  - **Agnoster**: Rich powerline-style with extensive segments

- **Usage**: After installation, add this to your shell profile:
  ```bash
  eval "$(oh-my-posh init zsh --config ~/WebstormProjects/dotfiles/themes/ohmyposh/dracula.omp.json)"
  ```

> **Important**: Use either Starship OR Oh My Posh, not both simultaneously.

#### Terminal Color Schemes

| Type | Themes | Location |
|------|--------|----------|
| iTerm2 | Tokyo Night Storm | `themes/iterm/tokyonight_storm.itermcolors` |

See [themes/README.md](themes/README.md) for more detailed installation instructions.

### Homebrew Packages (Optional for macOS/Linux)

Install common development tools:
```bash
brew bundle --file=features/homebrew/Brewfile
```

Click on any feature name above to see detailed documentation about that feature.

## How It Works

This repository uses a simple but powerful approach:

1. **Modular Organization**: Each tool has its own directory in `features/`
2. **Symbolic Links**: The installer creates links from your home directory to these files
3. **Feature Flags**: Enable only what you need with `--feature` flags
4. **Instant Updates**: Edit files in the repo, changes apply immediately via symlinks
5. **Version Control**: Keep your configuration in sync across machines

## Directory Structure

```
dotfiles/
├── features/          # Configuration files organized by feature
│   ├── zsh/           # ZSH configuration 
│   ├── neovim/        # Neovim configuration
│   └── ...            # Other feature configurations
├── scripts/           # Utility scripts
└── my.zsh             # Main installation script with feature flags
```

## Advanced Usage

### Installation Options

```bash
# See all available options
./my.zsh --help

# Install specific combinations
./my.zsh --zsh --git --starship

# Install everything
./my.zsh --all
```

### Feature Management

- **Enable a feature**: Creates symlinks from your home directory to config files
- **Disable a feature**: Removes those symlinks (your original configs remain untouched)
- **Update configs**: Edit files in the repository; changes apply instantly

## Extending Your Setup

Want to add your own configurations?

1. Create a new directory in `features/` for your tool
2. Add your config files and a README.md
3. Update `my.zsh` to support your new feature:
   - Add an entry to the `FEATURES` array
   - Create an installation function
   - Update the help message

Detailed instructions are available in [INSTALL.md](INSTALL.md).

## Troubleshooting

### Existing Files
If the installer asks about existing files:
- `y` = Replace with symlink (use repo version)
- `n` = Keep your existing file (skip this config)

### Missing Files
If you see "file not found" warnings:
- Check if the file exists in your repo
- Verify the file path in `my.zsh`

## License

[MIT License](LICENSE)