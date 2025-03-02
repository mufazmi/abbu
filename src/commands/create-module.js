const fs = require("fs");
const path = require("path");
const readline = require("readline");

const TEMPLATES_DIR = path.join(__dirname, "../../templates");
const MODULES_DIR = path.join(process.cwd(), "src", "modules");

const formatClassName = (name) =>
  name
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");

const formatFileName = (name) => name.replace(/_/g, "-");

const replacePlaceholders = (content, moduleName, baseModule) => {
  const className = formatClassName(moduleName);
  const baseClassName = formatClassName(baseModule);

  return content
    .replace(/Base/g, className) // Replace class placeholders
    .replace(/base/g, moduleName) // Replace filenames
    .replace(/@modules\/[a-z0-9-]+/g, `@modules/${baseModule}`) // Ensure correct import paths
    .replace(/@modules\/Base/g, `@modules/${baseClassName}`); // Ensure correct PascalCase import paths
};

const copyTemplates = (modulePath, moduleName, baseModule) => {
  const templateFolders = [
    "controllers",
    "services",
    "routes",
    "models",
    "validations",
    "dtos",
  ];

  templateFolders.forEach((folder) => {
    const sourceFolder = path.join(TEMPLATES_DIR, folder);
    const targetFolder = path.join(modulePath, folder);

    if (!fs.existsSync(targetFolder)) {
      fs.mkdirSync(targetFolder, { recursive: true });
    }

    fs.readdirSync(sourceFolder).forEach((file) => {
      const sourceFile = path.join(sourceFolder, file);
      const newFileName =
        formatFileName(moduleName) + file.replace("base", "");
      const targetFile = path.join(targetFolder, newFileName);

      if (fs.existsSync(targetFile)) {
        console.warn(`⚠ File already exists: ${targetFile}. Skipping.`);
      } else {
        let content = fs.readFileSync(sourceFile, "utf8");
        content = replacePlaceholders(content, moduleName, baseModule);

        fs.writeFileSync(targetFile, content);
        console.log(`✅ Created ${targetFile}`);
      }
    });

    const indexFile = path.join(targetFolder, "index.ts");
    const exportLines = fs
      .readdirSync(targetFolder)
      .filter((file) => file !== "index.ts")
      .map((file) => `export * from './${file.replace(".ts", "")}';`)
      .join("\n");

    fs.writeFileSync(indexFile, exportLines);
    console.log(`✅ Created ${indexFile}`);
  });
};

const checkModuleExistence = (moduleName) => {
  const modulePath = path.join(MODULES_DIR, moduleName);
  return fs.existsSync(modulePath) && fs.statSync(modulePath).isDirectory();
};

const createModule = async () => {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

  const askQuestion = (query) => new Promise((resolve) => rl.question(query, resolve));

  try {
    const moduleName = (await askQuestion("Enter module name: ")).trim();
    if (!moduleName) throw new Error("❌ Module name cannot be empty.");

    const modulePath = path.join(MODULES_DIR, moduleName);

    // Check if module already exists
    if (checkModuleExistence(moduleName)) {
      console.log(`⚠ Module '${moduleName}' already exists.`);
      
      const createInExistingModule = await askQuestion(
        "Do you want to create a new module inside it? (yes/no): "
      );

      if (createInExistingModule.toLowerCase() === "yes") {
        const existingModules = fs
          .readdirSync(MODULES_DIR)
          .filter((f) => fs.statSync(path.join(MODULES_DIR, f)).isDirectory());

        console.log("📂 Available modules:");
        existingModules.forEach((mod, index) => console.log(`${index + 1}. ${mod}`));

        const selectedModuleIndex = await askQuestion("Select a module number: ");
        const moduleIndex = parseInt(selectedModuleIndex, 10);

        if (moduleIndex < 1 || moduleIndex > existingModules.length) {
          throw new Error("❌ Invalid selection. Please enter a valid module number.");
        }

        const baseModule = existingModules[moduleIndex - 1];
        console.log(`✅ Selected module: ${baseModule}`);
        
        // Copy templates to the selected module
        copyTemplates(modulePath, moduleName, baseModule);

      } else {
        const freshModule = await askQuestion("Do you want to create a fresh module? (yes/no): ");
        if (freshModule.toLowerCase() === "yes") {
          if (!fs.existsSync(modulePath)) {
            fs.mkdirSync(modulePath, { recursive: true });
            console.log(`✅ Created new module: ${moduleName}`);
            copyTemplates(modulePath, moduleName, moduleName);
          } else {
            console.log(`⚠ Module '${moduleName}' already exists.`);
          }
        }
      }
    } else {
      const freshModule = await askQuestion("Do you want to create a fresh module? (yes/no): ");
      if (freshModule.toLowerCase() === "yes") {
        if (!fs.existsSync(modulePath)) {
          fs.mkdirSync(modulePath, { recursive: true });
          console.log(`✅ Created new module: ${moduleName}`);
          copyTemplates(modulePath, moduleName, moduleName);
        } else {
          console.log(`⚠ Module '${moduleName}' already exists.`);
        }
      }
    }

    console.log(`✅ Module '${moduleName}' setup completed.`);
  } catch (error) {
    console.error(error.message);
  } finally {
    rl.close();
  }
};

module.exports = { createModule };
