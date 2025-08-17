import scrapy


""" You analysed from page 1 to page 800 of Perseus Lemma List. You must check if in thwe different json file there are copies. In the single json files there
are copies.

to use the program, just modfy the numbers in range at the end of the code """

class LlSpiderSpider(scrapy.Spider):
    name = "LL_spider"
    allowed_domains = ["vocab.perseus.org"]
    start_urls = ["https://vocab.perseus.org/lemma/"]

    def parse(self, response):
        lemmas = response.css("tr")
        counts_not_sorted = response.xpath("//td[@class='count']/text()").getall()
        counts_sorted = []

        for index in range(int(len(counts_not_sorted)/4)): # that is: for 20 times, because the total words are 20, multiplied for 4 counts for every word
            counts_sorted.append([counts_not_sorted[0], counts_not_sorted[1], counts_not_sorted[2], counts_not_sorted[3]])
            counts_not_sorted = counts_not_sorted[4:]

        for index,lemma in enumerate(lemmas[1:]):
            yield {
                "lemma": lemma.css("th.lemma_text ::text").get(),
                "tras": lemma.css("td.shortdef ::text").get().replace("\n", "").strip(),
                "corpus_count": counts_sorted[index][0].replace("\n", "").strip(),
                "corpus_freq": counts_sorted[index][1].replace("\n", "").strip(),
                "core_count": counts_sorted[index][2].replace("\n", "").strip(),
                "core_freq": counts_sorted[index][3].replace("\n", "").strip(),
                "more_info": "https://vocab.perseus.org" + lemma.css("th.lemma_text a ::attr(href)").get()
            }

        """ next_page_reference = response.css("i.fa.fa-forward")
        next_page_a_element = next_page_reference.xpath("..")
        next_page_link = next_page_a_element.css("::attr(href)").get() """

        base_link = "https://vocab.perseus.org/lemma/"
        mover = "?page="

        for page_index in range(4872, 4873):
            next_page_url = f"{base_link}{mover}{page_index}"
            yield response.follow(next_page_url, callback = self.parse)




        
        
        
        
        

        # see from 49,20 min
