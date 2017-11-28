# github-labels
CLI to manage labels across multiple repositories

## Usage

Add a config file `.gl.json` to your home directory:

```
{
  "token": "YOUR_SECRET_GITHUB_TOKEN"
}
```

Run this command to sync labels according to your specified list file.
```
# sync single repository
gl sync org/repo -l labels.json

# sync all repositories of an organisation
gl sync org -l labels.json
```