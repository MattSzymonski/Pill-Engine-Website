# Setup

This guide will walk you through setting up Pill-Engine and creating your first project.

## Prerequisites

Before you begin, make sure you have the following installed:

### Required

- **Rust** (1.70 or later)
  - Install from [rustup.rs](https://rustup.rs/)
  - Verify installation: `rustc --version`

- **Cargo** (comes with Rust)
  - Verify installation: `cargo --version`

### Recommended

- **Visual Studio Code** with rust-analyzer extension
- **Git** for version control

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/MattSzymonski/Pill-Engine.git
cd Pill-Engine
```

### 2. Install Rust

Install from [rustup.rs](https://www.rust-lang.org/tools/install)

### 3. Build Pill Launcher

```bash
cargo build --release --manifest-path <ENGINE-PATH>\Pill-Engine\crates\pill_launcher\Cargo.toml
```

### 4. Add Pill Launcher to PATH (optional)

```bash
set PATH=%PATH%;<ENGINE-PATH>\Pill-Engine\crates\pill_launcher\target\release
```

## Creating new project

### 1. Create a new project

The empty template project will be created.

```bash
PillLauncher.exe -a create -n Hello-Pill
```

### 2. Run it!

```bash
PillLauncher.exe -a run -p ./Hello-Pill
```

## Examples
The easiest way to get started is to use one of the example projects:

Available examples:
- `Empty` - Minimal starting template
- `Floating-Pills` - Basic 3D scene
- `Trucks` - Vehicle controls and physics
- `Italian-Brainrot` - Custom shaders loading
- `Net-Minimal` - Networking basics

To run selected example use:
```bash
PillLauncher.exe -a run -p <ENGINE-PATH>\Pill-Engine\examples\<EXAMPLE_NAME>
```

## Next Steps

Now that you have Pill-Engine set up, learn about:

- [ECS (Entity Component System)](/getting-started/ecs) - Core architecture
- [Resources](/getting-started/resources) - Managing assets
- [Next Steps](/next-steps) - Building more complex features
