#!/bin/bash
# This script installs zsh and Oh My Posh

set -e

echo "Installing Zsh and Oh My Posh..."

# Detect OS
if [[ "$OSTYPE" == "linux-gnu"* ]]; then
    # Linux
    if [ -f /etc/debian_version ]; then
        # Debian/Ubuntu
        sudo apt update
        sudo apt install -y zsh curl
    elif [ -f /etc/redhat-release ]; then
        # RHEL/CentOS/Fedora
        sudo yum install -y zsh curl
    elif [ -f /etc/arch-release ]; then
        # Arch Linux
        sudo pacman -Syu --noconfirm zsh curl
    else
        echo "Unsupported Linux distribution. Please install zsh manually."
        exit 1
    fi
elif [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    if ! command -v brew &> /dev/null; then
        echo "Homebrew not found. Installing Homebrew..."
        /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    fi
    brew install zsh
else
    echo "Unsupported operating system. Please install zsh manually."
    exit 1
fi

# Install Oh My Posh
if [[ "$OSTYPE" == "linux-gnu"* ]]; then
    curl -s https://ohmyposh.dev/install.sh | bash -s
elif [[ "$OSTYPE" == "darwin"* ]]; then
    brew install jandedobbeleer/oh-my-posh/oh-my-posh
fi

# Make zsh the default shell
if [ "$SHELL" != "$(which zsh)" ]; then
    echo "Changing default shell to zsh..."
    chsh -s "$(which zsh)"
fi

echo "Installation complete!"
echo "Please restart your terminal and run 'zsh' to start using your new shell."
echo "For Oh My Posh configuration, see: https://ohmyposh.dev/docs/configuration/overview"