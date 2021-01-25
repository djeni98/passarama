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
