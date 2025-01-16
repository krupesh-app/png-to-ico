import sharp from 'sharp';
import pngToIco from 'png-to-ico';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    const sizes = JSON.parse(formData.get('sizes'));

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    
    // Create resized versions for each selected size
    const resizedBuffers = await Promise.all(
      sizes.map(async (size) => {
        return sharp(buffer)
          .resize(size, size)
          .png()
          .toBuffer();
      })
    );

    // Convert to ICO using png-to-ico
    const icoBuffer = await pngToIco(resizedBuffers);

    return new NextResponse(icoBuffer, {
      headers: {
        'Content-Type': 'image/x-icon',
        'Content-Disposition': 'attachment; filename="icon.ico"',
      },
    });
  } catch (error) {
    console.error('Conversion error:', error);
    return NextResponse.json(
      { error: 'Failed to convert image' },
      { status: 500 }
    );
  }
} 