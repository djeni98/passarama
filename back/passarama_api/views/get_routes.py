from flask import jsonify, request
from passarama_api.headers import Headers


def get_routes():
    base_url = request.url_root

    info = {
        'url': f'{base_url}info',
        'methods': ['GET'],
        'description': "Get api version and database last update",
        'response': {
            'api_version': "string",
            'db_last_update': "string",
        }
    }

    route_schema = {
        'url': "string",
        'methods': "string[]",
        'description': "string",
        'response': "object"
    }
    routes = {
        'url': f'{base_url}routes',
        'methods': ['GET'],
        'description': "List available routes in this api",
        'response': {
            'info': route_schema,
            'routes': route_schema,
            'doramas': dict(**route_schema, query_params="string[]"),
            'fansubs': dict(**route_schema, query_params="string[]")
        }
    }

    doramas = {
        'url': f'{base_url}doramas',
        'methods': ['GET'],
        'description': "List dramas available in fansubs crawled by passarama",
        'query_params': ['limit', 'offset', 'title', 'fansub'],
        'response': {
            'total': "integer",
            'results': [{
                'title': 'string',
                'link': 'string',
                'fansub': 'string'
            }]
        }
    }

    fansubs = {
        'url': f'{base_url}fansubs',
        'methods': ['GET'],
        'description': "List fansubs crawled by passarama",
        'query_params': ['limit', 'offset', 'name'],
        'response': {
            'total': "integer",
            'results': [{
                'spider': 'string',
                'name': 'string',
                'link': 'string',
                'image': 'string',
                'facebook': 'string'
            }]
        }
    }

    return jsonify({
        'info': info,
        'routes': routes,
        'doramas': doramas,
        'fansubs': fansubs
    }), Headers()
