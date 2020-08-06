import pytest

from passarama_api.db import get_db

def test_get_all_fansubs(client, app):
    response = client.get('/fansubs')
    json_data = response.get_json()

    total = json_data.get('total')
    results = json_data.get('results')

    with app.app_context():
        db = get_db()
        cur = db.execute('SELECT COUNT(id) as total FROM fansub')
        expected_total = cur.fetchone()['total']

        cur = db.execute('''
            SELECT spider, name, link, image, facebook FROM fansub
        ''')
        expected_results = cur.fetchall()

        db.close()

        assert total == expected_total
        assert results == expected_results

def test_get_limit_fansubs(client, app):
    response = client.get('/fansubs?limit=5')
    json_data = response.get_json()

    total = json_data.get('total')
    results = json_data.get('results')

    with app.app_context():
        db = get_db()
        cur = db.execute('SELECT COUNT(id) as total FROM fansub')
        expected_total = cur.fetchone()['total']

        cur = db.execute('''
            SELECT spider, name, link, image, facebook FROM fansub LIMIT 5
        ''')
        expected_results = cur.fetchall()

        db.close()

        assert total == expected_total
        assert results == expected_results

    response = client.get('/fansubs?limit=5&offset=5')
    json_data = response.get_json()

    total = json_data.get('total')
    results = json_data.get('results')

    with app.app_context():
        db = get_db()
        cur = db.execute('SELECT COUNT(id) as total FROM fansub')
        expected_total = cur.fetchone()['total']

        cur = db.execute('''
            SELECT spider, name, link, image, facebook FROM fansub
            LIMIT 5 OFFSET 5
        ''')
        expected_results = cur.fetchall()

        db.close()

        assert total == expected_total
        assert results == expected_results

