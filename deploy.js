// This script helps prepare the project for deployment
const fs = require('fs');
const path = require('path');

console.log('Preparing project for deployment...');

// Function to recursively copy a directory
function copyDirectory(source, destination) {
    // Create destination directory if it doesn't exist
    if (!fs.existsSync(destination)) {
        fs.mkdirSync(destination, { recursive: true });
    }

    // Get all files and directories in the source directory
    const entries = fs.readdirSync(source, { withFileTypes: true });

    for (const entry of entries) {
        const sourcePath = path.join(source, entry.name);
        const destinationPath = path.join(destination, entry.name);

        if (entry.isDirectory()) {
            // Recursively copy subdirectories
            copyDirectory(sourcePath, destinationPath);
        } else {
            // Copy files
            fs.copyFileSync(sourcePath, destinationPath);
            console.log(`Copied: ${sourcePath} -> ${destinationPath}`);
        }
    }
}

// Create a dist directory for deployment
const distDir = path.join(__dirname, 'dist');
if (fs.existsSync(distDir)) {
    console.log('Cleaning existing dist directory...');
    fs.rmSync(distDir, { recursive: true, force: true });
}
fs.mkdirSync(distDir);

// Copy HTML files
console.log('Copying HTML files...');
fs.copyFileSync(path.join(__dirname, 'index.html'), path.join(distDir, 'index.html'));
fs.copyFileSync(path.join(__dirname, 'fallback.html'), path.join(distDir, 'fallback.html'));

// Copy src directory
console.log('Copying src directory...');
copyDirectory(path.join(__dirname, 'src'), path.join(distDir, 'src'));

// Copy Vercel configuration
console.log('Copying Vercel configuration...');
fs.copyFileSync(path.join(__dirname, 'vercel.json'), path.join(distDir, 'vercel.json'));

// Create a simple server.js file for local testing
const serverJs = `
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const MIME_TYPES = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
};

const server = http.createServer((req, res) => {
    console.log(\`\${new Date().toISOString()} - \${req.method} \${req.url}\`);
    
    // Normalize URL by removing query string and trailing slash
    let url = req.url.split('?')[0];
    if (url.endsWith('/') && url.length > 1) {
        url = url.slice(0, -1);
    }
    
    // Default to index.html for root path
    if (url === '/') {
        url = '/index.html';
    }
    
    // Determine the file path
    const filePath = path.join(__dirname, url);
    
    // Get the file extension
    const extname = path.extname(filePath).toLowerCase();
    
    // Set the content type based on the file extension
    const contentType = MIME_TYPES[extname] || 'application/octet-stream';
    
    // Read the file
    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                // File not found, try fallback
                fs.readFile(path.join(__dirname, 'fallback.html'), (err, content) => {
                    if (err) {
                        // Even fallback not found
                        res.writeHead(500);
                        res.end('Error: ' + err.code);
                    } else {
                        res.writeHead(404, { 'Content-Type': 'text/html' });
                        res.end(content, 'utf-8');
                    }
                });
            } else {
                // Server error
                res.writeHead(500);
                res.end('Error: ' + err.code);
            }
        } else {
            // Success
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, () => {
    console.log(\`Server running at http://localhost:\${PORT}/\`);
});
`;

fs.writeFileSync(path.join(distDir, 'server.js'), serverJs);
console.log('Created server.js for local testing');

// Create a package.json file for Vercel
const packageJson = {
    "name": "time-travelers-tightrope",
    "version": "1.0.0",
    "description": "A side-scrolling action/survival game where you balance on a tightrope across the fabric of time",
    "main": "server.js",
    "scripts": {
        "start": "node server.js",
        "test": "echo \"Error: no test specified\" && exit 1"
    },
    "engines": {
        "node": ">=14.x"
    }
};

fs.writeFileSync(path.join(distDir, 'package.json'), JSON.stringify(packageJson, null, 2));
console.log('Created package.json for Vercel');

console.log('Project prepared for deployment!');
console.log('To deploy to Vercel:');
console.log('1. cd dist');
console.log('2. vercel'); 