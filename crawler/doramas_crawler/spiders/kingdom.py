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
from doramas_crawler.spiders.logindata import kingdom

class KingdomSpider(scrapy.Spider):
    name = 'kingdom'
    allowed_domains = ['kingdomfansubs.forumeiros.com']
    fansub = {
        'name': 'Kingdom Fansubs',
        'facebook': 'https://www.facebook.com/kingdomfansubs',
        'image': 'https://bit.ly/2W4K2Yx'
    }

    def start_requests(self):
        form = {
            'username': kingdom.username,
            'password': kingdom.password,
            'autologin': 'on',
            'login': 'Conectar-se'
        }
        return [scrapy.FormRequest(
            'https://kingdomfansubs.forumeiros.com/login',
            formdata=form, callback=self.after_login)]

    def after_login(self, response):
        urls = [
            'https://kingdomfansubs.forumeiros.com/f18-k-drama',
            'https://kingdomfansubs.forumeiros.com/f19-j-drama',
            'https://kingdomfansubs.forumeiros.com/f20-tw-drama',
            'https://kingdomfansubs.forumeiros.com/f1-c-drama',

            'https://kingdomfansubs.forumeiros.com/f4-filmes',
            'https://kingdomfansubs.forumeiros.com/f15-variety'
        ]

        yield from response.follow_all(urls, callback=self.parse)

        url = 'https://kingdomfansubs.forumeiros.com/f23-dramas-ativos'
        yield response.follow(url, callback=self.parse, cb_kwargs={'active': True})

    def parse(self, response, active=False):
        items = response.xpath('//h2/a | //h2/a/span/parent::* | //h2/span/a')
        if active:
            items.pop(0)
        
        for i in items:
            yield {
                'title': i.xpath('text() | span/text()').get().strip(),
                'link': response.urljoin(i.xpath('@href').get()),
            }

        next_page = response.xpath('//img[@class="sprite-arrow_subsilver_right"]/parent::*/@href').get()
        if next_page:
            yield response.follow(next_page, callback=self.parse)
