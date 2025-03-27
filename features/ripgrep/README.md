# Ripgrep Customization

This repository includes custom configurations for ripgrep, a fast search tool.

## Features

* **Smart-case searching**: Case-insensitive unless capital letters are used
  ```
  --smart-case
  ```
  Example: `rg function` will match "function" and "Function", but `rg Function` will only match "Function"

* **Custom file type: MDX**
  ```
  --type-add
  mdx:*.mdx
  ```
  Example: `rg -t mdx "React"` to search only in MDX files

* **Custom file type: Vue**
  ```
  --type-add
  vue:*.vue
  ```
  Example: `rg -t vue "computed"` to search only in Vue component files

* **Custom file type: AsciiDoc**
  ```
  --type-add
  adoc:*.adoc
  ```
  Example: `rg -t adoc "NOTE:"` to search for notes in AsciiDoc files

* **Custom file type: Django**
  ```
  --type-add
  django:*.{html,py}
  ```
  Example: `rg -t django "{% block"` to search for template blocks in Django files

* **Custom file type: Web**
  ```
  --type-add
  web:*.{html,css,js,jsx,ts,tsx}
  ```
  Example: `rg -t web "useState"` to search in all web-related files

## Enable/Disable

```zsh
# Enable Ripgrep configuration
../../my.zsh --ripgrep

# Disable Ripgrep configuration
../../my.zsh  # Run without the --ripgrep flag
```

## Implementation

These configurations are stored in `ripgreprc` and are automatically symlinked to `~/.ripgreprc` by the installation script.

To use: `export RIPGREP_CONFIG_PATH=~/.ripgreprc` in your shell configuration.