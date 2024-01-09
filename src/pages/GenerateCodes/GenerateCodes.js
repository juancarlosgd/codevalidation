// src/pages/GenerateCodes.js
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { Table, Button } from 'antd';
import axios from 'axios';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { excelDataState } from '../../state';
import FileUpload from '../../components/fileUpload/FileUpload';
import 'bootstrap/dist/css/bootstrap.min.css'

const GenerateCodes = () => {
  const [excelData, setExcelData] = useRecoilState(excelDataState);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const columns = excelData.length > 0 ? Object.keys(excelData[0]).map(key => ({
    title: key,
    dataIndex: key,
    key: key,
  })) : [];

  const encryptAndAddData = async () => {
    const selectedRows = excelData.filter(data => selectedRowKeys.includes(data.ordinal));
    try {
      const encryptedDataResponses = await Promise.all(selectedRows.map(async (row) => {
      //   const response = await axios.post('https://mk92pckgt5.execute-api.us-east-1.amazonaws.com/dev/encrypt', { ordinal: row.ordinal, data: row });
        const { ordinal, ...rowData } = row;
        const response = await axios.post('https://mk92pckgt5.execute-api.us-east-1.amazonaws.com/dev/encrypt', { ordinal, data: rowData });  
        return {
          ...row,
          Codigo_A: response.data.data.codeA,
          Codigo_B: response.data.data.codeB,
          // encryptedData: response.data.data.encryptedData,
        };
      }));

      const updatedData = excelData.map(dataRow => {
        const foundEncryptedRow = encryptedDataResponses.find(encryptedRow => encryptedRow.ordinal === dataRow.ordinal);
        return foundEncryptedRow ? { ...dataRow, ...foundEncryptedRow } : dataRow;
      });

      setExcelData(updatedData);
    } catch (error) {
      console.error('Error during encryption:', error);
    }
  };

  const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const fileExtension = '.xlsx';

  const exportToExcel = (apiData, fileName) => {
    const ws = XLSX.utils.json_to_sheet(apiData);
    const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  const handleClearData = () => {
    setExcelData([]);
    setSelectedRowKeys([]);
  };

  return (
    <div className='me-3 ms-3'>
      <h1>Generar Códigos de Verificación</h1>
      <FileUpload onClearData={handleClearData} />
      <Button onClick={encryptAndAddData} disabled={selectedRowKeys.length === 0}>
        Generar Codigos
      </Button>
      <Button 
        onClick={() => exportToExcel(excelData, 'datos_exportados')} 
        disabled={selectedRowKeys.length === 0} 
        style={{ marginLeft: 8, marginRight:8 }}
        >
          Exportar a Excel
      </Button>
      <Table 
        rowKey="ordinal"
        rowSelection={rowSelection} 
        columns={columns} 
        dataSource={excelData}
        pagination={false}
      />
    </div>
  );
};

export default GenerateCodes;
