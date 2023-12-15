// state.js
import { atom } from 'recoil';

export const excelDataState = atom({
  key: 'excelDataState', // identificador único
  default: [], // valor por defecto (datos iniciales)
});
