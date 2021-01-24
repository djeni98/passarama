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


def get_doramas():
    title = request.args.get('title', '')
    fansub = request.args.get('fansub', '')

    title_pattern = '%' + title.replace(' ', '%') + '%'
    fansub_pattern = '%' + fansub.replace(' ', '%') + '%'

    count = query_db('''
        SELECT COUNT(dorama.id) as total FROM dorama
        INNER JOIN fansub ON dorama.fansubId=fansub.id
        WHERE
            UPPER(dorama.title) LIKE UPPER(?) AND
            UPPER(fansub.name) LIKE UPPER(?)
    ''', (title_pattern, fansub_pattern), one=True)
    total = count.get('total')

    limit = int(request.args.get('limit', total))
    offset = int(request.args.get('offset', 0))

    r = query_db('''
        SELECT dorama.title, dorama.link, fansub.name as fansub FROM dorama
        INNER JOIN fansub ON dorama.fansubId=fansub.id
        WHERE
            UPPER(dorama.title) LIKE UPPER(?) AND
            UPPER(fansub.name) LIKE UPPER(?)
        ORDER BY title
        LIMIT ? OFFSET ?
    ''', (title_pattern, fansub_pattern, limit, offset))

    return (jsonify({'total': total, 'results': r}), Headers())
