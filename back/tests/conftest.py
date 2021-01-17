import os
import tempfile

import pytest

from datetime import date

from passarama_api import create_app
from passarama_api.db import get_db


@pytest.fixture
def app():
    db_fd, db_path = tempfile.mkstemp()
    app = create_app({'Testing': True, 'DATABASE': db_path})

    with app.app_context():
        db = get_db()
        db.execute('''
            CREATE TABLE fansub (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                spider TEXT NOT NULL,
                link TEXT,
                name TEXT,
                image TEXT,
                facebook TEXT
            )
        ''')
        db.execute('''
            CREATE TABLE dorama (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                link TEXT NOT NULL,
                --fansub TEXT NOT NULL
                fansubId INTEGER NOT NULL,
                FOREIGN KEY (fansubId) REFERENCES fansub (id)
            )
        ''')
        db.execute('''
            INSERT INTO fansub (spider, name)
            VALUES
                ('test', 'Test fansub'),
                ('newTest', 'New Test fansub');
        ''')
        db.commit()

        for i in range(10):
            idx1 = i*2 + 1;
            idx2 = i*2 + 2;
            values = (
                f'Dorama {idx1}', f'link d{idx1}',
                f'Dorama {idx2}', f'link d{idx2}'
            )
            db.execute('''
                INSERT INTO dorama (title, link, fansubId)
                VALUES
                    (?, ?, 1),
                    (?, ?, 2);
            ''', values)
        db.commit()

        db.execute('CREATE TABLE status (last_update TEXT)')
        db.execute(
            'INSERT INTO status (last_update) VALUES (?)',
            (date.today().isoformat(),)
        )
        db.commit()

    yield app

    os.close(db_fd)
    os.unlink(db_path)


@pytest.fixture
def client(app):
    return app.test_client()
