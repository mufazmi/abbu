import os
import subprocess

def main():
    print("Welcome to ABBU (Snapcraft NodeJS Setup Tool)")
    while True:
        print("\nOptions:")
        print("1. Create a new module")
        print("2. Exit")
        choice = input("Select an option: ")

        if choice == "1":
            subprocess.run(["python3", "snapcraft/create_module.py"])
        elif choice == "2":
            break
        else:
            print("Invalid option. Try again.")

if __name__ == "__main__":
    main()
