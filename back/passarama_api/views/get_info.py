from flask import jsonify
from datetime import date

from passarama_api.db import query_db
from passarama_api.headers import Headers


def get_info(api_version):
    db_status = query_db('SELECT last_update FROM status', one=True)

    r = {
        'api_version': api_version,
        'db_last_update': db_status.get('last_update')
    }
    return jsonify(r), Headers()
