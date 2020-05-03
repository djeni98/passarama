# coding: utf-8
import json
from flask import Flask, g, jsonify, request
from werkzeug.datastructures import Headers as createHeaders

from db_config import query_db, init_app
from default_settings import PAGINATION

app = Flask(__name__)
init_app(app)

def Headers(total = None):
    h = createHeaders()
    h.add('Access-Control-Allow-Origin', '*')

    if total:
        h.add('Access-Control-Expose-Headers', 'X-Total-Count')
        h.add('X-Total-Count', total)

    return h

@app.route('/')
def routes():
    fansubs = {
        'pt': 'Lista todas as fansubs presentes na base',
        'en': 'List all fansubs in the database',
        'query_params': ['limit', 'offset', 'name'],
        'response': '[{ "spider", "name", "link", "image", "facebook" }]'
    }
    doramas = {
        'pt': 'Lista todos os doramas disponíveis em fansubs',
        'en': 'List all dramas available in fansubs',
        'query_params': ['limit', 'offset', 'title', 'fansub'],
        'response': '[{ "fansub", "title", "link" }]'
    }

    return (
        jsonify({ '/fansubs': fansubs, '/doramas': doramas }),
        Headers()
    )

@app.route('/fansubs')
def fansubs():
    limit = int(request.args.get('limit', PAGINATION['limit']))
    offset = int(request.args.get('offset', PAGINATION['offset']))

    name = request.args.get('name', '')
    name_pattern = '%' + name.replace(' ', '%') + '%'

    r = query_db('''
        SELECT spider, name, link, image, facebook FROM fansub
        WHERE UPPER(name) LIKE UPPER(?)
        LIMIT ? OFFSET ?
    ''', (name_pattern, limit, offset))

    count = query_db('''
        SELECT COUNT(id) as total FROM fansub
        WHERE UPPER(name) LIKE UPPER(?)
    ''', (name_pattern, ), one=True)

    return ( jsonify(r), Headers(count['total']) )

@app.route('/doramas')
def doramas():
    limit = int(request.args.get('limit', PAGINATION['limit']))
    offset = int(request.args.get('offset', PAGINATION['offset']))

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

    r = query_db('''
        SELECT dorama.title, dorama.link, fansub.name as fansub FROM dorama
        INNER JOIN fansub ON dorama.fansubId=fansub.id
        WHERE
            UPPER(dorama.title) LIKE UPPER(?) AND
            UPPER(fansub.name) LIKE UPPER(?)
        LIMIT ? OFFSET ?
    ''', (title_pattern, fansub_pattern, limit, offset))

    return ( jsonify(r), Headers(count['total']) )
