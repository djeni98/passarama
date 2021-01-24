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
