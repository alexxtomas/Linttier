module.exports = `
{
  "compilerOptions": {
    "alwaysStrict": true,
    "allowSyntheticDefaultImports": true,
    "skipLibCheck": true,
    "outDir": "build",
    "module": "ESNext",
    "declaration": true,
    "sourceMap": true,
    "target": "ESNext",
    "rootDir": "./src",
    "lib": ["ESNext"],
    "strict": true
  },
  "include": ["src/**/*", ".eslintrc.cjs"],
  "exclude": ["node_modules", "**/*.spec.ts", "build"]
}

`
