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
        LIMIT ? OFFSET ?
    ''', (name_pattern, limit, offset))

    return (jsonify({'total': total, 'results': r}), Headers())
