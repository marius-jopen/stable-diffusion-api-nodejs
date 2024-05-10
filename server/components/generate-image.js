import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';

export async function generateImage(prompt) {
    const url = 'http://127.0.0.1:7860/sdapi/v1/txt2img';
    
    const params = {
        seed: 1,
        steps: 30,
        width: 1024,
        height: 1024,
        cfgScale: 7,
        samplerName: "Euler a",
        prompt: prompt
    };

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
    });

    if (!response.ok) {
        throw new Error('Failed to generate image: ' + response.statusText);
    }

    const jsonResponse = await response.json();
    const base64ImageData = jsonResponse.images[0];
    const imageData = Buffer.from(base64ImageData, 'base64');
    const timestamp = Date.now();
    const imageName = `image_${timestamp}.png`;
    const outputDir = 'images'; // Change this to your desired path
    const outputPath = path.join(outputDir, imageName);

    await fs.promises.mkdir(outputDir, { recursive: true });
    await fs.promises.writeFile(outputPath, imageData);

    console.log(`Image saved at: ${outputPath}`);

    return { message: `Image saved at: ${outputPath}` };
}
