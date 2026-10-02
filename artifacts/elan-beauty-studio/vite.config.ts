import path from 'path';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

import runtimeErrorOverlay from '@replit/vite-plugin-runtime-error-modal';
const rawPort = process.env.PORT || '5173';
const port = Number(rawPort);

const basePath = process.env.BASE_PATH || '/';
