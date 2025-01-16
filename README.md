# PNG to ICO Converter

A modern, fast, and privacy-focused online tool to convert PNG images to ICO format. Perfect for creating favicons and application icons.

## Features

- 🖼️ Convert PNG images to ICO format
- 📏 Multiple size options (16x16 to 256x256)
- 🎯 Drag and drop support
- 🌙 Dark mode support
- 🔒 Privacy focused - all processing done locally
- 💨 Fast conversion using Sharp
- 📱 Responsive design

## Tech Stack

- Next.js 15
- React 19
- Tailwind CSS
- Sharp for image processing
- png-to-ico for ICO conversion

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/pngtoico.git
```
2. Install dependencies:
```bash
npm install
```
3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser.

## Development

The project structure is organized as follows:
pngtoico/
├── src/
│ ├── app/
│ │ ├── api/
│ │ │ └── convert/
│ │ │ └── route.js # API endpoint for conversion
│ │ ├── page.js # Main converter page
│ │ ├── layout.js # Root layout
│ │ └── globals.css # Global styles
│ └── public/
│ └── upload.svg # Upload icon

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Sharp](https://sharp.pixelplumbing.com/) for image processing
- [png-to-ico](https://www.npmjs.com/package/png-to-ico) for ICO conversion
- [Tailwind CSS](https://tailwindcss.com/) for styling
