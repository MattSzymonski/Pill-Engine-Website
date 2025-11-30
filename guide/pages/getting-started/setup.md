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

### 2. Build the Engine

Build the engine and all its crates:

```bash
cargo build --release
```

This will compile:
- `pill_core` - Core utilities and data structures
- `pill_engine` - Main engine crate with ECS
- `pill_renderer` - Graphics rendering system
- `pill_net` - Networking capabilities
- `pill_launcher` - Project launcher tool
- `pill_standalone` - Standalone runtime with hot-reloading

## Creating Your First Project

### Option 1: Use an Example Project

The easiest way to get started is to use one of the example projects:

```bash
cd examples/Empty
cargo run
```

Available examples:
- `Empty` - Minimal starting template
- `Floating-Pills` - Basic 3D scene
- `Trucks` - Vehicle controls and physics
- `Italian-Brainrot` - Advanced features
- `Net-Minimal` - Networking basics

### Option 2: Create a New Project

1. **Create a new Rust library project:**

```bash
cargo new --lib my_game
cd my_game
```

2. **Update `Cargo.toml`:**

```toml
[package]
name = "my_game"
version = "0.1.0"
edition = "2021"

[lib]
crate-type = ["cdylib"]

[dependencies]
pill_engine = { path = "../Pill-Engine/engine/pill_engine" }

[features]
net = ["pill_engine/net"]
```

3. **Create a `res/config.ini` file:**

```ini
[window]
title = "My Game"
width = 1280
height = 720
vsync = true

[graphics]
msaa = 4
```

4. **Set up the game structure in `src/lib.rs`:**

```rust
use pill_engine::game::*;

pub struct Game {}

impl PillGame for Game {
    fn start(&self, engine: &mut Engine) -> Result<()> {
        // Create a scene
        let scene = engine.create_scene("Main")?;
        engine.set_active_scene(scene)?;

        // Register components
        engine.register_component::<TransformComponent>(scene)?;
        engine.register_component::<CameraComponent>(scene)?;

        // Create a camera entity
        engine.build_entity(scene)
            .with_component(TransformComponent::builder()
                .position(Vector3f::new(0.0, 2.0, 5.0))
                .build())
            .with_component(CameraComponent::builder()
                .enabled(true)
                .fov(60.0)
                .clear_color(Color::new(0.1, 0.1, 0.1))
                .build())
            .build();

        println!("Game started!");
        Ok(())
    }
}

#[no_mangle]
pub extern "C" fn create_game() -> *mut dyn PillGame {
    Box::into_raw(Box::new(Game {}))
}
```

5. **Run your game:**

```bash
cargo build --release
```

Then use `pill_standalone` to run it:

```bash
../Pill-Engine/target/release/pill_standalone.exe ./target/release/my_game.dll
```

## Project Structure

A typical Pill-Engine project structure looks like this:

```
my_game/
├── Cargo.toml
├── src/
│   ├── lib.rs          # Main game code
│   └── game.rs         # Game logic (optional)
├── res/
│   ├── config.ini      # Engine configuration
│   ├── models/         # 3D model files (.obj)
│   ├── textures/       # Texture files (.png, .jpg)
│   └── audio/          # Audio files
└── target/
    └── release/
        └── my_game.dll # Compiled game library
```

## Configuration

The `config.ini` file controls various engine settings:

### Window Settings

```ini
[window]
title = "My Game"
width = 1280
height = 720
vsync = true
fullscreen = false
```

### Graphics Settings

```ini
[graphics]
msaa = 4                # Anti-aliasing samples (0, 2, 4, 8)
shadow_quality = "high" # Shadow quality
max_lights = 8          # Maximum number of lights
```

### Physics Settings

```ini
[physics]
gravity = -9.81
timestep = 0.016667     # Fixed timestep (60 FPS)
```

## Hot Reloading

Pill-Engine supports hot-reloading for rapid development:

1. Start your game with `pill_standalone`
2. Make changes to your code
3. Build with `cargo build`
4. The engine will automatically reload your changes

::: tip
Hot-reloading works best when you keep the engine running and rebuild in a separate terminal.
:::

## Enabling Features

### Networking

To enable networking support, add the `net` feature:

```toml
[dependencies]
pill_engine = { path = "../Pill-Engine/engine/pill_engine", features = ["net"] }
```

In your code:

```rust
#[cfg(feature = "net")]
use pill_engine::{NetState, NetSide, NetworkStateComponent};
```

## Next Steps

Now that you have Pill-Engine set up, learn about:

- [ECS (Entity Component System)](/getting-started/ecs) - Core architecture
- [Resources](/getting-started/resources) - Managing assets
- [Next Steps](/next-steps) - Building more complex features
