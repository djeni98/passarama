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
        if announcement:
            items.pop(0)

        for i in items:
            yield {
                'title': i.xpath('text() | span/text()').get().strip(),
                'link': response.urljoin(i.xpath('@href').get()),
            }

        next_page = response.xpath('//img[@class="sprite-arrow_subsilver_right"]/parent::*/@href').get()
        if next_page:
            yield response.follow(next_page, callback=self.parse)
