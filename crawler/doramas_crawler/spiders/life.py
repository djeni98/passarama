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
from doramas_crawler.spiders.logindata import life

class LifeSpider(scrapy.Spider):
    name = 'life'
    allowed_domains = ['lifefansub.forumeiros.com']
    fansub = {
        'name': 'Life Fansub',
        'facebook': 'https://www.facebook.com/lifefansub',
        # 'image': ''
    }

    def start_requests(self):
        form = {
            'username': life.username,
            'password': life.password,
            'autologin': 'on',
            'login': 'Conectar-se'
        }
        return [scrapy.FormRequest(
            'https://lifefansub.forumeiros.com/login',
            formdata=form, callback=self.after_login)]

    def after_login(self, response):
        urls = [
            'https://lifefansub.forumeiros.com/f5-coreia',
            'https://lifefansub.forumeiros.com/f11-japao',
            'https://lifefansub.forumeiros.com/f6-china-e-tailandia',

            'https://lifefansub.forumeiros.com/f4-variedades',

            'https://lifefansub.forumeiros.com/f7-coreia',
            'https://lifefansub.forumeiros.com/f8-japao',
            'https://lifefansub.forumeiros.com/f9-china-e-tailandia',
        ]

        yield from response.follow_all(urls, callback=self.parse)

    def parse(self, response):
        for i in response.xpath('//h2/a | //h2/a/span/parent::* | //h2/span/a'):
            yield {
                'title': i.xpath('text() | span/text()').get().strip(),
                'link': response.urljoin(i.xpath('@href').get()),
            }

        next_page = response.xpath('//img[@alt="Seguinte"]/parent::*/@href').get()
        if next_page:
            yield response.follow(next_page, callback=self.parse)
