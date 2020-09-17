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
