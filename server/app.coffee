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

app.use express.static(__dirname + '/public')

eco = require 'eco'
redis = require 'redis'
client = redis.createClient()

client.on "error", (err) ->
	console.log "Error: #{err}"

http_get = (request, callback) ->
	http.get request, (res) ->
		#console.log "Got response: " + res.statusCode
		body = ""
		res.on 'data', (data) ->
			body += data
		res.on 'end', () ->
			callback null, body
	.on 'error', (e) ->
		console.log "Got error: " + e.message

http_get_with_cache = (request, callback) ->
	client.get "oursp:image:base64:#{request.host}#{request.path}", (err, value) ->
		if value == null
			http_get request, (err, body) ->
				value = body
				client.set "oursp:image:base64:#{request.host}#{request.path}", value
				callback(null, value)
		else
			callback(null, value)

target_url = url.parse 'http://no32.tk/'
http_get_with_cache target_url, (err, body) ->
	console.log body

app.get '/', (req, res) ->
		data =
			title: 'Our Sphere'
		res.render 'index.html.eco', data: data


if cluster.isMaster
	for i in [1...os.cpus().length]
		worker = cluster.fork()
else
	app.listen process.env.PORT || 3000

app.listen(process.env.PORT || 3000)

io = require('socket.io').listen app

