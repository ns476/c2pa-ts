import { execSync } from 'node:child_process';
import { defineConfig } from 'tsup';

let version = process.env.npm_package_version;
try {
    const gitRevision = execSync('git rev-parse --short HEAD', { stdio: ['ignore', 'pipe', 'ignore'] })
        .toString()
        .trim();
    version = `${version}-${gitRevision}`;
} catch {
    // Source archives do not include Git metadata; use the package version alone.
}

export default defineConfig({
    entry: {
        index: 'src/index.ts',
        'asset/index': 'src/asset/index.ts',
        'cose/index': 'src/cose/index.ts',
        'crypto/index': 'src/crypto/index.ts',
        'jumbf/index': 'src/jumbf/index.ts',
        'manifest/index': 'src/manifest/index.ts',
        'rfc3161/index': 'src/rfc3161/index.ts',
    },
    define: {
        'process.env.VERSION': JSON.stringify(version),
    },
    format: ['esm'],
    dts: true,
    sourcemap: true,
    clean: true,
    outDir: 'dist',
});
