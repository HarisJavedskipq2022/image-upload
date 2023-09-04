import cloudinary from 'cloudinary';
import { IncomingForm } from 'formidable';

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).end();
    return;
  }

  const form = new IncomingForm();

  form.parse(req, async (err, _fields, files) => {
    if (err) {
      console.error("Error parsing the form data:", err);
      return res.status(500).json({ error: 'Failed to parse form data' });
    }

    const file = files.file[0];

    if (!file) {
      return res.status(400).json({ error: 'No file provided' });
    }

    try {
      const result = await cloudinary.uploader.upload(file.filepath, {
        upload_preset: 'hgrniko7',
        public_id: file.originalFilename
      });

      res.json(result);
    } catch (error) {
      console.error("Error uploading image:", error);
      res.status(500).json({ error: 'Upload failed' });
    }
  });
};
