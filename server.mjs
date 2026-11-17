import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname } from 'node:path';

const root = new URL('./dist/', import.meta.url);
const port = Number(process.env.PORT || 4173);
const contentTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
};

const server = createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url || '/', `http://${request.headers.host}`).pathname);
    const relativePath = pathname === '/' ? 'index.html' : pathname.replace(/^\/+/, '');
    const fileUrl = new URL(relativePath, root);

    if (!fileUrl.href.startsWith(root.href)) {
      response.writeHead(403);
      response.end('Forbidden');
      return;
    }

    const content = await readFile(fileUrl);
    response.writeHead(200, { 'Content-Type': contentTypes[extname(relativePath)] || 'application/octet-stream' });
    response.end(content);
  } catch {
    response.writeHead(404);
    response.end('Not found');
  }
});

server.listen(port, '127.0.0.1', () => {
  console.log(`Milleo Designer local preview: http://127.0.0.1:${port}`);
});
