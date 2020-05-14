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
