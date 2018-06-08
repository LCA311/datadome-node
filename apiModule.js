const http = require('http')
const Article = require('./Article')

module.exports = function (jsonList, callback) { sync(jsonList, callback) }

function sync(jsonList, callback) {
    var postData = JSON.stringify({  
			"from":0,
			"size":663,
			"query":{  
				"bool":{  
					"must":[  
						{  
							"term":{  
								"is_active":true
							}
						},
						{  
							"exists":{  
								"field":"address"
							}
						},
						{  
							"wildcard":{  
								"smart_abstract":"*"
							}
						}
					],
					"must_not":[  
						{  
							"exists":{  
								"field":"deleted_at"
							}
						},
						{  
							"term":{  
								"smart_html":"<p>&nbsp;</p>"
							}
						},
						{  
							"term":{  
								"smart_html":"<h*>&nbsp;</h*>"
							}
						}
					],
					"minimum_should_match":1,
					"should":[  
						{  
							"term":{  
								"categories.id":"59"
							}
						},
						{  
							"term":{  
								"categories.id":"60"
							}
						},
						{  
							"term":{  
								"categories.id":"61"
							}
						},
						{  
							"term":{  
								"categories.id":"70"
							}
						},
						{  
							"term":{  
								"categories.id":"73"
							}
						},
						{  
							"term":{  
								"categories.id":"84"
							}
						},
						{  
							"term":{  
								"categories.id":"103"
							}
						},
						{  
							"term":{  
								"categories.id":"101"
							}
						},
						{  
							"term":{  
								"categories.id":"100"
							}
						}
					]
				}
			}
		})
	
	let options = {
	  hostname: 'klenkes.de',
	  port: 80,
	  path: '/hackthedome/_search',
	  method: 'POST',
	  headers: {
		   'Content-Type': 'application/json',
		   'Content-Length': Buffer.byteLength(postData)
		 }
	}
	
	let json = ""

	let req = http.request(options, (res) => {
	  res.on('data', (d) => {
			json += d
	  })

	  res.on('end', (d) => {
			json += d
			parseJSONToList(jsonList, json)
			callback()
	  })
	})
	
	req.on('error', (e) => {
	  console.error(e)
	})
	
	req.write(postData)
	req.end()
}

function parseJSONToList(jsonList, jsonString) {
	jsonString = jsonString.split('undefined')[0]
	let obj = JSON.parse(jsonString)
	for (let a of obj.hits.hits) {
		let categories = []
		let dates = [] //Would be initialized with JSON data
		for (let b of a._source.categories) {
			categories.push(b.id)
		}
		let cur = new Article(a._id, categories, a._source.geo, a._source.smart_title, a._source.smart_abstract, a._source.smart_html, dates, a._source.address.street, a._source.address.postal)
		jsonList.push(cur)
	}
}

