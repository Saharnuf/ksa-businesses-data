'use client';

import { useState } from 'react';
import FileUpload from '../components/FileUpload'; 

export default function Home() {
  const [csvData, setCsvData] = useState<string[][]>([]);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8 text-center">
      <h1 className="text-3xl font-bold mb-4">منصة بيانات المنشآت التجارية</h1>
      <p className="mb-6 text-gray-700">
        أداة تمكّن من الوصول لمصادر المنشآت التجارية، ورفع البيانات المرفقة، والاطلاع عليها
      </p>

      <section className="mt-6 w-full max-w-2xl">
        <h2 className="text-xl font-semibold mb-2 text-gray-800">المصادر الرسمية لبيانات المنشآت</h2>
        <ul className="space-y-2">
          <li>
            <a
              href="https://open.data.gov.sa/ar/datasets/view/31af324f-d2b5-459a-9824-f27f8adef5fd/resources"
              target="_blank"
              className="text-blue-600 hover:underline"
            >
              بوابة البيانات المفتوحة - بيانات المنشآت التجارية
            </a>
          </li>
        </ul>
      </section>

      {/* زر رفع الملف (أنشأنته داخل مكون منفصل) */}
      <div className="mt-10 w-full max-w-md">
        <FileUpload onFileUpload={setCsvData} />
      </div>

      {/* جدول عرض البيانات */}
      {csvData.length > 0 && (
        <table className="mt-8 border-collapse border border-gray-300 w-full max-w-4xl text-sm">
          <thead>
            <tr>
              {csvData[0].map((cell, index) => (
                <th key={index} className="border border-gray-300 px-2 py-1 bg-gray-100 font-semibold">
                  {cell}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {csvData.slice(1).map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} className="border border-gray-300 px-2 py-1">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}