import os
import shutil

TEMPLATES_DIR = os.path.join(os.path.dirname(__file__), "../templates")
MODULES_DIR = os.path.join(os.getcwd(), "src/modules")

def format_class_name(name):
    return "".join(word.capitalize() for word in name.split("-"))

def replace_placeholders(content, module_name):
    class_name = format_class_name(module_name)
    return content.replace("Base", class_name).replace("base", module_name)

def copy_templates(module_name):
    module_path = os.path.join(MODULES_DIR, module_name)
    os.makedirs(module_path, exist_ok=True)

    template_folders = ["controllers", "dtos", "models", "routes", "services", "validations"]
    
    for folder in template_folders:
        src_folder = os.path.join(TEMPLATES_DIR, folder)
        target_folder = os.path.join(module_path, folder)
        os.makedirs(target_folder, exist_ok=True)

        for file_name in os.listdir(src_folder):
            src_file = os.path.join(src_folder, file_name)
            target_file = os.path.join(target_folder, file_name.replace("base", module_name))

            with open(src_file, "r", encoding="utf-8") as file:
                content = file.read()

            content = replace_placeholders(content, module_name)

            with open(target_file, "w", encoding="utf-8") as file:
                file.write(content)

            print(f"✅ Created {target_file}")

if __name__ == "__main__":
    module_name = input("Enter module name: ").strip()
    if module_name:
        copy_templates(module_name)
        print(f"✅ Module '{module_name}' setup completed.")
    else:
        print("❌ Module name cannot be empty.")
