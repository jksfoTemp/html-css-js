Python

from PIL import Image
import os

def reduce_image_size(image_path, output_path, quality=85):
    """Reduces the file size of an image using PIL.

# Filename:
#   /media/sf_xfer/projects/git/jksfoTemp/python3/pySandbox/imageResize/ imgSmall.py
# FilesDir:
#   /media/sf_xfer/projects/git/jksfoTemp/html-css-js/AMonthAtATime/assets

# JKR jksfo.resume@gmail.com

    Args:
        image_path: Path to the input image.
        output_path: Path to save the reduced image.
        quality: Quality of the JPEG image (0-100, lower is smaller).  Only applies to JPEG output.
    """
    try:
        img = Image.open(image_path)

        # Determine the file extension (case-insensitive)
        name, ext = os.path.splitext(image_path)
        ext = ext.lower()

        if ext in ['.jpg', '.jpeg']:
            img.save(output_path, "JPEG", quality=quality, optimize=True)  # Optimize for JPEGs
        elif ext == '.png':
            img.save(output_path, "PNG", optimize=True) # Optimize for PNGs (lossless)
        elif ext == '.gif':
           img.save(output_path, "GIF") # GIF compression is limited, but this will reduce colours
        elif ext == '.webp':
            img.save(output_path, "WEBP", quality=quality, lossless=False) # Lossy webp for smaller size
        else:
            print(f"Unsupported image format: {ext}")
            return

        print(f"Image '{image_path}' reduced and saved to '{output_path}'")

    except FileNotFoundError:
        print(f"Error: Image file '{image_path}' not found.")
    except Exception as e:
        print(f"An error occurred: {e}")


def process_directory(input_dir, output_dir, quality=85):
    """Processes all images in a directory.

    Args:
        input_dir: Path to the input directory.
        output_dir: Path to save the reduced images.
        quality: Quality of the JPEG images (0-100).
    """

    if not os.path.exists(output_dir):
        os.makedirs(output_dir)  # Create output directory if it doesn't exist

    for filename in os.listdir(input_dir):
        if os.path.isfile(os.path.join(input_dir, filename)):  # Only process files
            input_path = os.path.join(input_dir, filename)
            output_path = os.path.join(output_dir, filename)  # Same name in output dir
            reduce_image_size(input_path, output_path, quality)


# Example usage:

# 1. Reduce a single image:
reduce_image_size("path/to/your/image.jpg", "path/to/output/reduced_image.jpg", quality=75) # Adjust quality as needed

# 2. Reduce all images in a directory:
input_directory = "path/to/your/images/directory"
output_directory = "path/to/output/directory"
process_directory(input_directory, output_directory, quality=90)

# 3. Reduce all images in a directory, keeping the same structure:
input_directory = "path/to/your/images/directory"
output_directory = "path/to/output/directory"

for root, dirs, files in os.walk(input_directory):
    for file in files:
        input_path = os.path.join(root, file)
        relative_path = os.path.relpath(input_path, input_directory) # Path relative to input_dir
        output_path = os.path.join(output_directory, relative_path)
        output_dir_for_file = os.path.dirname(output_path) # Create nested folders

        if not os.path.exists(output_dir_for_file):
            os.makedirs(output_dir_for_file)

        reduce_image_size(input_path, output_path, quality=90)


Key Improvements and Explanations:

Handles Different Image Formats: The code now checks the file extension and uses the appropriate save method for JPEG, PNG, GIF and WebP images. It also includes basic error handling for unsupported formats.
PNG Optimization: PNGs are now also optimized using optimize=True in the save() method. PNG optimization is lossless.
GIF and WebP Support: Added basic support for GIF and WebP. GIF compression has limitations. WebP offers a good balance between size and quality.
Directory Processing: The process_directory function makes it easy to reduce all images within a given directory. It also creates the output directory if it doesn't already exist.
Error Handling: The try...except block handles potential errors, such as the file not being found or other exceptions during image processing. This makes the code more robust.
Quality Parameter: The quality parameter allows you to control the compression level for JPEG images. Lower values result in smaller file sizes but potentially lower image quality. This parameter is also used for WebP.
Preserve Directory Structure: The example code now shows how to use os.walk and os.path.relpath to process images in a directory and keep the same directory structure in the output directory. This is very useful when dealing with many images organized in folders.
How to Use:

Install Pillow (PIL): If you don't have it already, install the Pillow library: pip install Pillow
Save the Code: Save the code as a Python file (e.g., reduce_images.py).
Run the Script:
Single Image: Modify the reduce_image_size example at the bottom of the script with the correct input and output paths, and then run the script: python reduce_images.py
Directory: Modify the process_directory example with the input and output directory paths, and then run the script.
Directory with Subfolders: Modify the os.walk example with the input and output directory paths, and then run the script.
Important Notes:

JPEG Quality: Experiment with the quality parameter to find a good balance between file size and image quality. Values between 70 and 90 are often a good starting point.
File Formats: JPEG is a lossy compression format (some image data is discarded), so the quality will be reduced. PNG is lossless (all image data is preserved), but PNG files are often larger than JPEGs, except when the image has large areas of the same color. WebP can be lossy or lossless.
Large Images: For very large images, you might want to consider resizing them before reducing the quality to further decrease file size. PIL provides functions for resizing as well.
WebP: WebP is a modern image format that offers excellent compression. If you're targeting web use, converting to WebP is usually a good idea. You can use the provided code to convert your images to WebP.
