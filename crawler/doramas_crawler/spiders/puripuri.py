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
from doramas_crawler.spiders.logindata import puripuri

class PuriPuriSpider(scrapy.Spider):
    name = 'puripuri'
    allowed_domains = ['puripurifansub.forumeiros.com']
    fansub = {
        'name': 'Puri Puri Fansub',
        'facebook': 'https://www.facebook.com/puripurifansub',
        # 'image': ''
    }

    def start_requests(self):
        form = {
            'username': puripuri.username,
            'password': puripuri.password,
            'autologin': 'on',
            'login': 'Conectar-se'
        }
        return [scrapy.FormRequest(
            'https://puripurifansub.forumeiros.com/login',
            formdata=form, callback=self.after_login)]

    def after_login(self, response):
        urls = [
            'https://puripurifansub.forumeiros.com/f5-k-dramas',
            'https://puripurifansub.forumeiros.com/f6-j-drama',
            'https://puripurifansub.forumeiros.com/f7-t-dramas',
            'https://puripurifansub.forumeiros.com/f8-c-dramas',

            'https://puripurifansub.forumeiros.com/f2-filmes',
        ]

        yield from response.follow_all(urls, callback=self.parse)

        url = 'https://puripurifansub.forumeiros.com/f1-dramas-em-andamento'
        yield response.follow(url, callback=self.parse)

    def parse(self, response):
        items = response.xpath('//h2/a | //h2/a/span/parent::* | //h2/span/a')

        announcement = response.xpath('//strong[contains(text(), "Anúncio")]').getall()
        for i in announcement:
            items.pop(0)

        for i in items:
            title = i.xpath('text() | span/text()').get().split('/')[0]
            yield {
                'title': title.strip(),
                'link': response.urljoin(i.xpath('@href').get()),
            }

        next_page = response.xpath('//img[@class="sprite-arrow_prosilver_right"]/parent::*/@href').get()
        if next_page:
            yield response.follow(next_page, callback=self.parse)
