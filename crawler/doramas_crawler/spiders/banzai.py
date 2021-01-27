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
import scrapy
import re

from doramas_crawler.spiders.logindata import banzai

class BanzaiSpider(scrapy.Spider):
    name = 'banzai'
    allowed_domains = ['banzaidramas.forumeiros.com']
    fansub = {
        'name': 'Banzai Dramas Fansub',
        'facebook': 'https://www.facebook.com/BanzaiDramas',
        'image': 'https://bit.ly/3ppsPGP'
    }

    def start_requests(self):
        form = {
            'username': banzai.username,
            'password': banzai.password,
            'autologin': 'on',
            'login': 'Conectar-se'
        }
        return [scrapy.FormRequest(
            'https://banzaidramas.forumeiros.com/login',
            formdata=form, callback=self.after_login)]

    def after_login(self, response):
        urls = [
            'https://banzaidramas.forumeiros.com/f24-k-dramas',
            'https://banzaidramas.forumeiros.com/f4-j-dramas',
            'https://banzaidramas.forumeiros.com/f5-c-tw-hk-dramas',
            'https://banzaidramas.forumeiros.com/f29-lakorns',

            'https://banzaidramas.forumeiros.com/f9-k-movies',
            'https://banzaidramas.forumeiros.com/f8-j-movies',
            'https://banzaidramas.forumeiros.com/f7-tw-movies-c-movies',
            'https://banzaidramas.forumeiros.com/f10-tai-movies',
            'https://banzaidramas.forumeiros.com/f33-hk-movies'
        ]
        yield from response.follow_all(urls, callback=self.parse)

    def parse(self, response):
        items = response.xpath('//h2/a | //h2/a/span/parent::* | //h2/span/a')

        i = items[0]
        if len(items) == 2 and i.xpath('text() | span/text()').get().strip() == 'DOWNLOADS':
            yield response.follow(response.urljoin(i.xpath('@href').get()), callback=self.parse)
            return None

        for i in items:
            title = i.xpath('text() | span/text()').get()
            yield {
                'title': re.sub(r'\[.*\]', '', title).strip(), # removes "[WORD]" from title
                'link': response.urljoin(i.xpath('@href').get()),
            }

        next_page = response.xpath('//img[@class="sprite-arrow_subsilver_right"]/parent::*/@href').get()
        if next_page:
            yield response.follow(next_page, callback=self.parse)
