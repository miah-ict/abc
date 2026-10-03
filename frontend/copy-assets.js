const fs = require('fs');
const path = require('path');

const srcDir = path.resolve(__dirname, '../docs/icons');
const destDir = path.resolve(__dirname, 'public/icons');

console.log('📦 Syncing assets from docs/icons to frontend/public/icons...');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

if (fs.existsSync(srcDir)) {
  const folders = fs.readdirSync(srcDir);
  
  folders.forEach(folder => {
    const folderPath = path.join(srcDir, folder);
    if (fs.statSync(folderPath).isDirectory()) {
      const screenPath = path.join(folderPath, 'screen.png');
      const codePath = path.join(folderPath, 'code.html');
      
      const targetFolderDir = path.join(destDir, folder);
      if (!fs.existsSync(targetFolderDir)) {
        fs.mkdirSync(targetFolderDir, { recursive: true });
      }

      if (fs.existsSync(screenPath)) {
        fs.copyFileSync(screenPath, path.join(targetFolderDir, 'screen.png'));
        fs.copyFileSync(screenPath, path.join(destDir, `${folder}.png`));
      }

      if (fs.existsSync(codePath)) {
        fs.copyFileSync(codePath, path.join(targetFolderDir, 'code.html'));
      }
    }
  });

  console.log('✅ Successfully copied all image assets and icons to frontend/public/icons!');
} else {
  console.warn('⚠️ srcDir does not exist:', srcDir);
}
