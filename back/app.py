# coding: utf-8
import json
from flask import Flask, g, jsonify, request
from werkzeug.datastructures import Headers

from db_config import query_db, init_app
from default_settings import PAGINATION

app = Flask(__name__)
init_app(app)

@app.route('/')
def routes():
    pt = {
        '/fansubs': 'Lista todas as fansubs presentes na base',
        '/doramas': 'Lista todos os doramas disponíveis em fansubs'
    }
    en = {
        '/fansubs': 'List all fansubs in the database',
        '/doramas': 'List all dramas available in fansubs'
    }
    return jsonify({ 'pt': pt, 'en': en })

@app.route('/fansubs')
def fansubs():
    limit = int(request.args.get('limit', PAGINATION['limit']))
    offset = int(request.args.get('offset', PAGINATION['offset']))

    name = request.args.get('name', '')
    name_pattern = '%' + name.replace(' ', '%') + '%'

    count = query_db('SELECT COUNT(id) as total FROM fansub', one=True)
    headers = Headers()
    headers.add('X-Total-Count', count['total'])

    r = query_db('''
        SELECT spider, name, link, image, facebook FROM fansub
        WHERE UPPER(name) LIKE UPPER(?)
        LIMIT ? OFFSET ?
    ''', (name_pattern, limit, offset))

    return ( jsonify(r), headers )

@app.route('/doramas')
def doramas():
    limit = int(request.args.get('limit', PAGINATION['limit']))
    offset = int(request.args.get('offset', PAGINATION['offset']))

    title = request.args.get('title', '')
    spider = request.args.get('spider', '')

    title_pattern = '%' + title.replace(' ', '%') + '%'
    spider_pattern = '%' + spider.replace(' ', '%') + '%'

    count = query_db('SELECT COUNT(id) as total FROM dorama', one=True)
    headers = Headers()
    headers.add('X-Total-Count', count['total'])

    r = query_db('''
        SELECT dorama.title, dorama.link, fansub.spider FROM dorama
        INNER JOIN fansub ON dorama.fansubId=fansub.id
        WHERE
            UPPER(dorama.title) LIKE UPPER(?) AND
            fansub.spider LIKE LOWER(?)
        LIMIT ? OFFSET ?
    ''', (title_pattern, spider_pattern, limit, offset))

    return ( jsonify(r), headers )
