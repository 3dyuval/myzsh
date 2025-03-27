# Generate tags file for code navigation
# Usage: update_ctags
update_ctags() {
    ctags -R -f ./.tags ./
}

# Open a Google search in your default browser
# Usage: google [search terms]
google() {
    local query="$*"
    open "https://www.google.com/search?q=${query}"
}

# Update Git repository - pull latest changes and clean up
# Switches to default branch, updates, removes merged branches, and prunes remotes
# Usage: upr [repository_path]
upr() {
    local repo=$1
    : ${repo:=.}
    cd $repo > /dev/null 2>&1
    local repo_dir=$(git rev-parse --show-toplevel)
    local repo_name=$(basename $repo_dir)
    local padded_repo_name_len=$((${#repo_name}+2))
    local default_branch_name=$(git remote show origin | \grep "HEAD branch" | cut -d ":" -f 2 | tr -d '[:space:]')
    echo
    echo -n ╔
    printf '═%.0s' {1..$padded_repo_name_len}
    echo ╗
    echo "║ $repo_name ║"
    echo -n ╚
    printf '═%.0s' {1..$padded_repo_name_len}
    echo ╝
    local current_branch=$(git rev-parse --abbrev-ref HEAD)
    if [ "$current_branch" != "$default_branch_name" ] && [ "x$current_branch" != "x" ]; then
        echo Currently on branch $current_branch
        git stash
        git checkout $default_branch_name
    fi

    if [ "x$current_branch" != "x" ]; then
        git pull
        echo "Checking for branches merged to $default_branch_name..."
        git branch --merged | \grep -v "\*" | xargs -n 1 git branch -d
    fi

    git remote prune origin

    cd - > /dev/null 2>&1
}

# Find running processes by name using ripgrep
# Usage: look_for_process [process_name]
look_for_process() {
    local ps_name=$1
    ps aux | rg $ps_name
}