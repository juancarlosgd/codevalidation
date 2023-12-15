// src/pages/AuthorizeCodes.js
import React, { useState } from 'react';
import { Table, Button, message,Checkbox } from 'antd';
import axios from 'axios';
import moment from 'moment';

const ActivateCodes = () => {
    const [data, setData] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    // const [tableData, setTableData] = useState([]);

    const fetchCodes = async () => {
          // Limpiar los datos actuales y la selección
        setData([]);
        setSelectedRowKeys([]);
        try {
            const response = await axios.post('https://mk92pckgt5.execute-api.us-east-1.amazonaws.com/dev/codes', { CompanyID: "000000000" });
            // console.log (response)
            setData(response.data);
        } catch (error) {
            message.error('Error al consultar los códigos');
        }
    };

    const activateCodes = async () => {
      try {
          const companyID = "000000000";
          const itemsToActivate = selectedRowKeys.map(key => ({ CompanyID: companyID, DataID: key }));
          const response = await axios.post('https://mk92pckgt5.execute-api.us-east-1.amazonaws.com/dev/updatecodes', itemsToActivate);
  
          if (response.data && Array.isArray(response.data)) {
              response.data.forEach(responseItem => {
                  if (responseItem.status === 'fulfilled') {
                      const tableItem = data.find(item => item.DataID === responseItem.DataID);
                      console.log(data); 
                      console.log(tableItem);
                      if (tableItem) {
                          tableItem.Activo = true;
                          tableItem.TimestampCode = responseItem.TimestampCode;
                          message.success(`Código ${responseItem.DataID} activado con éxito`);
                      }
                  } else if (responseItem.status === 'rejected') {
                      message.error(`Código ${responseItem.DataID} no pudo ser activado: ${responseItem.reason}`);
                  }
              });
  
              setData([...data]);
          } else {
              message.error('Respuesta inesperada del servidor');
          }
      } catch (error) {
          message.error('Error al activar los códigos: ' + error.message);
      }
  };
  
  

    const columns = [
      {
          title: 'Código A',
          dataIndex: 'DataID',
          key: 'DataID',
      },
      {
          title: 'Fecha/Hora Creación',
          dataIndex: 'TimestampCode',
          key: 'TimestampCode',
          render: timestamp => moment(timestamp).format('DD/MMM/YYYY hh:mm:ss a')
      },
      {
          title: 'Activo',
          dataIndex: 'Activo',
          key: 'Activo',
          render: Activo => (
              <Checkbox checked={Activo} disabled />
          )
      }
  ];

    const rowSelection = {
        selectedRowKeys,
        onChange: setSelectedRowKeys,
    };

    return (
        <div>
          <h1>Activar Códigos de Verificación</h1>
            <Button onClick={fetchCodes}>Consultar Códigos</Button>
            <Button onClick={activateCodes} disabled={!selectedRowKeys.length}>Activar Códigos</Button>
            <Table rowSelection={rowSelection} columns={columns} dataSource={data} rowKey="DataID" />
        </div>
    );
};

export default ActivateCodes;
