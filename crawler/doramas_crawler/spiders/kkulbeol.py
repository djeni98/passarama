# -*- coding: utf-8 -*-
import scrapy

class KkulbeolSpider(scrapy.Spider):
    name = 'kkulbeol'
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
