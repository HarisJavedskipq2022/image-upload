import axios from 'axios';
import { IncomingForm } from 'formidable';
import FormData from 'form-data';
import fs from 'fs';


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

    // Create a new FormData object
    const formData = new FormData();
    formData.append('file', fs.createReadStream(file.filepath));
    formData.append('upload_preset', 'hgrniko7');
    formData.append('file_name', file.originalFilename);

    try {
      const cloudinaryResponse = await axios.post(
        `https://api.cloudinary.com/v1_1/dybpyxqbr/image/upload`,
        formData,
        {
          headers: formData.getHeaders(),
        }
      );
      res.json(cloudinaryResponse.data);
    } catch (error) {
      console.error("Error uploading image:", error);
      res.status(500).json({ error: 'Upload failed' });
    }
  });
};
