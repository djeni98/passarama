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
