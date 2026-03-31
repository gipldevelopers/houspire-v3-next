const fs = require('fs');
const path = require('path');
const babel = require('@babel/core');

const SRC_DIR = 'd:/office/houspire/final-v3/room-design-studio-main/src';
const DEST_DIR = 'd:/office/houspire/final-v3/houspire-vendors/src';

const mappings = [
  { src: 'components/workspace', dest: 'components/workspace' },
  { src: 'context', dest: 'context' },
  { src: 'types', dest: 'types' },
  { src: 'pages/ProjectWorkspace.tsx', dest: 'app/customer/dashboard/ProjectWorkspace.js' },
  { src: 'assets', dest: 'assets' }
];

function ensureDirSync(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function convertFile(srcPath, destPath) {
  const isTS = srcPath.endsWith('.tsx') || srcPath.endsWith('.ts');
  if (isTS) {
    const code = fs.readFileSync(srcPath, 'utf8');
    try {
      const result = babel.transformSync(code, {
        filename: srcPath,
        presets: [
          ['@babel/preset-typescript', { isTSX: true, allExtensions: true }]
        ],
        plugins: [
          function stripReactTypes() {
            return {
              visitor: {
                ImportDeclaration(path) {
                  if (path.node.importKind === 'type') {
                    path.remove();
                  } else {
                    path.node.specifiers = path.node.specifiers.filter(s => s.importKind !== 'type');
                    if (path.node.specifiers.length === 0) {
                      path.remove();
                    }
                  }
                }
              }
            };
          }
        ]
      });
      const jsDestPath = destPath.replace(/\.tsx?$/, '.js');
      ensureDirSync(path.dirname(jsDestPath));
      let finalCode = result.code;
      // remove any "use client"; from nested files just in case, we'll put it later? Or keep it if we need it.
      // Replace "@/context/..." with "@/context/..."
      finalCode = finalCode.replace(/@\/components/g, '@/components');
      finalCode = finalCode.replace(/@\/context/g, '@/context');
      finalCode = finalCode.replace(/@\/types/g, '@/types');
      finalCode = finalCode.replace(/@\/assets/g, '@/assets');

      // The destination directory is a Next.js App, we should probably add "use client" to the client components.
      if (jsDestPath.includes('components/workspace') || jsDestPath.includes('context') || jsDestPath.includes('ProjectWorkspace')) {
        if (!finalCode.includes('"use client"')) {
          finalCode = '"use client";\n' + finalCode;
        }
      }

      fs.writeFileSync(jsDestPath, finalCode);
      console.log(`Converted: ${srcPath} -> ${jsDestPath}`);
    } catch (e) {
      console.error(`Error converting ${srcPath}:`, e);
    }
  } else {
    ensureDirSync(path.dirname(destPath));
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied: ${srcPath} -> ${destPath}`);
  }
}

function processDir(srcDir, destDir) {
  if (!fs.existsSync(srcDir)) return;
  const stat = fs.statSync(srcDir);
  if (stat.isFile()) {
    convertFile(srcDir, destDir);
    return;
  }
  const entries = fs.readdirSync(srcDir, { withFileTypes: true });
  for (let entry of entries) {
    const srcPath = path.join(srcDir, entry.name);
    const destPath = path.join(destDir, entry.name);
    if (entry.isDirectory()) {
      processDir(srcPath, destPath);
    } else {
      convertFile(srcPath, destPath);
    }
  }
}

for (let map of mappings) {
  processDir(path.join(SRC_DIR, map.src), path.join(DEST_DIR, map.dest));
}
