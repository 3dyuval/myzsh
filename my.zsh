#!/usr/bin/env zsh

INVOKE_COMPLETION=invoke-completion.zsh

# Define available features
typeset -A FEATURES
FEATURES=(
    zsh 0
    nvim 0
    git 0
    starship 0 
    ripgrep 0
    bat 0
    all 0
)

# Print help message
print_help() {
    echo "Usage: $0 [options]"
    echo "Options:"
    echo "  --all         Install all features"
    echo "  --zsh         Install ZSH configuration"
    echo "  --nvim        Install Neovim configuration"
    echo "  --git         Install Git configuration"
    echo "  --starship    Install Starship prompt"
    echo "  --ripgrep     Install Ripgrep configuration"
    echo "  --bat         Install bat configuration"
    echo "  --help        Display this help message"
    echo
    echo "Example: $0 --zsh --git"
}

# Parse command line arguments
parse_args() {
    # If no arguments provided, show help
    if [[ $# -eq 0 ]]; then
        print_help
        exit 0
    fi

    local arg
    for arg in "$@"; do
        case $arg in
            --all)
                FEATURES[all]=1
                ;;
            --zsh)
                FEATURES[zsh]=1
                ;;
            --nvim)
                FEATURES[nvim]=1
                ;;
            --git)
                FEATURES[git]=1
                ;;
            --starship)
                FEATURES[starship]=1
                ;;
            --ripgrep)
                FEATURES[ripgrep]=1
                ;;
            --bat)
                FEATURES[bat]=1
                ;;
            --help)
                print_help
                exit 0
                ;;
            *)
                echo "Unknown option: $arg"
                print_help
                exit 1
                ;;
        esac
    done

    # If --all is specified, enable all features
    if [[ ${FEATURES[all]} -eq 1 ]]; then
        for feature in ${(k)FEATURES}; do
            FEATURES[$feature]=1
        done
    fi
}

# Helper functions
pushd_quiet() {
    local path_to_push_to=$1
    pushd $path_to_push_to > /dev/null 2>&1
}

popd_quiet() {
    popd > /dev/null 2>&1
}

# Feature installation functions
install_zsh() {
    echo "Installing ZSH configuration..."
    # Implementation will be added later
}

install_nvim() {
    echo "Installing Neovim configuration..."
    # Implementation will be added later
}

install_git() {
    echo "Installing Git configuration..."
    # Implementation will be added later
}

install_starship() {
    echo "Installing Starship prompt..."
    # Implementation will be added later
}

install_ripgrep() {
    echo "Installing Ripgrep configuration..."
    # Implementation will be added later
}

install_bat() {
    echo "Installing bat configuration..."
    # Implementation will be added later
}

# Main function
main() {
    readonly local project_dir=${0:a:h}
    readonly local src_dir=source
    readonly local custom_dir=${HOME}/.zsh-custom
    
    # Parse command line arguments
    parse_args "$@"
    
    # Print which features will be installed
    echo "Features to be installed:"
    for feature in ${(k)FEATURES}; do
        if [[ $feature != "all" && ${FEATURES[$feature]} -eq 1 ]]; then
            echo "- $feature"
        fi
    done
    echo
    
    # Make sure the custom directory exists
    mkdir -p $custom_dir
    
    # Install selected features
    [[ ${FEATURES[zsh]} -eq 1 ]] && install_zsh
    [[ ${FEATURES[nvim]} -eq 1 ]] && install_nvim
    [[ ${FEATURES[git]} -eq 1 ]] && install_git
    [[ ${FEATURES[starship]} -eq 1 ]] && install_starship
    [[ ${FEATURES[ripgrep]} -eq 1 ]] && install_ripgrep
    [[ ${FEATURES[bat]} -eq 1 ]] && install_bat
    
    echo "Installation complete."
}

# Execute main with all passed arguments
main "$@"