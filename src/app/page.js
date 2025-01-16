'use client';
import Image from "next/image";
import { useState, useCallback } from "react";

export default function Home() {
  const [file, setFile] = useState(null);
  const [selectedSizes, setSelectedSizes] = useState({
    16: true, 32: true, 48: true, 64: true, 128: true, 256: true
  });
  const [isConverting, setIsConverting] = useState(false);
  const [error, setError] = useState(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile?.type === "image/png") {
      setFile(droppedFile);
      setError(null);
    } else {
      setError("Please drop a PNG file");
    }
  }, []);

  const handleFileInput = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile?.type === "image/png") {
      setFile(selectedFile);
      setError(null);
    } else {
      setError("Please select a PNG file");
    }
  };

  const handleSizeToggle = (size) => {
    setSelectedSizes(prev => ({
      ...prev,
      [size]: !prev[size]
    }));
  };

  const convertToIco = async () => {
    if (!file) {
      setError("Please select a file first");
      return;
    }

    const activeSizes = Object.entries(selectedSizes)
      .filter(([_, isSelected]) => isSelected)
      .map(([size]) => parseInt(size));

    if (activeSizes.length === 0) {
      setError("Please select at least one size");
      return;
    }

    setIsConverting(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('sizes', JSON.stringify(activeSizes));

      const response = await fetch('/api/convert', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Conversion failed');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${file.name.replace('.png', '')}.ico`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      setError('Failed to convert image. Please try again.');
    } finally {
      setIsConverting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-gray-50 dark:from-background dark:to-gray-900">
      <header className="w-full py-6 px-4 border-b border-gray-100 dark:border-gray-800 bg-background/50 backdrop-blur-sm fixed top-0 z-10">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            PNG to ICO
          </h1>
          <a 
            href="https://github.com/krupesh-app/png-to-ico" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
          </a>
        </div>
      </header>

      <main className="max-w-3xl mx-auto flex flex-col gap-8 items-center pt-32 px-4">
        <div className="text-center space-y-4">
          <h2 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            PNG to ICO Converter
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Convert your PNG images to ICO format for favicons and icons
          </p>
        </div>

        <div 
          className={`w-full max-w-md p-8 border-2 border-dashed rounded-xl transition-all duration-300 ${
            file 
              ? "border-green-500 dark:border-green-600 bg-green-50 dark:bg-green-900/10" 
              : "border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-900/10"
          }`}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center gap-6">
            <div className="relative w-16 h-16">
              <Image
                src="/upload.svg"
                alt="Upload icon"
                fill
                className="dark:invert opacity-50"
              />
            </div>
            <label htmlFor="file-upload" className="cursor-pointer group">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full hover:shadow-lg transition-all duration-300 inline-block">
                Choose PNG File
              </span>
              <input
                id="file-upload"
                type="file"
                accept=".png"
                className="hidden"
                onChange={handleFileInput}
              />
            </label>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {file ? file.name : "or drag and drop your PNG file here"}
            </p>
          </div>
        </div>

        {error && (
          <div className="w-full max-w-md bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <p className="text-red-600 dark:text-red-400 text-sm text-center">{error}</p>
          </div>
        )}

        <div className="w-full max-w-md bg-white dark:bg-gray-800/50 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
          <h2 className="text-xl font-semibold mb-4">Icon Sizes</h2>
          <div className="grid grid-cols-3 gap-3">
            {[16, 32, 48, 64, 128, 256].map((size) => (
              <label key={size} className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedSizes[size]}
                  onChange={() => handleSizeToggle(size)}
                  className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                />
                <span className="text-sm">{size}x{size}</span>
              </label>
            ))}
          </div>
          
          <button
            className={`w-full mt-6 py-3 rounded-lg text-white transition-all duration-300 ${
              isConverting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-lg"
            }`}
            type="button"
            onClick={convertToIco}
            disabled={!file || isConverting}
          >
            {isConverting ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Converting...
              </span>
            ) : (
              "Convert to ICO"
            )}
          </button>
        </div>
      </main>

      <footer className="mt-16 py-8 border-t border-gray-100 dark:border-gray-800">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Free online PNG to ICO converter • No upload limits • Privacy focused
          </p>
        </div>
      </footer>
    </div>
  );
}
