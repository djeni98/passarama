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

class YumekoSpider(scrapy.Spider):
    name = 'yumeko'
    allowed_domains = ['yumekofansub.blogspot.com']
    fansub = {
        'name': 'Yumeko Fansub',
        'facebook': 'https://www.facebook.com/blogyumekofansub/',
        'image': 'https://bit.ly/3dMkiHs'
    }

    start_urls = ['http://yumekofansub.blogspot.com/p/nossos-projetos.html']

    def parse(self, response):
        for item in response.xpath('//div[contains(@class, "post-body")]/descendant::a'):
            link = item.xpath('@href').get()
            title = item.xpath('text()').get()

            if not link.startswith('https://') or title == 'A':
                continue

            yield {
                'title': title,
                'link': link
            }
