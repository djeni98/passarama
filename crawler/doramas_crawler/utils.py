import sqlite3

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
            link TEXT
        )'''
    )

    for spider in spiders:
        link = None
        if hasattr(spider, 'allowed_domains'):
            link = 'https://' + spider.allowed_domains[0]

        values = (spider.name, link)
        c.execute('''
            INSERT INTO fansub (spider, link)
            VALUES (?, ?)''', values)

    conn.commit()
    conn.close()

def create_database_tables(spiders, database):
    dorama_table(database)
    fansub_table(spiders, database)
