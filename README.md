# Resume

Nuxt 3 application to display an interactive resume based on the JSON Resume format.

## Features

### Automatic Profile Picture

The profile picture is automatically fetched from the first profile URL in the `basics.profiles` list from the `resume.json` file.

- **GitHub**: Uses the GitHub API to fetch the user's avatar
- **LinkedIn**: Uses unavatar.io to fetch the profile picture
- **Other services**: Uses unavatar.io as a fallback

The picture automatically displays in the resume header once fetched.
