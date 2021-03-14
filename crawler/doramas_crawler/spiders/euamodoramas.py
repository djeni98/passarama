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

from doramas_crawler.spiders.logindata import euamodoramas

class EuAmoDoramasSpider(scrapy.Spider):
    name = 'euamodoramas'
    allowed_domains = ['euamodoramas.forumeiros.com']
    fansub = {
        'name': 'Eu Amo Doramas Fansubs',
        'facebook': 'https://www.facebook.com/euamodoramasfansub',
        'image': 'https://bit.ly/2W4K2Yx'
    }

    def start_requests(self):
        form = {
            'username': euamodoramas.username,
            'password': euamodoramas.password,
            'autologin': 'on',
            'login': 'Conectar-se'
        }
        return [scrapy.FormRequest(
            'https://euamodoramas.forumeiros.com/login',
            formdata=form, callback=self.after_login)]

    def after_login(self, response):
        urls = [
            'https://euamodoramas.forumeiros.com/f5-c-dramas',
            'https://euamodoramas.forumeiros.com/f4-k-dramas',
            'https://euamodoramas.forumeiros.com/f6-j-dramas',
            'https://euamodoramas.forumeiros.com/f8-thai-dramas',
            'https://euamodoramas.forumeiros.com/f7-tw-dramas',

            'https://euamodoramas.forumeiros.com/f14-doramas-em-andamento',

            'https://euamodoramas.forumeiros.com/f1-c-movies',
            'https://euamodoramas.forumeiros.com/f3-k-movies',
            'https://euamodoramas.forumeiros.com/f10-j-movies',
            'https://euamodoramas.forumeiros.com/f11-thai-movies',
            'https://euamodoramas.forumeiros.com/f12-tw-movies',

            'https://euamodoramas.forumeiros.com/f21-china',
            'https://euamodoramas.forumeiros.com/f16-coreia-do-sul',
            'https://euamodoramas.forumeiros.com/f20-japao',
            'https://euamodoramas.forumeiros.com/f23-tailandia',
            'https://euamodoramas.forumeiros.com/f22-taiwan',

            'https://euamodoramas.forumeiros.com/f24-variedades-em-andamento'
        ]

        yield from response.follow_all(urls, callback=self.parse)

    def parse(self, response):
        items = response.xpath('//h2/a | //h2/a/span/parent::* | //h2/span/a')

        announcement = response.xpath('//div[contains(text(), "Atenção")]').getall()
        for i in announcement:
            items.pop(0)
        
        for i in items:
            title = i.xpath('text() | span/text()').get()
            yield {
                'title': re.sub(r'• |\[\w+\]', '', title).strip(), # removes "• " and "[WORD]" from title
                'link': response.urljoin(i.xpath('@href').get()),
            }

        next_page = response.xpath('//img[@class="sprite-arrow_subsilver_right"]/parent::*/@href').get()
        if next_page:
            yield response.follow(next_page, callback=self.parse)
