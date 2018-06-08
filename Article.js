class Article {
    constructor(id, categoryIds, geo, title, abstractText, articleText, dates, adress, postalCode) {
        this.id = id
        this.geo = geo
        this.title = title
        this.categoryIds = categoryIds
        this.abstractText = abstractText
        this.articleText = articleText
        this.dates = dates
        this.adress = adress
        this.postalCode = postalCode
    }
}

module.exports = Article