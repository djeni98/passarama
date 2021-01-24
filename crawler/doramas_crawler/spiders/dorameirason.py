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

class DorameirasOnSpider(scrapy.Spider):
    name = 'dorameirason'
    allowed_domains = ['dorameirason.forumeiros.com']
    fansub = {
        'name': 'Dorameiras On Fansub',
        'facebook': 'https://www.facebook.com/DorameirasOn',
        # 'image': ''
    }

    start_urls = [
        'https://dorameirason.forumeiros.com/f2-c-dramas',
        'https://dorameirason.forumeiros.com/f1-k-dramas',
        'https://dorameirason.forumeiros.com/f3-j-dramas',
        'https://dorameirason.forumeiros.com/f4-thai-dramas-lakorns',

        'https://dorameirason.forumeiros.com/f8-filmes-coreanos',
        'https://dorameirason.forumeiros.com/f6-filmes-thai',
        'https://dorameirason.forumeiros.com/f5-filmes-japoneses'
    ]


    def parse(self, response):
        items = response.xpath('//h2/a | //h2/a/span/parent::* | //h2/span/a')

        announcement = response.xpath('//strong[contains(text(), "Anúncio")]').getall()
        for i in announcement:
            items.pop(0)

        for i in items:
            yield {
                'title': i.xpath('text() | span/text()').get().strip(),
                'link': response.urljoin(i.xpath('@href').get()),
            }

        next_page = response.xpath('//img[@class="sprite-arrow_subsilver_right"]/parent::*/@href').get()
        if next_page:
            yield response.follow(next_page, callback=self.parse)
