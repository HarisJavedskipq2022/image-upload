"use client"

import axios from 'axios';
import { useState } from 'react';
import styles from './page.module.css';


function Home() {
  const [file, setFile] = useState(null);

  const onFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadToCloudinary = async () => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('/api/upload', formData);
      console.log("Uploaded Image URL:", response.data.url);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.uploadSection}>
        <input type="file" onChange={onFileChange} />
        <button onClick={uploadToCloudinary}>Upload to Cloudinary</button>
      </div>
    </main>
  );
}

export default Home;
