/**
 * Utility to read initiator logos from a folder
 */

import fs from 'fs';
import path from 'path';

const INITIATOR_LOGOS_DIR = path.join(process.cwd(), 'public/image/initiator');

// Supported image extensions
const SUPPORTED_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg'];

export async function getInitiatorLogos(): Promise<{ name: string; url: string }[]> {
  try {
    // Check if directory exists
    if (!fs.existsSync(INITIATOR_LOGOS_DIR)) {
      console.log('Initiator logos directory does not exist:', INITIATOR_LOGOS_DIR);
      return [];
    }

    // Read all files from the directory
    const files = fs.readdirSync(INITIATOR_LOGOS_DIR);
    console.log('Files found in initiator directory:', files);

    // Filter for image files only
    const imageFiles = files.filter((file) => {
      const ext = path.extname(file).toLowerCase();
      return SUPPORTED_EXTENSIONS.includes(ext);
    });

    console.log('Image files filtered:', imageFiles);

    // Map to logo objects
    const logos = imageFiles.map((file) => ({
      name: path.parse(file).name, // Use filename without extension as name
      url: `/image/initiator/${file}`,
    }));

    console.log('Initiator logos loaded:', logos);

    return logos;
  } catch (error) {
    console.error('Error reading initiator logos:', error);
    return [];
  }
}
