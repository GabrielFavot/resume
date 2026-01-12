# Resume

Nuxt 3 application to display an interactive resume based on the JSON Resume format.

## Environment Variables

### `NUXT_PUBLIC_LOGO_DEV_API_KEY`

API key for [logo.dev](https://logo.dev) service used to fetch company logos. This is optional but recommended for better logo display.

**Docker Compose**: Set the `LOGO_DEV_API_KEY` environment variable when running `docker-compose up`:

```bash
LOGO_DEV_API_KEY=your_api_key_here docker-compose up
```

Or create a `.env` file:

```env
LOGO_DEV_API_KEY=your_api_key_here
```

## Features

### Automatic Profile Picture

The profile picture is automatically fetched from the first profile URL in the `basics.profiles` list from the `resume.json` file.

- **GitHub**: Uses the GitHub API to fetch the user's avatar
- **LinkedIn**: Uses unavatar.io to fetch the profile picture
- **Other services**: Uses unavatar.io as a fallback

The picture automatically displays in the resume header once fetched.
