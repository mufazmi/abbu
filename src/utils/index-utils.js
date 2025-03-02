const fs = require("fs");
const path = require("path");

function updateIndexFiles(moduleName) {
  const modulePath = path.join(process.cwd(), "modules", moduleName);

  ["controllers", "services", "models", "routes"].forEach((folder) => {
    const indexFile = path.join(modulePath, folder, "index.ts");
    if (!fs.existsSync(indexFile)) {
      fs.writeFileSync(indexFile, "", "utf8");
    }
    const exportLine = `export * from "./${moduleName}.${folder.slice(0, -1)}";\n`;
    if (!fs.readFileSync(indexFile, "utf8").includes(exportLine)) {
      fs.appendFileSync(indexFile, exportLine, "utf8");
    }
  });
}

module.exports = { updateIndexFiles };
