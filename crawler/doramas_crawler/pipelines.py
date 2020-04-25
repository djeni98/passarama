# -*- coding: utf-8 -*-
import sqlite3

# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html


class DoramasCrawlerPipeline(object):
    database = 'test.sqlite'
    test = True

    def open_spider(self, spider):
        self.conn = sqlite3.connect(self.database)
        self.cursor = self.conn.cursor()
        if self.test:
            self.cursor.execute('DROP TABLE IF EXISTS dorama')
            self.cursor.execute('''
                CREATE TABLE dorama (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    title TEXT NOT NULL,
                    link TEXT NOT NULL,
                    fansub TEXT NOT NULL
                )'''
            )
            self.conn.commit()

    def close_spider(self, spider):
        self.conn.close()

    def process_item(self, item, spider):
        values = (item['title'], item['link'], spider.name)
        self.cursor.execute('''
            INSERT INTO dorama (title, link, fansub)
            VALUES (?, ?, ?)''', values)
        self.conn.commit()

        return item
