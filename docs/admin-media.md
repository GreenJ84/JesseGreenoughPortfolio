# Admin media

Resource editors can choose an existing Cloudinary image, upload a JPEG, PNG, or WebP image, or enter a local image path or URL. Media listing and upload endpoints require an active owner session.

Set `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, and `CLOUDINARY_API_SECRET` as server-side environment variables. The cloud name selects the account for uploads and limits accepted delivery URLs to that tenant. The static portrait's tenant is already allowed for public image optimization; the configured tenant is also allowed when present. Keep API credentials out of `NEXT_PUBLIC_*` variables. Missing admin-media configuration produces a media error; manual image paths remain available.

Uploads are limited to 5 MB. The server validates the file, converts it to WebP with a maximum 2400-pixel side, and uploads it to the `portfolio-admin` folder. The resource is saved separately through its editor form.
