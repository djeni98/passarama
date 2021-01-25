# Passarama - Find doramas and brazilian fansubs.
# Copyright (C) 2021 Djenifer R Pereira <djeniferrenata@yahoo.com.br>
#
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with this program.  If not, see <https://www.gnu.org/licenses/>.

from flask import jsonify, request

from passarama_api.db import query_db
from passarama_api.headers import Headers


def get_fansubs():
    name = request.args.get('name', '')
    name_pattern = '%' + name.replace(' ', '%') + '%'

    count = query_db('''
        SELECT COUNT(id) as total FROM fansub
        WHERE UPPER(name) LIKE UPPER(?)
    ''', (name_pattern, ), one=True)
    total = count['total']

    limit = int(request.args.get('limit', total))
    offset = int(request.args.get('offset', 0))

    r = query_db('''
        SELECT spider, name, link, image, facebook FROM fansub
        WHERE UPPER(name) LIKE UPPER(?)
        ORDER BY name
        LIMIT ? OFFSET ?
    ''', (name_pattern, limit, offset))

    return (jsonify({'total': total, 'results': r}), Headers())
