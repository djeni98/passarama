# coding: utf-8
import json
from flask import Flask, g, jsonify
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
    r = query_db('SELECT spider, link FROM fansub')
    return jsonify(r)

@app.route('/doramas')
def doramas():
    r = query_db('''
        SELECT dorama.title, dorama.link, fansub.spider FROM dorama
        INNER JOIN fansub ON dorama.fansubId=fansub.id
    ''')
    return jsonify(r)
