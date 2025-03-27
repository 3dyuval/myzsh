# Zsh Configuration

This repository includes a comprehensive Zsh setup with aliases, functions, and integrations.

## Features

* **Custom Aliases**
  ```zsh
  # From /source/aliases.zsh
  # Git
  alias g="git"
  alias gst="git status"
  alias ga="git add"
  alias gc="git commit"
  
  # Python
  alias py="python"
  alias ipy="ipython"
  alias pipup="pip install --upgrade pip"
  
  # General
  alias l="ls -la"
  alias ..="cd .."
  ```

* **Useful Functions**
  ```zsh
  # From /source/functions.zsh
  # Example function - find and cd into directory
  function fcd() {
    local dir
    dir=$(find ${1:-.} -path '*/\.*' -prune -o -type d -print 2> /dev/null | fzf +m) && cd "$dir"
  }
  
  # Example function - git checkout branch with fzf
  function gcob() {
    local branches branch
    branches=$(git branch -a) && branch=$(echo "$branches" | fzf +s +m) && git checkout $(echo "$branch" | sed "s:.* remotes/origin/::" | sed "s:.* ::")
  }
  ```

* **Path Configuration**
  ```zsh
  # From /source/zshrc
  # Add local bins to PATH
  export PATH="$HOME/.local/bin:$PATH"
  
  # Python path
  export PATH="$HOME/.pyenv/bin:$PATH"
  eval "$(pyenv init -)"
  
  # Node.js path
  export PATH="$HOME/.nodenv/bin:$PATH"
  eval "$(nodenv init -)"
  ```

* **Integrations with Tools**
  ```zsh
  # From /source/zshrc
  # fzf integration
  [ -f ~/.fzf.zsh ] && source ~/.fzf.zsh
  
  # Starship prompt
  eval "$(starship init zsh)"
  
  # Ripgrep config
  export RIPGREP_CONFIG_PATH=~/.ripgreprc
  ```

## Enable/Disable

```zsh
# Enable ZSH configuration
../../my.zsh --zsh

# Disable ZSH configuration
../../my.zsh  # Run without the --zsh flag
```

## Implementation

The Zsh configuration is split across several files:
- Main config: `zshrc`
- Profile settings: `zprofile`
- Aliases: `aliases.zsh`
- Functions: `functions.zsh`

These files are automatically symlinked to the home directory by the installation script:
- `zshrc` → `~/.zshrc`
- `zprofile` → `~/.zprofile`
- `aliases.zsh` → `~/.aliases.zsh`
- `functions.zsh` → `~/.functions.zsh`