# -*- coding: utf-8 -*-
import sqlite3
from doramas_crawler.settings import DATABASE_NAME

# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html


class DoramasCrawlerPipeline(object):

    def __init__(self):
        self.database = DATABASE_NAME

    def open_spider(self, spider):
        self.conn = sqlite3.connect(self.database)
        self.conn.row_factory = sqlite3.Row
        self.cursor = self.conn.cursor()

        self.cursor.execute(
            'SELECT id FROM fansub WHERE spider=?',
            (spider.name,)
        )
        self.id_spider = self.cursor.fetchone()['id']

    def close_spider(self, spider):
        self.conn.close()

    def process_item(self, item, spider):
        values = (item['title'], item['link'], self.id_spider)
        self.cursor.execute('''
            INSERT INTO dorama (title, link, fansubId)
            VALUES (?, ?, ?)''', values)
        self.conn.commit()

        return item
