'use client';

import { useState } from 'react';
import Image from 'next/image';

export interface GalleryImage {
  id: string;
  url: string;
  caption: string;
  date?: string;
  category?: string;
}

interface GalleryProps {
  images: GalleryImage[];
  loading?: boolean;
  error?: string;
}

/**
 * Parse date string to Date object (normalized to midnight UTC)
 * Handles Google Sheets format: Date(2026,0,4)
 */
function parseDate(dateStr: string | null | undefined): Date | null {
  if (!dateStr) return null;

  try {
    let date: Date | null = null;

    if (typeof dateStr === 'string') {
      // Handle Google Sheets JavaScript date format: Date(2026,0,4)
      if (dateStr.startsWith('Date(')) {
        const match = dateStr.match(/Date\((\d+),(\d+),(\d+)\)/);
        if (match) {
          const [, year, month, day] = match;
          // Create date in UTC to avoid timezone issues
          date = new Date(Date.UTC(parseInt(year), parseInt(month), parseInt(day)));
        }
      } else {
        date = new Date(dateStr);
      }
    }

    if (!date || isNaN(date.getTime())) return null;

    // Normalize to midnight UTC
    return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
  } catch {
    return null;
  }
}

export default function Gallery({ images, loading = false, error }: GalleryProps) {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [imageError, setImageError] = useState<Record<string, boolean>>({});

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin">
          <div className="w-12 h-12 border-4 border-navy-900 border-t-gold-500 rounded-full"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <p className="text-red-700 font-medium">{error}</p>
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="bg-gray-50 rounded-lg p-12 text-center">
        <p className="text-gray-500 text-lg">📸 Belum ada gambar di galeri</p>
        <p className="text-gray-400 text-sm mt-2">
          Tambahkan gambar ke spreadsheet untuk menampilkannya di sini
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {images.map((image) => (
          <div
            key={image.id}
            onClick={() => setSelectedImage(image)}
            className="group relative overflow-hidden rounded-lg cursor-pointer bg-gray-100 aspect-square hover:shadow-lg transition-shadow"
          >
            {!imageError[image.id] ? (
              <img
                src={image.url}
                alt={image.caption}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onError={() => setImageError({ ...imageError, [image.id]: true })}
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-gray-200 text-gray-400">
                <span className="text-3xl mb-2">🖼️</span>
                <span className="text-xs">Gambar tidak tersedia</span>
              </div>
            )}

            {/* Overlay with caption */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-end p-3">
              <div className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity line-clamp-2">
                {image.caption}
              </div>
            </div>

            {/* Date badge */}
            {image.date && (
              <div className="absolute top-2 right-2 bg-navy-900/80 text-white text-xs px-2 py-1 rounded-full">
                {(() => {
                  const parsedDate = parseDate(image.date);
                  return parsedDate
                    ? parsedDate.toLocaleDateString('id-ID', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })
                    : image.date;
                })()}
              </div>
            )}

            {/* Category badge */}
            {image.category && (
              <div className="absolute top-2 left-2 bg-gold-500/80 text-navy-900 text-xs px-2 py-1 rounded-full font-medium">
                {image.category}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="bg-white rounded-lg max-w-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            {/* Close button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl z-10 bg-white rounded-full w-10 h-10 flex items-center justify-center"
            >
              ✕
            </button>

            {/* Image */}
            <div className="relative w-full aspect-video bg-gray-200">
              {!imageError[selectedImage.id] ? (
                <img
                  src={selectedImage.url}
                  alt={selectedImage.caption}
                  className="w-full h-full object-cover"
                  onError={() => setImageError({ ...imageError, [selectedImage.id]: true })}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400">
                  <div className="text-center">
                    <p className="text-4xl mb-2">🖼️</p>
                    <p>Gambar tidak tersedia</p>
                  </div>
                </div>
              )}
            </div>

            {/* Details */}
            <div className="p-6 border-t border-gray-200">
              <h3 className="text-xl font-semibold text-navy-900 mb-2">{selectedImage.caption}</h3>

              <div className="space-y-2 text-sm text-gray-600">
                {selectedImage.date && (
                  <p>
                    <span className="font-medium">Tanggal:</span>{' '}
                    {(() => {
                      const parsedDate = parseDate(selectedImage.date);
                      return parsedDate
                        ? parsedDate.toLocaleDateString('id-ID', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })
                        : selectedImage.date;
                    })()}
                  </p>
                )}
                {selectedImage.category && (
                  <p>
                    <span className="font-medium">Kategori:</span> {selectedImage.category}
                  </p>
                )}
              </div>

              {/* Navigation buttons */}
              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => setSelectedImage(null)}
                  className="flex-1 px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
