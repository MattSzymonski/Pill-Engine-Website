import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distDir = path.join(__dirname, 'dist');
const landingBuildDir = path.join(__dirname, 'landing_page', 'dist');
const guideBuildDir = path.join(__dirname, 'guide', '.vitepress', 'dist');

console.log('🚀 Combining builds...');

// Create dist directory if it doesn't exist
if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
}

// Function to copy directory recursively
function copyRecursive(src, dest) {
    if (!fs.existsSync(src)) {
        console.error(`❌ Source directory does not exist: ${src}`);
        return;
    }

    const exists = fs.existsSync(src);
    const stats = exists && fs.statSync(src);
    const isDirectory = exists && stats.isDirectory();

    if (isDirectory) {
        if (!fs.existsSync(dest)) {
            fs.mkdirSync(dest, { recursive: true });
        }
        fs.readdirSync(src).forEach((childItemName) => {
            copyRecursive(
                path.join(src, childItemName),
                path.join(dest, childItemName)
            );
        });
    } else {
        fs.copyFileSync(src, dest);
    }
}

// Copy landing page to root of dist
console.log('📄 Copying landing page...');
copyRecursive(landingBuildDir, distDir);
console.log('✅ Landing page copied to dist/');

// Copy guide to /guide subdirectory
console.log('📚 Copying guide...');
const guideDestDir = path.join(distDir, 'guide');
copyRecursive(guideBuildDir, guideDestDir);
console.log('✅ Guide copied to dist/guide/');

console.log('🎉 Build complete!');
console.log('');
console.log('📁 Structure:');
console.log('  dist/              → Landing page (root)');
console.log('  dist/guide/        → Guide & Documentation');
console.log('');
console.log('To preview: npm run preview');
