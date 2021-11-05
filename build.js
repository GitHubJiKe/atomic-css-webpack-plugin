require('esbuild').buildSync({
    entryPoints: ['plugin.js'],
    bundle: true,
    platform: 'node',
    target: ['node14.17.0'],
    outfile: 'index.js',
    external: ['purgecss'],
    minify: true,
    minifyWhitespace: true,
    minifyIdentifiers: true,
    minifySyntax: true
})