'use client';

export default function ProductSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col animate-pulse">
      {/* Imagen skeleton */}
      <div className="h-64 bg-gray-200"></div>

      <div className="p-8 flex-1 flex flex-col">
        {/* Título skeleton */}
        <div className="h-8 bg-gray-200 rounded-lg w-3/4 mb-2"></div>

        {/* Rating skeleton */}
        <div className="flex gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-6 h-6 bg-gray-200 rounded-full"></div>
          ))}
        </div>

        {/* Descripción skeleton */}
        <div className="space-y-2">
          <div className="h-6 bg-gray-200 rounded-lg w-full"></div>
          <div className="h-6 bg-gray-200 rounded-lg w-5/6"></div>
        </div>

        {/* Precio y categoría skeleton */}
        <div className="mt-auto space-y-4">
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="h-8 bg-gray-200 rounded-lg w-24"></div>
            <div className="h-8 bg-gray-200 rounded-lg w-32"></div>
          </div>

          {/* Botón skeleton */}
          <div className="h-16 bg-gray-200 rounded-lg w-full"></div>
        </div>
      </div>
    </div>
  );
}
