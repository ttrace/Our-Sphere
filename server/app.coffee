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
base64 = require 'base64-js'
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


http_get_with_cache_in_base64 = (request, callback) ->
	client.get "oursp:image:base64:#{request.host}#{request.path}", (err, value) ->
		if value == null
			http_get request, (err, body) ->
				buffer = new ArrayBuffer body.length * 8
				array = new Uint8Array buffer
				from = []
				for i in [0..body.length]
					from.push i
				data = base64.fromByteArray from
				callback(null, data)
		else
			callback(null, value)

app.get '/', (req, res) ->
		data =
			title: 'Our Sphere'
		res.render 'index.html.eco', data: data

app.get '/base64image', (req, res) ->
	target = url.parse Object.keys(req.query)[0]
	ext = target.href.split('.').pop()
	http_get_with_cache_in_base64 target, (err, body) ->
		res.send "data:image/#{ext};base64,#{body}"

app.get '/externalimage', (req, res) ->
	console.log req

if cluster.isMaster
	for i in [1...os.cpus().length]
		worker = cluster.fork()
else
	app.listen process.env.PORT || 3000

app.listen(process.env.PORT || 3000)

