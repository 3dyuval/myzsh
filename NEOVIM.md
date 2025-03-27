# Neovim Configuration

This repository includes an extensive Neovim setup with modern features for efficient coding.

## Features

* **Plugin Management with Lazy.nvim**
  ```lua
  -- From /nvim/lua/user/lazy.lua
  require("lazy").setup({
    spec = {
      { import = "user.plugins" },
    },
    defaults = { lazy = true },
    install = { colorscheme = { "tokyonight" } },
    checker = { enabled = true },
    performance = {
      rtp = {
        disabled_plugins = {
          "gzip",
          "matchit",
          -- [more disabled plugins]
        },
      },
    },
  })
  ```

* **LSP Configuration**
  ```lua
  -- From /nvim/lua/user/plugins/lsp.lua
  return {
    "neovim/nvim-lspconfig",
    dependencies = {
      "williamboman/mason.nvim",
      "williamboman/mason-lspconfig.nvim",
      -- [more dependencies]
    },
    -- [configuration for language servers]
  }
  ```

* **Syntax Highlighting with Treesitter**
  ```lua
  -- From /nvim/lua/user/plugins/nvim-treesitter.lua
  return {
    "nvim-treesitter/nvim-treesitter",
    build = ":TSUpdate",
    -- [configuration for syntax highlighting]
  }
  ```

* **File Navigation with Telescope**
  ```lua
  -- From /nvim/lua/user/plugins/telescope.lua
  return {
    "nvim-telescope/telescope.nvim",
    dependencies = {
      "nvim-lua/plenary.nvim",
      -- [more dependencies]
    },
    -- [telescope configuration]
  }
  ```

* **Tokyo Night Theme**
  ```lua
  -- From /nvim/lua/user/plugins/tokyo-night.lua
  return {
    "folke/tokyonight.nvim",
    lazy = false,
    priority = 1000,
    -- [theme configuration]
  }
  ```

## Implementation

The Neovim configuration is organized in a modular structure:
- Main config: `/nvim/init.lua` 
- Core settings: `/nvim/lua/user/options.lua`
- Key mappings: `/nvim/lua/user/keymaps.lua`
- Plugin management: `/nvim/lua/user/lazy.lua`
- Individual plugin configs: `/nvim/lua/user/plugins/`

The configuration is automatically symlinked to `~/.config/nvim` by the installation script.