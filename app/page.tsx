'use client';
import { useState } from 'react';

export default function Home() {
  const [csvData, setCsvData] = useState<string[][]>([]);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const rows = text.split('\n').map((row) => row.split(','));
      setCsvData(rows);
      setUploadSuccess(true);
    };
    reader.readAsText(file);
  };

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

      <div className="mt-10 w-full max-w-md">
        <label className="block mb-2 font-medium">رفع ملف CSV</label>
        <input
          type="file"
          accept=".csv"
          onChange={handleFileUpload}
          className="mb-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        />

        {uploadSuccess && (
          <p className="text-green-600 font-medium">تم رفع الملف بنجاح!</p>
        )}

        {csvData.length > 0 && (
          <button
            onClick={() => {
              setCsvData([]);
              setUploadSuccess(false);
              setSearchQuery('');
            }}
            className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 shadow-md"
          >
            إزالة الملف وإعادة الرفع
          </button>
        )}

        {csvData.length > 0 && (
          <input
            type="text"
            placeholder="ابحث عن منشأة..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="mt-4 w-full px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        )}
      </div>

      {csvData.length > 0 && (
        <div className="mt-8 overflow-x-auto">
          <table className="border-collapse border border-gray-300 w-full max-w-4xl text-sm">
            <thead>
              <tr>
                {csvData[0].map((cell, index) => (
                  <th
                    key={index}
                    className="border border-gray-300 px-2 py-1 bg-gray-100 font-semibold"
                  >
                    {cell}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {csvData
                .slice(1)
                .filter((row) =>
                  row.some((cell) =>
                    cell.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                )
                .map((row, rowIndex) => (
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
        </div>
      )}
    </main>
  );
}