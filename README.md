# **Abbu** - The Ultimate CLI Tool for Module Creation

**Abbu** is a command-line interface (CLI) tool designed to help you quickly create and manage modules in your Node.js projects. Whether you want to generate a brand-new module or copy and customize an existing one, Abbu takes care of the heavy lifting.

---

## **Table of Contents**
1. [Installation](#installation)
2. [Usage](#usage)
3. [How It Works](#how-it-works)
4. [Folder Structure](#folder-structure)
5. [Module Templates](#module-templates)
6. [Contributing](#contributing)
7. [License](#license)

---

## **Installation**

To install **Abbu**, you can use npm. Run the following command:

```bash
npm install -g abbu
```

This will install the CLI tool globally, allowing you to use it anywhere in your terminal.

---

## **Usage**

After installing **Abbu**, you can create new modules using the following command:

```bash
npx abbu create
```

### **Steps to Create a Module:**

1. **Enter the Module Name**: You will be prompted to enter the name of the new module.
2. **Choose Fresh or Existing Module**: You can either create a fresh module or base it on an existing one.
   - If **Fresh**: A new module is generated from predefined templates.
   - If **Existing**: You can choose an existing module to copy and customize. The system will then prompt you for confirmation and handle the copying of files.

---

## **How It Works**

1. **Fresh Module Creation**: If you choose to create a fresh module, **Abbu** generates a module with the following directory structure:
   - Controllers
   - Services
   - Models
   - Routes
   - Index File for Exports

2. **Existing Module**: If you decide to use an existing module, **Abbu** will:
   - List all available modules in your project.
   - Allow you to select one to copy.
   - Rename relevant files and content to match the new module name.
   - Modify the module’s index file to export all necessary files.

The module templates are customizable, and you can easily expand them to fit your project’s requirements.

---

## **Folder Structure**

When you run **Abbu** to create a new module or copy an existing one, the following folder structure is created inside the **modules** directory.

```plaintext
modules/
│── <moduleName>/
│   ├── controllers/
│   │   ├── <moduleName>.controller.ts
│   ├── services/
│   │   ├── <moduleName>.service.ts
│   ├── models/
│   │   ├── <moduleName>.model.ts
│   ├── routes/
│   │   ├── <moduleName>.route.ts
│   ├── index.ts  # Exports all files in the module
```

For example, if you create a module called `user`, the folder structure will look like this:

```plaintext
modules/
│── user/
│   ├── controllers/
│   │   ├── user.controller.ts
│   ├── services/
│   │   ├── user.service.ts
│   ├── models/
│   │   ├── user.model.ts
│   ├── routes/
│   │   ├── user.route.ts
│   ├── index.ts  # Exports all files in the module
```

---

## **Module Templates**

The core of **Abbu** is its module templates. The following template files are provided for each module:

### **Controllers**

Each module has a controller template (`<moduleName>.controller.ts`), which contains basic CRUD functionality. Here's an example for a `user` module:

```typescript
import { Request, Response } from 'express';
import { UserService } from '../services/user.service';

export class UserController {
    static async findAll(req: Request, res: Response) {
        const data = await UserService.findAll();
        res.json(data);
    }
}
```

### **Services**

Each module also has a service template (`<moduleName>.service.ts`), which contains the logic for interacting with the database or other services.

```typescript
export class UserService {
    static async findAll() {
        // Logic to fetch data from the database
    }
}
```

### **Models**

The model template (`<moduleName>.model.ts`) provides a structure for defining data models, often using an ORM like Mongoose.

```typescript
import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    name: String,
    email: String
});

export const UserModel = model('User', userSchema);
```

### **Routes**

The route template (`<moduleName>.route.ts`) maps HTTP routes to controller actions.

```typescript
import express from 'express';
import { UserController } from '../controllers/user.controller';

const router = express.Router();

router.get('/', UserController.findAll);

export default router;
```

### **Index File**

Finally, an index file (`index.ts`) is generated to export all the module components:

```typescript
export * from './controllers/user.controller';
export * from './services/user.service';
export * from './models/user.model';
export * from './routes/user.route';
```

---

## **Contributing**

We welcome contributions to **Abbu**! Feel free to open issues or submit pull requests.

### **Steps to Contribute**:
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature-name`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature-name`).
5. Open a pull request with a clear description of the changes.

---

## **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## **Conclusion**

**Abbu** streamlines the module creation process, making it easy to set up and manage reusable code components across your Node.js projects. Whether you're creating new modules or working with existing ones, Abbu simplifies the process and helps you stay focused on writing business logic. 

We hope you find **Abbu** useful and encourage you to contribute or extend the tool with additional features to fit your needs!

For more information, visit the [Abbu NPM Package Page](https://www.npmjs.com/package/abbu).