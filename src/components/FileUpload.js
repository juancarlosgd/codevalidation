// src/components/FileUpload.js
import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { useSetRecoilState } from 'recoil';
import { excelDataState } from '../state';
import { Upload, Button, message } from 'antd';
import { InboxOutlined, UploadOutlined } from '@ant-design/icons';

const { Dragger } = Upload;

const FileUpload = ({ onClearData }) => {
  const [fileList, setFileList] = useState([]);
  const setExcelData = useSetRecoilState(excelDataState);

  const handleFileRead = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const buffer = e.target.result;
      const workbook = XLSX.read(buffer, { type: 'buffer' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json(worksheet, { raw: false });
      json.forEach((row, index) => {
        row.ordinal = (index + 1).toString();
      });
      setExcelData(json);
    //   setFileList([]); // Clear the fileList after the read is successful
    };
    reader.readAsArrayBuffer(file);
  };

  const beforeUpload = (file) => {
    const isXlsx = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    if (!isXlsx) {
      message.error(`${file.name} is not an Excel file.`);
      return Upload.LIST_IGNORE;
    }
    // Temporary hold the file in fileList state
    setFileList([file]);
    return false; // Do not upload automatically
  };

  const handleRemove = () => {
    setFileList([]);
    setExcelData([]);
    onClearData();
  };

  return (
    <>
      <Dragger
        accept=".xlsx"
        beforeUpload={beforeUpload}
        onRemove={handleRemove}
        fileList={fileList}
        showUploadList={true}
        multiple={false}
        style={{ marginBottom: 16 }}
      >
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Haga clic o arrastre el archivo a esta área para cargarlo.</p>
        <p className="ant-upload-hint">Solo se permiten archivos de Excel ".xlsx"</p>
      </Dragger>
      <Button
        type="primary"
        onClick={() => handleFileRead(fileList[0])}
        disabled={!fileList.length}
        icon={<UploadOutlined />}
      >
        Cargar Archivo
      </Button>
      <Button
        onClick={handleRemove}
        disabled={!fileList.length}
        style={{ marginLeft: 8, marginRight:8 }}
      >
        Limpiar
      </Button>
    </>
  );
};

export default FileUpload;
