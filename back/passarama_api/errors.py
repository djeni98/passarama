from flask import json
from werkzeug.exceptions import HTTPException
from werkzeug.wrappers import Response as CreateResponse


def Response(data):
    body = json.dumps(data)
    headers = [
        ('Content-Type', 'application/json'),
        ('Access-Control-Allow-Origin', '*')
    ]
    return CreateResponse(body, data.get('code'), headers)


def handle_HTTP_exception(e):
    data = {
        'code': e.code,
        'name': e.name,
        'description': e.description
    }
    return Response(data)


def handle_ValueError_exception(e):
    data = {
        'code': 400,
        'name': 'Bad Request',
        'description': 'Invalid Params'
    }
    return Response(data)


def add_handlers(app):
    app.register_error_handler(HTTPException, handle_HTTP_exception)
    app.register_error_handler(ValueError, handle_ValueError_exception)
