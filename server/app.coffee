#! /usr/bin/env node_modules/coffee-script/bin/coffee
# author: takano32 <tak@no32 dot tk>
# vim: noet sts=4:ts=4:sw=4
#

cluster = require 'cluster'
os = require 'os'
express = require 'express'
coffee = require 'coffee-script'
http = require 'http'
url = require 'url'
app = express.createServer()

app.use express.static __dirname + '/../public'

redis = require 'redis'
client = redis.createClient()

client.on "error", (err) ->
	console.log "Error: #{err}"

http_get = (request, callback) ->
	http.get request, (res) ->
		res.setEncoding 'binary'
		#console.log "Got response: " + res.statusCode
		body = ""
		res.on 'data', (data) ->
			body += data
		res.on 'end', () ->
			callback null, body
	.on 'error', (e) ->
		console.log "Got error: " + e.message


http_get_with_cache_in_base64 = (request, callback) ->
	client.get "oursp:image:base64:#{request.host}#{request.path}", (err, value) ->
		if value == null
			http_get request, (err, body) ->
				data = new Buffer(body, 'binary').toString('base64')
				callback(null, data)
		else
			callback(null, value)

app.get '/base64image', (req, res) ->
	res.header 'Access-Control-Allow-Origin', '*'
	res.header 'Content-Transfer-Encoding', 'base64'
	res.header 'Content-Type', 'text/plain'
	target = url.parse Object.keys(req.query)[0]
	ext = target.href.split('.').pop()
	#res.header 'Content-Type', "image/#{ext}"
	http_get_with_cache_in_base64 target, (err, body) ->
		res.send "data:image/#{ext};base64,#{body}"

if cluster.isMaster
	for i in [1...os.cpus().length]
		worker = cluster.fork()
else
	app.listen process.env.PORT || 3001

app.listen(process.env.PORT || 3001)

