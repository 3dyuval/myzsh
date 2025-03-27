# Starship Prompt Configuration

This repository includes customization for the Starship prompt, a minimal, fast, and customizable prompt for any shell.

## Features

* **Prompt Format**
  ```toml
  # From /source/starship.toml
  format = """
  $username\
  $hostname\
  $directory\
  $git_branch\
  $git_state\
  $git_status\
  $cmd_duration\
  $line_break\
  $python\
  $character"""
  ```
  Example: Creates a clean, informative prompt with git info and Python environment details

* **Directory Display**
  ```toml
  # From /source/starship.toml
  [directory]
  truncation_length = 8
  truncate_to_repo = true
  style = "blue bold"
  ```
  Example: Shows the current directory with custom truncation and styling

* **Git Branch Configuration**
  ```toml
  # From /source/starship.toml
  [git_branch]
  symbol = "🌱 "
  truncation_length = 4
  style = "bold purple"
  ```
  Example: Displays the git branch with a custom symbol and styling

* **Git Status Indicators**
  ```toml
  # From /source/starship.toml
  [git_status]
  format = '([\[$all_status$ahead_behind\]]($style) )'
  style = "bold green"
  ```
  Example: Provides visual indicators of the repository status

* **Python Environment Display**
  ```toml
  # From /source/starship.toml
  [python]
  symbol = "🐍 "
  pyenv_version_name = true
  ```
  Example: Shows the active Python version with a custom symbol

* **Command Duration Tracking**
  ```toml
  # From /source/starship.toml
  [cmd_duration]
  min_time = 500
  format = "took [$duration](bold yellow)"
  ```
  Example: Shows execution time for commands that take longer than 500ms

## Enable/Disable

```zsh
# Enable Starship configuration
../../my.zsh --starship

# Disable Starship configuration
../../my.zsh  # Run without the --starship flag
```

## Implementation

The Starship configuration is stored in `starship.toml` and is automatically symlinked to `~/.config/starship.toml` by the installation script.

To use Starship with Zsh, the following is added to the `.zshrc`:
```zsh
# From /source/zshrc
eval "$(starship init zsh)"
```