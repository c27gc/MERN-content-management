module.exports = {
    env: {
      browser: true,
      es2021: true,
      node: true,
    },
  
    project: './tsconfig.json',
    overrides: [
      {
        extends: ['./eslint-config/typescriptFormat'],
        files: ['*.ts'],
      },
      {
        extends: ['./eslint-config/baseFormat'],
        files: ['*.js', '*.ts'],
      },
    ],
    root: true,
  };
  