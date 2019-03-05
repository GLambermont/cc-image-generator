/**
 * Create a color checker image from a list of colors.
 * @param {Object} settings
 * @param {Array} settings.colors Colors to create image from.
 * @param {Array} settings.fileName Filename of checker image.
 * @param {Number} settings.itemWidth Width of each image in the color checker.
 * @param {Number} settings.itemHeight Height of each image in the color checker.
 */
const generateCheckerImage = ({ colors, fileName, itemWidth = 64, itemHeight = 64 }) => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
    
  // Set the canvas size to fit all colors
  canvas.width = itemWidth;
  canvas.height = colors.length * itemHeight;

  // Draw all colors onto the canvas
  colors.forEach((color, i) => {
    ctx.fillStyle = color;
    ctx.fillRect(0, i * itemHeight, itemWidth, itemHeight);
  });

  // Download the created image
  canvas.toBlob(blob => {
    const downloadLinkEl = document.createElement('a');

    // Create a download element
    downloadLinkEl.href = URL.createObjectURL(blob);
    downloadLinkEl.download = `${fileName}.png`;

    // Use download element to download the canvas as an image
    document.body.appendChild(downloadLinkEl);
    downloadLinkEl.click();
    document.body.removeChild(downloadLinkEl);
  });
};

export {
  generateCheckerImage
};