
// utils/cloudinary.ts
export async function uploadFile(file: File, preset: string): Promise<string> {

  const isRaw = file.type === "application/pdf"; // add other raw types if needed
  const resourceType = isRaw ? "raw" : "auto"; // 'auto' works for images

  
  const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/${resourceType}/upload`;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", preset);

  

  const res = await fetch(url, {
    method: "POST",
    body: formData,
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error?.message || 'Échec du téléchargement.');
  console.log('data', data);
  return data.secure_url; 
}

/**
 * Replace an old file with a new one in Cloudinary
 * - oldUrl: existing Cloudinary URL (optional)
 * - newFile: new File object (optional)
 * - preset: which preset to use
 */
export async function replaceFile(oldUrl?: string, newFile?: File, preset?: string) {
  // If no new file, keep old
  if (!newFile) return oldUrl || null;

  // Upload new file
  const newUrl = await uploadFile(newFile, preset!);

  // Delete old file from Cloudinary if exists
  if (oldUrl) {
    try {
      const publicId = oldUrl.split("/").slice(-1)[0].split(".")[0]; // extract public_id
      await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/resources/image/upload`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Basic ${btoa(
              `${process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY}:${process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET}`
            )}`,
          },
          body: JSON.stringify({ public_id: publicId }),
        }
      );
    } catch (err) {
      console.warn("Failed to delete old file from Cloudinary", err);
    }
  }

  return newUrl;
}
