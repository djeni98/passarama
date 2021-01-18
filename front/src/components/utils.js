import networkErrorImg from '../assets/network-error.svg';
import searchErrorImg from '../assets/invalid-params.svg'
import genericErrorImg from '../assets/generic-error.svg'

export function queryString(string) {
  const params = new URLSearchParams(string);
  let obj = {};
  for (const [key, value] of params) {
    obj[key] = value;
  }
  return obj;
}

export function getMessageAndImageFromError(error) {
  let err = { img: genericErrorImg, msg: 'Um erro não identificado aconteceu' }

  if (error.message === 'Network Error') {
    err = { img: networkErrorImg, msg: 'Erro de conexão com o servidor' }
  } else if (error.code === 400) {
    err = { img: searchErrorImg, msg: 'Parâmetros de busca inválidos' }
  }

  return err;
}

export function toBRDate(isoFormat) {
  const dateString = isoFormat.split('T')[0];
  return dateString.split('-').reverse().join('/');
}
