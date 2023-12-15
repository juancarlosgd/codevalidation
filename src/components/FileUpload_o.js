// src/components/FileUpload.js
import React, { useRef, useState } from 'react';
import * as XLSX from 'xlsx';
import { useSetRecoilState } from 'recoil';
import { excelDataState } from '../state';
import Swal from 'sweetalert2';

const FileUpload = ({ onClearData }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const setExcelData = useSetRecoilState(excelDataState);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileExtension = file.name.split('.').pop().toLowerCase();
      if (fileExtension === 'xlsx') {
        setSelectedFile(file);
      } else {
        setSelectedFile(null);
        Swal.fire({
          title: 'Archivo incorrecto',
          text: 'Por favor, selecciona un archivo Excel (.xlsx).',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
        fileInputRef.current.value = ''; // Limpia el input si el archivo no es correcto
      }
    }
  };

  const handleUploadClick = () => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const buffer = e.target.result;
        const workbook = XLSX.read(buffer, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        let json = XLSX.utils.sheet_to_json(worksheet, { raw: false });

        // Asegurarse de que cada 'ordinal' se trate como un string
        json = json.map((row, index) => ({
          ...row,
          ordinal: (index + 1).toString() // Asigna un ordinal basado en el índice + 1
        }));

        setExcelData(json); // Actualiza el estado global de Recoil con los datos de Excel
      };
      reader.readAsArrayBuffer(selectedFile);
    }
  };

  const handleClearClick = () => {
    setSelectedFile(null);
    setExcelData([]); // Limpiar el estado de Recoil que contiene los datos del Excel
    fileInputRef.current.value = ''; // Limpia el input de archivo visualmente
    onClearData();
  };

  return (
    <div>
      <input
        type="file"
        accept=".xlsx"
        onChange={handleFileChange}
        ref={fileInputRef}
      />
      <button onClick={handleUploadClick} disabled={!selectedFile}>
        Cargar Archivo
      </button>
      <button onClick={handleClearClick}>
        Limpiar
      </button>
    </div>
  );
};

export default FileUpload;
