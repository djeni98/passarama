import pytest

from passarama_api.db import get_db


def test_get_all_doramas(client, app):
    response = client.get('/doramas')
    json_data = response.get_json()

    total = json_data.get('total')
    results = json_data.get('results')

    with app.app_context():
        db = get_db()
        cur = db.execute('SELECT COUNT(id) as total FROM dorama')
        expected_total = cur.fetchone()['total']

        cur = db.execute('''
            SELECT title, dorama.link, fansub.name as fansub FROM dorama
            INNER JOIN fansub ON dorama.fansubId=fansub.id
        ''')
        expected_results = cur.fetchall()

        db.close()

        assert total == expected_total
        assert results == expected_results


def test_get_limit_doramas(client, app):
    response = client.get('/doramas?limit=5')
    json_data = response.get_json()

    total = json_data.get('total')
    results = json_data.get('results')

    with app.app_context():
        db = get_db()
        cur = db.execute('SELECT COUNT(id) as total FROM dorama')
        expected_total = cur.fetchone()['total']

        cur = db.execute('''
            SELECT title, dorama.link, fansub.name as fansub FROM dorama
            INNER JOIN fansub ON dorama.fansubId=fansub.id
            LIMIT 5
        ''')
        expected_results = cur.fetchall()

        db.close()

        assert total == expected_total
        assert results == expected_results

    response = client.get('/doramas?limit=5&offset=5')
    json_data = response.get_json()

    total = json_data.get('total')
    results = json_data.get('results')

    with app.app_context():
        db = get_db()
        cur = db.execute('SELECT COUNT(id) as total FROM dorama')
        expected_total = cur.fetchone()['total']

        cur = db.execute('''
            SELECT title, dorama.link, fansub.name as fansub FROM dorama
            INNER JOIN fansub ON dorama.fansubId=fansub.id
            LIMIT 5 OFFSET 5
        ''')
        expected_results = cur.fetchall()

        db.close()

        assert total == expected_total
        assert results == expected_results
