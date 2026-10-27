/**
 * Utility for image optimization, responsive formats, and client-side canvas compression.
 * Ensures all images load lightning fast on any device and connection speed.
 */

export interface OptimizedImageSet {
  webpSrc: string;
  fallbackSrc: string;
}

/**
 * Returns both the modern compressed WebP format and progressive JPEG fallback
 * for known local assets. For external or data URLs, passes through gracefully.
 */
export function getOptimizedImageSources(src: string | undefined): OptimizedImageSet {
  if (!src) {
    return {
      webpSrc: '/assets/images/product_disc_brakes_1792689416762.webp',
      fallbackSrc: '/assets/images/product_disc_brakes_1792689416762.jpg'
    };
  }

  // Already a data URL (e.g. client-side compressed photo) or external URL
  if (src.startsWith('data:') || src.startsWith('blob:') || src.startsWith('http://') || src.startsWith('https://')) {
    return {
      webpSrc: src,
      fallbackSrc: src
    };
  }

  // Normalize legacy '/src/assets/images/' to public static '/assets/images/'
  let cleanPath = src.replace(/^\/src\/assets\//, '/assets/');

  // If path is for official document
  if (cleanPath.includes('image_6cb76264')) {
    return {
      webpSrc: '/assets/aistudio/image_6cb76264.webp',
      fallbackSrc: '/assets/aistudio/image_6cb76264.png'
    };
  }
  if (cleanPath.includes('IMG-20261024-WA0001_eabab939')) {
    return {
      webpSrc: '/assets/aistudio/IMG-20261024-WA0001_eabab939.webp',
      fallbackSrc: '/assets/aistudio/IMG-20261024-WA0001_eabab939.jpg'
    };
  }

  // If already .webp
  if (cleanPath.endsWith('.webp')) {
    return {
      webpSrc: cleanPath,
      fallbackSrc: cleanPath.replace(/\.webp$/, '.jpg')
    };
  }

  // If .jpg or .png, generate corresponding .webp version
  if (cleanPath.endsWith('.jpg') || cleanPath.endsWith('.jpeg') || cleanPath.endsWith('.png')) {
    const basePath = cleanPath.replace(/\.(jpg|jpeg|png)$/, '');
    return {
      webpSrc: `${basePath}.webp`,
      fallbackSrc: cleanPath
    };
  }

  return {
    webpSrc: cleanPath,
    fallbackSrc: cleanPath
  };
}

export interface CompressOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
  outputFormat?: 'image/webp' | 'image/jpeg';
}

export interface CompressionResult {
  dataUrl: string;
  width: number;
  height: number;
  originalSizeKB: number;
  compressedSizeKB: number;
  savingsPercentage: number;
}

/**
 * Client-side browser image compression via Canvas.
 * Takes an input File (e.g. from file input or camera) and compresses it
 * into a lightweight WebP or JPEG Data URL before storing.
 */
export async function compressImageFile(
  file: File,
  options: CompressOptions = {}
): Promise<CompressionResult> {
  const {
    maxWidth = 900,
    maxHeight = 900,
    quality = 0.80,
    outputFormat = 'image/webp'
  } = options;

  const originalSizeKB = Math.round(file.size / 1024);

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('No se pudo leer el archivo de imagen'));
    reader.onload = (e) => {
      const img = new Image();
      img.onerror = () => reject(new Error('Formato de imagen inválido o corrupto'));
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // Downscale while preserving aspect ratio
        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('No se pudo inicializar el contexto 2D para compresión'));
          return;
        }

        // Draw with high smoothing quality
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);

        // Attempt WebP compression with fallback to JPEG
        let dataUrl = canvas.toDataURL(outputFormat, quality);
        if (!dataUrl.startsWith(`data:${outputFormat}`)) {
          dataUrl = canvas.toDataURL('image/jpeg', quality);
        }

        // Calculate compressed size in KB from base64
        const head = dataUrl.indexOf(',') + 1;
        const base64Length = dataUrl.length - head;
        const compressedSizeBytes = Math.round((base64Length * 3) / 4);
        const compressedSizeKB = Math.round(compressedSizeBytes / 1024);

        const savingsPercentage = originalSizeKB > 0
          ? Math.max(0, Math.round(((originalSizeKB - compressedSizeKB) / originalSizeKB) * 100))
          : 0;

        resolve({
          dataUrl,
          width,
          height,
          originalSizeKB,
          compressedSizeKB,
          savingsPercentage
        });
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  });
}
