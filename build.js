const esbuild = require('esbuild');

(async () => {
  let ctx = await esbuild.context({
    entryPoints: ['./public/index.ts'],
    bundle: true,
    minify: true,
    sourcemap: false,
    tsconfig: './tsconfig.json',
    target: 'es2021',
    outfile: './public/index.js',
  });

  await ctx.watch();
  console.log('watching...');

  await new Promise((r) => setTimeout(r, 10 * 100000));
  await ctx.dispose();
  console.log('stopped watching');
})();
