/* Passarama - Find doramas and brazilian fansubs.
 * Copyright (C) 2021 Djenifer R Pereira <djeniferrenata@yahoo.com.br>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

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
