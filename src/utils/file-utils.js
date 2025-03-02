const fs = require("fs");
const path = require("path");

function copyTemplates(moduleName) {
  const templateDir = path.join(__dirname, "../../templates");
  const moduleDir = path.join(process.cwd(), "modules", moduleName);

  if (!fs.existsSync(moduleDir)) {
    fs.mkdirSync(moduleDir, { recursive: true });
  }

  ["controllers", "services", "models", "routes"].forEach((folder) => {
    const srcPath = path.join(templateDir, folder, `base.${folder.slice(0, -1)}.ts`);
    const destPath = path.join(moduleDir, folder);
    if (!fs.existsSync(destPath)) {
      fs.mkdirSync(destPath, { recursive: true });
    }
    fs.copyFileSync(srcPath, path.join(destPath, `${moduleName}.${folder.slice(0, -1)}.ts`));
  });
}

function replacePlaceholders(modulePath, baseName, moduleName, className) {
  fs.readdirSync(modulePath, { recursive: true }).forEach((file) => {
    const filePath = path.join(modulePath, file);
    let content = fs.readFileSync(filePath, "utf8");
    content = content.replace(new RegExp(baseName, "g"), moduleName);
    content = content.replace(new RegExp(baseName.charAt(0).toUpperCase() + baseName.slice(1), "g"), className);
    fs.writeFileSync(filePath, content, "utf8");
  });
}

module.exports = { copyTemplates, replacePlaceholders };
