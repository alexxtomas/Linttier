module.exports = `
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "ESNext",
    "lib": ["ESNext"],
    "allowJs": true,
    "outDir": "dist",
    "strict": true,
    "noImplicitAny": true,
    "esModuleInterop": true,
    "resolveJsonModule": true,
    "exactOptionalPropertyTypes": true,
    "useUnknownInCatchVariables": true,
    "moduleResolution": "node",
    "typeRoots": ["./src/types", "./node_modules/@types"]
  },
  "include": ["./src/**/*"]
}


`
