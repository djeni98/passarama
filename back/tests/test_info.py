import pytest
from os.path import dirname, join

from passarama_api.db import get_db

def test_get_info(client, app):
    response = client.get('/info')
    json_data = response.get_json()

    api_version = json_data.get('api_version')
    db_last_update = json_data.get('db_last_update')

    with app.app_context():
        db = get_db()
        cur = db.execute('SELECT last_update FROM status')
        exp_last_update = cur.fetchone().get('last_update')
        db.close()

        path_version = join(dirname(__file__), '../passarama_api/VERSION')
        with open(path_version, 'r') as f:
            exp_version = f.read().strip()

        assert api_version == exp_version
        assert db_last_update == exp_last_update
