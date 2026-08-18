import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distDir = path.join(__dirname, 'dist');
const docsBuildDir = path.join(__dirname, 'docs', '.vitepress', 'dist');

console.log('🚀 Publishing documentation...');

// The distribution directory is generated output. Recreate it so obsolete
// routes such as the former /docs/ subtree cannot survive between builds.
if (fs.existsSync(distDir)) {
    fs.rmSync(distDir, { recursive: true, force: true });
}
fs.mkdirSync(distDir, { recursive: true });

// Function to copy directory recursively
function copyRecursive(src, dest) {
    if (!fs.existsSync(src)) {
        throw new Error(`Source directory does not exist: ${src}`);
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

// The documentation home page is the website root. Guide and reference are
// emitted directly as /guide/ and /reference/ beneath it.
console.log('📚 Copying documentation...');
copyRecursive(docsBuildDir, distDir);
console.log('✅ Documentation copied to dist/');

console.log('🎉 Build complete!');
console.log('');
console.log('📁 Structure:');
console.log('  dist/              → Documentation home');
console.log('  dist/guide/        → Guide');
console.log('  dist/reference/    → API reference');
console.log('');
console.log('To preview: npm run preview');
