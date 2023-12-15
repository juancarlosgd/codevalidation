// src/pages/GenerateCodes.js
import React, { useCallback, useMemo, useState } from 'react';
import { useRecoilState } from 'recoil';
import { excelDataState } from '../state';
import DataTable from 'react-data-table-component';
import FileUpload from '../components/FileUpload';

const GenerateCodes = () => {
  const [excelData] = useRecoilState(excelDataState);
  const [selectedRows, setSelectedRows] = useState([]);

  const handleRowSelected = useCallback(state => {
    // console.log(state.selectedRows); // Esto mostrará las filas seleccionadas cada vez que cambien
    setSelectedRows(state.selectedRows);
  }, []);

  const contextActions = useMemo(() => {
    const handleDelete = () => {
      // Lógica para manejar la eliminación de filas seleccionadas
    };

    return <button key="delete" onClick={handleDelete}>Eliminar</button>;
  }, []);

  const columns = excelData.length > 0 ? Object.keys(excelData[0]).map(key => ({
    name: key,
    selector: row => row[key],
    sortable: true,
  })) : [];

  return (
    <div>
      <h1>Generar Códigos</h1>
      <FileUpload />
      <DataTable
        columns={columns}
        data={excelData}
        selectableRows
        onSelectedRowsChange={handleRowSelected}
        contextActions={contextActions}
        clearSelectedRows={selectedRows.length > 0}
      />
    </div>
  );
};

export default GenerateCodes;
