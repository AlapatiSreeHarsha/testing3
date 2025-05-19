import os
import subprocess
from typing import Optional
from urllib.parse import urlparse

class GitPushError(Exception):
    """Custom exception for Git operations"""
    pass

def push(
    username: str,
    email: str,
    repo_url: str,
    local_path: str,
    commit_message: str,
    branch_name: str = "main"
) -> None:
    """
    Push local directory contents to a Git repository.
    
    Args:
        username (str): Git username for configuration
        email (str): Git email for configuration
        repo_url (str): URL of the public repository
        local_path (str): Path to the local directory to push
        commit_message (str): Commit message for the push
        branch_name (str, optional): Branch name to push to. Defaults to "main".
    
    Raises:
        GitPushError: If any Git operation fails
        ValueError: If inputs are invalid
    """
    try:
        # Validate inputs
        if not all([username, email, repo_url, local_path, commit_message]):
            raise ValueError("All arguments except branch_name are required")
        
        if not os.path.exists(local_path):
            raise ValueError(f"Local path does not exist: {local_path}")
        
        # Parse repository URL
        parsed_url = urlparse(repo_url)
        if not parsed_url.scheme or not parsed_url.netloc:
            raise ValueError("Invalid repository URL")
        
        # Change to the local directory
        os.chdir(local_path)
        
        # Initialize repository if not already initialized
        is_new_repo = not os.path.exists(".git")
        if is_new_repo:
            subprocess.run(["git", "init"], check=True)
            subprocess.run(["git", "remote", "add", "origin", repo_url], check=True)
            # Set global config for initial setup
            subprocess.run(["git", "config", "user.name", username], check=True)
            subprocess.run(["git", "config", "user.email", email], check=True)
            # Disable GPG signing globally for this repository
            subprocess.run(["git", "config", "commit.gpgsign", "false"], check=True)
        else:
            # If repository exists, set local config
            subprocess.run(["git", "config", "--local", "user.name", username], check=True)
            subprocess.run(["git", "config", "--local", "user.email", email], check=True)
            # Disable GPG signing locally
            subprocess.run(["git", "config", "--local", "commit.gpgsign", "false"], check=True)
        
        # Add all files
        subprocess.run(["git", "add", "."], check=True)
        
        # Check if there are any changes to commit
        status = subprocess.run(["git", "status", "--porcelain"], capture_output=True, text=True, check=True)
        if not status.stdout.strip():
            print("No changes to commit")
            return
        
        # Commit changes without GPG signing
        subprocess.run(["git", "commit", "--no-gpg-sign", "-m", commit_message], check=True)
        
        if is_new_repo:
            # For new repository, create and switch to the specified branch
            subprocess.run(["git", "checkout", "-b", branch_name], check=True)
            print(f"Created and switched to new branch: {branch_name}")
        else:
            # For existing repository, check if branch exists
            try:
                # Try to fetch all branches from remote
                subprocess.run(["git", "fetch", "--all"], check=True)
                
                # Check if branch exists locally or remotely
                branch_check = subprocess.run(
                    ["git", "branch", "-a"], 
                    capture_output=True, 
                    text=True, 
                    check=True
                )
                
                if branch_name in branch_check.stdout:
                    # Branch exists, switch to it
                    subprocess.run(["git", "checkout", branch_name], check=True)
                    print(f"Switched to existing branch: {branch_name}")
                else:
                    # Branch doesn't exist, create and switch to it
                    subprocess.run(["git", "checkout", "-b", branch_name], check=True)
                    print(f"Created and switched to new branch: {branch_name}")
            except subprocess.CalledProcessError:
                # If fetch fails (e.g., no remote branches), create new branch
                subprocess.run(["git", "checkout", "-b", branch_name], check=True)
                print(f"Created and switched to new branch: {branch_name}")
        
        # Push to remote with force if it's a new branch
        try:
            subprocess.run(["git", "push", "-u", "origin", branch_name], check=True)
        except subprocess.CalledProcessError:
            # If push fails, try force push for new branches
            subprocess.run(["git", "push", "-f", "-u", "origin", branch_name], check=True)
        
        print(f"Successfully pushed to {branch_name} branch")
        
    except subprocess.CalledProcessError as e:
        raise GitPushError(f"Git operation failed: {str(e)}")
    except Exception as e:
        raise GitPushError(f"An error occurred: {str(e)}")
    finally:
        # Reset Git config to global if it was set locally
        try:
            if os.path.exists(".git"):
                subprocess.run(["git", "config", "--local", "--unset", "user.name"], check=False)
                subprocess.run(["git", "config", "--local", "--unset", "user.email"], check=False)
                subprocess.run(["git", "config", "--local", "--unset", "commit.gpgsign"], check=False)
        except:
            pass 