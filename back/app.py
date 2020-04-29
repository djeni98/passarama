# coding: utf-8
import json
from flask import Flask, g, jsonify, request
from db_config import query_db, init_app

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
    name = request.args.get('name', '')
    name_pattern = '%' + name.replace(' ', '%') + '%'

    r = query_db('''
        SELECT spider, name, link, image, facebook FROM fansub
        WHERE UPPER(name) LIKE UPPER(?)
    ''', (name_pattern,))
    return jsonify(r)

@app.route('/doramas')
def doramas():
    title = request.args.get('title', '')
    spider = request.args.get('spider', '')

    title_pattern = '%' + title.replace(' ', '%') + '%'
    spider_pattern = '%' + spider.replace(' ', '%') + '%'

    r = query_db('''
        SELECT dorama.title, dorama.link, fansub.spider FROM dorama
        INNER JOIN fansub ON dorama.fansubId=fansub.id
        WHERE
            UPPER(dorama.title) LIKE UPPER(?) AND
            fansub.spider LIKE LOWER(?)
    ''', (title_pattern, spider_pattern))
    return jsonify(r)
