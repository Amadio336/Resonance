import scrapy
import json

dict1 = []

class SwspiderSpider(scrapy.Spider):
    name = "SWspider"
    allowed_domains = ["scaife.perseus.org"]
    start_urls = ["https://vocab.perseus.org/word-list/urn:cts:greekLit:tlg0059.tlg002.perseus-grc2:17/json/?page=all&amp;o=1"]

    def parse(self, response):
        data = response.json()
        lemmas = data["lemmas"]

        # Save to file
        with open("lemmas_test.json", "a", encoding="utf-8") as f:
            for element in lemmas:
                dict1.append({"SubVoce": element["lemma_text"], "tras": element["shortdef"]})
            json.dump(
                dict1,
                f,
                ensure_ascii=False,
                indent=2,
                )
        yield {"saved": True}
