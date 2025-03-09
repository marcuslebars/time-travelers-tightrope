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
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    
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
    console.log(`Server running at http://localhost:${PORT}/`);
    console.log(`Press Ctrl+C to stop the server`);
}); 