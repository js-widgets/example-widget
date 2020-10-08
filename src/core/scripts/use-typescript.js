const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

// install relevant packages
exec(
  'yarn add @types/jest @types/node @types/react @types/react-dom @typescript-eslint/eslint-plugin @typescript-eslint/parser typescript',
  (err, stdout, stderr) => {
    if (err) throw err;

    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
  },
);

// update package.json
fs.readFile(path.join(process.cwd(), '/package.json'), 'utf-8', (err, data) => {
  if (err) throw err;

  let updatedFile;
  updatedFile = data
    .replace(/eslint:recommended/gim, 'plugin:@typescript-eslint/recommended')
    .replace(
      /"parser": "babel-eslint"/gim,
      '"parser": "@typescript-eslint/parser"',
    )
    .replace(/messages.js/gim, 'messages.ts');

  fs.writeFile(
    path.join(process.cwd(), '/package.json'),
    updatedFile,
    'utf-8',
    (err, data) => {
      if (err) throw err;
      console.log('package.json updates complete');
    },
  );
});

// update file extensions
fs.rename(
  path.join(process.cwd(), '/src/components/Widget.jsx'),
  path.join(process.cwd(), '/src/components/Widget.tsx'),
  (err) => {
    if (err) throw err;
  },
);

fs.rename(
  path.join(process.cwd(), '/src/index.js'),
  path.join(process.cwd(), '/src/index.tsx'),
  (err) => {
    if (err) throw err;
  },
);

fs.rename(
  path.join(process.cwd(), '/src/tests/Widget.test.js'),
  path.join(process.cwd(), '/src/tests/Widget.test.tsx'),
  (err) => {
    if (err) throw err;
  },
);

fs.rename(
  path.join(process.cwd(), '/src/core/bin/serviceWorker.js'),
  path.join(process.cwd(), '/src/core/bin/serviceWorker.ts'),
  (err) => {
    if (err) throw err;
  },
);

fs.rename(
  path.join(process.cwd(), '/src/core/config/setupTests.js'),
  path.join(process.cwd(), '/src/core/config/setupTests.ts'),
  (err) => {
    if (err) throw err;
  },
);

// add tsconfig.json
fs.writeFile(
  path.join(process.cwd(), '/tsconfig.json'),
  `{
  "compilerOptions": {
    "target": "es5",
    "lib": [
      "dom",
      "dom.iterable",
      "esnext",
      "esnext.intl",
      "es2017.intl",
      "es2018.intl"
    ],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react"
    },
    "include": ["src"]
  }`,
  'utf-8',
  (err, data) => {
    if (err) throw err;
    console.log('tsconfig.json file added');
  },
);
