#!/usr/bin/env zsh

# Define available features
typeset -A FEATURES
FEATURES=(
    zsh 0
    nvim 0
    git 0
    starship 0 
    ripgrep 0
    bat 0
    misc 0
    all 0
)

# Create or remove symbolic links based on feature flags
create_symlink() {
    local source_file=$1
    local target_file=$2
    local feature_enabled=$3
    
    # Check if source file exists
    if [[ ! -f "$source_file" ]]; then
        echo "Warning: Source file $source_file does not exist"
        return 1
    fi
    
    # Create parent directory for target if it doesn't exist
    local target_dir=$(dirname "$target_file")
    mkdir -p "$target_dir"
    
    if [[ $feature_enabled -eq 1 ]]; then
        # Create/update symlink if feature is enabled
        echo "Linking $source_file → $target_file"
        ln -sf "$source_file" "$target_file"
    else
        # Remove symlink if feature is disabled and link exists
        if [[ -L "$target_file" ]]; then
            echo "Removing link $target_file"
            rm "$target_file"
        fi
    fi
}

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
    echo "  --misc        Install miscellaneous configurations"
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
            --misc)
                FEATURES[misc]=1
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
    local project_dir=${0:a:h}
    local configs_dir="$project_dir/features/zsh"
    
    # Link zsh configuration files
    create_symlink "$configs_dir/aliases.zsh" "$HOME/.aliases.zsh" ${FEATURES[zsh]}
    create_symlink "$configs_dir/functions.zsh" "$HOME/.functions.zsh" ${FEATURES[zsh]}
    create_symlink "$configs_dir/zshrc" "$HOME/.zshrc" ${FEATURES[zsh]}
    create_symlink "$configs_dir/zprofile" "$HOME/.zprofile" ${FEATURES[zsh]}
}

install_nvim() {
    echo "Installing Neovim configuration..."
    local project_dir=${0:a:h}
    local nvim_dir="$project_dir/features/neovim"
    
    # Link nvim directory to ~/.config/nvim
    if [[ ${FEATURES[nvim]} -eq 1 ]]; then
        echo "Linking $nvim_dir → $HOME/.config/nvim"
        mkdir -p "$HOME/.config"
        ln -sf "$nvim_dir" "$HOME/.config/nvim"
    else
        if [[ -L "$HOME/.config/nvim" ]]; then
            echo "Removing link $HOME/.config/nvim"
            rm "$HOME/.config/nvim"
        fi
    fi
}

install_git() {
    echo "Installing Git configuration..."
    local project_dir=${0:a:h}
    local git_dir="$project_dir/features/git"
    
    # Link gitconfig file
    create_symlink "$git_dir/gitconfig" "$HOME/.gitconfig" ${FEATURES[git]}
}

install_starship() {
    echo "Installing Starship prompt..."
    local project_dir=${0:a:h}
    local starship_dir="$project_dir/features/starship"
    
    # Link starship.toml file
    create_symlink "$starship_dir/starship.toml" "$HOME/.config/starship.toml" ${FEATURES[starship]}
}

install_ripgrep() {
    echo "Installing Ripgrep configuration..."
    local project_dir=${0:a:h}
    local ripgrep_dir="$project_dir/features/ripgrep"
    
    # Link ripgreprc file
    create_symlink "$ripgrep_dir/ripgreprc" "$HOME/.ripgreprc" ${FEATURES[ripgrep]}
}

install_bat() {
    echo "Installing bat configuration..."
    local project_dir=${0:a:h}
    local bat_dir="$project_dir/features/bat"
    
    if [[ ${FEATURES[bat]} -eq 1 && -x "$(command -v bat)" ]]; then
        # Set up bat configuration
        local themes_dir=$(bat --config-dir)/themes
        local bat_theme_name="Solarized (dark)"
        local bat_theme="$bat_theme_name.tmTheme"
        
        mkdir -p "$themes_dir"
        local bat_theme_source="$bat_dir/themes/$bat_theme"
        
        # Link theme file
        echo "Linking $bat_theme_source → $themes_dir/$bat_theme"
        ln -sf "$bat_theme_source" "$themes_dir/$bat_theme"
        
        # Create config file
        local config_file=$(bat --config-file)
        echo --theme="\"$bat_theme_name\"" > "$config_file"
        echo "--paging=never" >> "$config_file"
        
        # Build cache
        bat cache --build
    fi
}

install_misc() {
    echo "Installing miscellaneous configurations..."
    local project_dir=${0:a:h}
    local misc_dir="$project_dir/features/misc"
    
    # Link miscellaneous configuration files
    create_symlink "$misc_dir/ctags" "$HOME/.ctags" ${FEATURES[misc]}
    create_symlink "$misc_dir/screenrc" "$HOME/.screenrc" ${FEATURES[misc]}
    create_symlink "$misc_dir/hushlogin" "$HOME/.hushlogin" ${FEATURES[misc]}
    create_symlink "$misc_dir/alexrc" "$HOME/.alexrc" ${FEATURES[misc]}
    create_symlink "$misc_dir/pystartup" "$HOME/.pystartup" ${FEATURES[misc]}
    
    # Create directories for special files if needed
    if [[ ${FEATURES[misc]} -eq 1 ]]; then
        mkdir -p "$HOME/.config/npm"
        mkdir -p "$HOME/.local/pipx"
        create_symlink "$misc_dir/default-npm-packages" "$HOME/.config/npm/default-npm-packages" ${FEATURES[misc]}
        create_symlink "$misc_dir/pipxfile" "$HOME/.local/pipx/pipxfile" ${FEATURES[misc]}
    fi
}

# Main function
main() {
    readonly local project_dir=${0:a:h}
    readonly local custom_dir=${HOME}/.zsh-custom
    
    # Parse command line arguments
    parse_args "$@"
    
    # Print which features will be installed or removed
    echo "Features to be processed:"
    for feature in ${(k)FEATURES}; do
        if [[ $feature != "all" ]]; then
            feature_status=$([ ${FEATURES[$feature]} -eq 1 ] && echo "install" || echo "remove")
            echo "- $feature: $feature_status"
        fi
    done
    echo
    
    # Make sure the custom directory exists
    mkdir -p "$custom_dir/scripts"
    
    # Process all features
    # Note: We process all features, enabling or disabling them as specified
    install_zsh
    install_nvim
    install_git
    install_starship
    install_ripgrep
    install_bat
    install_misc
    
    echo "Configuration complete."
    
    # Summary of what was done
    echo 
    echo "Summary:"
    echo "- Enabled features will have their configs linked from the dotfiles repo"
    echo "- Disabled features had their symlinks removed if they existed"
    echo "- Edit files in the dotfiles repo to change configurations"
    echo "- Run this script again with different flags to enable/disable features"
    echo
    
    # Mention restart for changes to take effect
    echo "Please restart your terminal or run 'source ~/.zshrc' for changes to take effect."
}

# Execute main with all passed arguments
main "$@"