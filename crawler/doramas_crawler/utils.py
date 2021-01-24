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

import sqlite3
from datetime import date


def dorama_table(database):
    conn = sqlite3.connect(database)
    c = conn.cursor()

    c.execute('DROP TABLE IF EXISTS dorama')
    c.execute('''
        CREATE TABLE dorama (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            link TEXT NOT NULL,
            --fansub TEXT NOT NULL
            fansubId INTEGER NOT NULL,
            FOREIGN KEY (fansubId) REFERENCES fansub (id)
        )'''
    )
    conn.commit()
    conn.close()


def fansub_table(spiders, database):
    conn = sqlite3.connect(database)
    c = conn.cursor()

    c.execute('DROP TABLE IF EXISTS fansub')
    c.execute('''
        CREATE TABLE fansub (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            spider TEXT NOT NULL,
            link TEXT,
            name TEXT,
            image TEXT,
            facebook TEXT
        )'''
    )

    for spider in spiders:
        link = None
        if hasattr(spider, 'allowed_domains'):
            link = 'https://' + spider.allowed_domains[0]

        fansub = [None, None, None]
        if hasattr(spider, 'fansub'):
            fansub = [spider.fansub.get('name')]
            fansub.append(spider.fansub.get('image'))
            fansub.append(spider.fansub.get('facebook'))

        values = [spider.name, link]
        values.extend(fansub)
        c.execute('''
            INSERT INTO fansub (spider, link, name, image, facebook)
            VALUES (?, ?, ?, ?, ?)''', tuple(values))

    conn.commit()
    conn.close()


def status_table(database):
    conn = sqlite3.connect(database)
    c = conn.cursor()

    c.execute('DROP TABLE IF EXISTS status')
    c.execute('''
        CREATE TABLE status (
            last_update TEXT
        )'''
    )
    c.execute('''
        INSERT INTO status (last_update)
        VALUES (?)''', (date.today().isoformat(),))

    conn.commit()
    conn.close()


def create_database_tables(spiders, database):
    dorama_table(database)
    fansub_table(spiders, database)
    status_table(database)
