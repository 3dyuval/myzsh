#!/usr/bin/env bash

# Script to install Starship prompt on various platforms
# This script will detect your OS and install Starship accordingly

set -e  # Exit immediately if any command fails

# Text formatting
BOLD="\033[1m"
GREEN="\033[0;32m"
YELLOW="\033[0;33m"
BLUE="\033[0;34m"
RED="\033[0;31m"
RESET="\033[0m"

print_header() {
    echo -e "${BOLD}${BLUE}$1${RESET}"
    echo -e "${BLUE}$2${RESET}"
    echo
}

print_step() {
    echo -e "${BOLD}${GREEN}==>${RESET} ${BOLD}$1${RESET}"
}

print_warning() {
    echo -e "${BOLD}${YELLOW}Warning:${RESET} $1"
}

print_error() {
    echo -e "${BOLD}${RED}Error:${RESET} $1"
}

print_success() {
    echo -e "${BOLD}${GREEN}Success:${RESET} $1"
}

detect_os() {
    if [[ "$OSTYPE" == "linux-gnu"* ]]; then
        OS="linux"
        if [ -f /etc/os-release ]; then
            . /etc/os-release
            if [[ "$ID" == "ubuntu" || "$ID" == "debian" || "$ID_LIKE" == *"debian"* ]]; then
                PACKAGE_MANAGER="apt"
            elif [[ "$ID" == "fedora" || "$ID" == "rhel" || "$ID" == "centos" || "$ID_LIKE" == *"rhel"* ]]; then
                PACKAGE_MANAGER="dnf"
            elif [[ "$ID" == "arch" || "$ID_LIKE" == *"arch"* ]]; then
                PACKAGE_MANAGER="pacman"
            else
                PACKAGE_MANAGER="unknown"
            fi
        fi
    elif [[ "$OSTYPE" == "darwin"* ]]; then
        OS="macos"
        PACKAGE_MANAGER="brew"
    elif [[ "$OSTYPE" == "cygwin" || "$OSTYPE" == "msys" || "$OSTYPE" == "win32" ]]; then
        OS="windows"
        if command -v choco &> /dev/null; then
            PACKAGE_MANAGER="choco"
        elif command -v winget &> /dev/null; then
            PACKAGE_MANAGER="winget"
        else
            PACKAGE_MANAGER="unknown"
        fi
    else
        OS="unknown"
        PACKAGE_MANAGER="unknown"
    fi
}

ensure_dependencies() {
    local dependencies=()
    
    case $PACKAGE_MANAGER in
        apt)
            dependencies=("curl" "unzip")
            print_step "Ensuring dependencies are installed (curl, unzip)"
            sudo apt-get update
            sudo apt-get install -y "${dependencies[@]}"
            ;;
        dnf)
            dependencies=("curl" "unzip")
            print_step "Ensuring dependencies are installed (curl, unzip)"
            sudo dnf install -y "${dependencies[@]}"
            ;;
        pacman)
            dependencies=("curl" "unzip")
            print_step "Ensuring dependencies are installed (curl, unzip)"
            sudo pacman -Sy --noconfirm "${dependencies[@]}"
            ;;
        brew)
            # Homebrew typically has these dependencies
            :
            ;;
        *)
            # Skip dependency check on other systems
            print_warning "Skipping dependency check on this system"
            ;;
    esac
}

install_starship() {
    print_header "Installing Starship" "The minimal, blazingly fast, and infinitely customizable prompt for any shell!"
    
    case $PACKAGE_MANAGER in
        apt|dnf|pacman)
            print_step "Installing Starship via the official installer script"
            curl -sS https://starship.rs/install.sh | sh
            ;;
        brew)
            print_step "Installing Starship via Homebrew"
            brew install starship
            ;;
        choco)
            print_step "Installing Starship via Chocolatey"
            choco install starship
            ;;
        winget)
            print_step "Installing Starship via winget"
            winget install --id Starship.Starship
            ;;
        *)
            print_step "Installing Starship via the official installer script"
            curl -sS https://starship.rs/install.sh | sh
            ;;
    esac
}

verify_installation() {
    print_step "Verifying Starship installation"
    
    if command -v starship &> /dev/null; then
        local version=$(starship --version)
        print_success "Starship installed successfully: $version"
    else
        print_error "Starship installation verification failed"
        exit 1
    fi
}

setup_shell_integration() {
    print_step "Setting up shell integration"
    
    local zshrc="$HOME/.zshrc"
    local bashrc="$HOME/.bashrc"
    local config_dir="$HOME/.config"
    
    # Create config directory if it doesn't exist
    mkdir -p "$config_dir"
    
    # Check for the starship init command in shell configs
    if [ -f "$zshrc" ]; then
        if ! grep -q "starship init zsh" "$zshrc"; then
            print_step "Adding Starship initialization to ZSH"
            echo -e '\n# Initialize Starship prompt\neval "$(starship init zsh)"' >> "$zshrc"
        else
            print_step "Starship initialization already in ZSH config"
        fi
    fi
    
    if [ -f "$bashrc" ]; then
        if ! grep -q "starship init bash" "$bashrc"; then
            print_step "Adding Starship initialization to Bash"
            echo -e '\n# Initialize Starship prompt\neval "$(starship init bash)"' >> "$bashrc"
        else
            print_step "Starship initialization already in Bash config"
        fi
    fi
    
    print_success "Shell integration completed"
}

print_final_instructions() {
    echo
    print_header "Next Steps" "To activate the Starship prompt:"
    
    echo -e "${BOLD}1. Link the Starship configuration from this repository:${RESET}"
    echo -e "   ${YELLOW}./my.zsh --starship${RESET}"
    echo
    echo -e "${BOLD}2. Restart your terminal or source your shell config:${RESET}"
    echo -e "   ${YELLOW}source ~/.zshrc${RESET}  ${GREEN}# for ZSH${RESET}"
    echo -e "   ${YELLOW}source ~/.bashrc${RESET} ${GREEN}# for Bash${RESET}"
    echo
    echo -e "${BOLD}3. For optimal display, install a Nerd Font:${RESET}"
    echo -e "   ${BLUE}https://www.nerdfonts.com/font-downloads${RESET}"
    echo
    echo -e "${BOLD}${GREEN}Starship is now installed! Enjoy your enhanced prompt experience.${RESET}"
}

# Main execution
detect_os
ensure_dependencies
install_starship
verify_installation
setup_shell_integration
print_final_instructions