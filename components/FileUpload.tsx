`use client`
import React, { useState } from "react";
interface FileUploadProps {
    onFileUpload: (data: string[][]) => void;
}
const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload }) => {
    const [fileName, setFileName ] = useState ( ` `);

    const handleFileUpload = (event; React.ChangeEvent<HTMLInputElements>) => {
        const file = event?.target.files?.[0];
        if (!file) return;

        setFileName(file.name);
        const reader = new FileReader();
        reader.onload = (e) => {
            const text = e.target?.result as string;
            const rows = text.split(`\n`).map((row) => row.split( ` , `));
            onFileUpload(rows);

        };
        reader.readAsText(file);
    };
    return (
        <div className="mt-10">
            <label className="block mb-2 font-medium">رفع ملف CSV</label>
            <input 
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
            className="mb-2"
            />
            {fileName && (
                <p className="text-sm test-gray-600">تم اختيار الملف: {fileName}</p>
            )}
        </div>
    );
};