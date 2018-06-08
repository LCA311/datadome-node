class Article {
    constructor(id, categoryIds, geo, title, abstractText, articleText, dates, address, postalCode) {
        this.id = id
        this.geo = geo
        this.title = title
        this.categoryIds = categoryIds
        this.abstractText = abstractText
        this.articleText = articleText
        this.dates = dates
        this.address = address
        this.postalCode = postalCode
    }
}

module.exports = Article