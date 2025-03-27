# Git Configuration

This repository includes Git customizations for an enhanced version control experience.

## Features

* **User and Core Settings**
  ```
  # From /source/gitconfig
  [user]
    name = Your Name
    email = your.email@example.com
    
  [core]
    excludesfile = ~/.gitignore
    editor = nvim
    pager = delta
  ```
  Example: Provides default user information and sets Neovim as the default editor

* **Color Configuration**
  ```
  # From /source/gitconfig
  [color]
    ui = auto
    
  [color "branch"]
    current = yellow reverse
    local = yellow
    remote = green
  
  [color "diff"]
    meta = yellow bold
    frag = magenta bold
    old = red bold
    new = green bold
  ```
  Example: Enhances visual feedback with color-coded output for branches and diffs

* **Aliases for Common Operations**
  ```
  # From /source/gitconfig
  [alias]
    st = status
    ci = commit
    co = checkout
    br = branch
    df = diff
    lg = log --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset'
  ```
  Example: `git lg` provides a beautifully formatted log with commit graph

* **Default Branch Configuration**
  ```
  # From /source/gitconfig
  [init]
    defaultBranch = main
  ```
  Example: New repositories are initialized with "main" as the default branch

* **Push/Pull Behavior**
  ```
  # From /source/gitconfig
  [pull]
    rebase = true
    
  [push]
    default = current
  ```
  Example: Sets up safe defaults for pushing and pulling code

* **Git LFS Support**
  ```
  # From /source/gitconfig
  [filter "lfs"]
    clean = git-lfs clean -- %f
    smudge = git-lfs smudge -- %f
    process = git-lfs filter-process
    required = true
  ```
  Example: Enables Git Large File Storage for binary files

## Enable/Disable

```zsh
# Enable Git configuration
../../my.zsh --git

# Disable Git configuration
../../my.zsh  # Run without the --git flag
```

## Implementation

The Git configuration is stored in `gitconfig` and is automatically symlinked to `~/.gitconfig` by the installation script.

The config also includes support for local overrides:
```
# From gitconfig
[include]
  path = ~/.gitconfig.local
```
This allows for machine-specific settings without modifying the main configuration.