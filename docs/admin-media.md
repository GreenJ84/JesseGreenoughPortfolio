# Admin media setup

The resource editors can choose an existing Cloudinary image, upload a new JPEG/PNG/WebP image, or keep a local path or URL. The media library and upload endpoints require an active owner session.

Set these **server-only** environment variables in local development and deployment:

- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`

The Cloudinary cloud is `portfolio-g84`, matching the existing public image configuration. Never use a `NEXT_PUBLIC_` prefix for the API credentials. Restart the local server after adding them. The picker displays a configuration error if they are absent; manual image paths remain available.

Uploads are limited to 5 MB. The server checks the file, converts it to WebP with a maximum 2400-pixel side, and uploads it to the `portfolio-admin` folder. The saved resource stores the returned secure delivery URL. Uploading an image alone does not save the resource; use the form's Save/Create button afterward.
