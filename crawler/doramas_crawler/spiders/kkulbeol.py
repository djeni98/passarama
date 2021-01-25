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

class KkulbeolSpider(scrapy.Spider):
    name = 'kkulbeol'
    allowed_domains = ['kkulbeol.ucoz.net']
    fansub = {
        'name': 'Kkulbeol Dramas Fansub',
        'facebook': 'https://www.facebook.com/kkulbeoldramasfansub',
        'image': 'https://bit.ly/3aLplpC'
    }

    start_urls = [
        'http://kkulbeol.ucoz.net/index/dramas-ativos/0-16',
        'http://kkulbeol.ucoz.net/index/k-dramas-01/0-11',
        'http://kkulbeol.ucoz.net/index/j-dramas-01/0-12',
        'http://kkulbeol.ucoz.net/index/c-dramas-01/0-13',
        'http://kkulbeol.ucoz.net/index/tw-dramas-01/0-14',
        'http://kkulbeol.ucoz.net/index/filmes-01/0-18'
    ]

    def parse(self, response):
        for item in response.xpath('//div[@class="work-example"]/a'):
            yield {
                'title': item.xpath('text()').get().strip(),
                'link': response.urljoin(item.xpath('@href').get())
            }

        pagination_img_link = response.xpath('//div[@class="specialties inner"]/div[@align="center"]/a/img/@src').get()
        img_link_next = 'http://kkulbeol.ucoz.net/propagina.png'
        if pagination_img_link == img_link_next:
            next_page = response.xpath('//div[@class="specialties inner"]/div[@align="center"]/a/@href').get()
            yield response.follow(next_page, callback=self.parse)
