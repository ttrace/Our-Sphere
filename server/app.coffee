#! /usr/bin/env node_modules/coffee-script/bin/coffee
# author: takano32 <tak@no32 dot tk>
# vim: noet sts=4:ts=4:sw=4
#

cluster = require 'cluster'
os = require 'os'
express = require 'express'
coffee = require 'coffee-script'

app = express.createServer()

app.use express.static(__dirname + '/public')

eco = require 'eco'
redis = require 'redis'
client = redis.createClient()

client.on "error", (err) ->
	console.log "Error: #{err}"

http_get = (request) ->
	http.get options, (response) ->
		console.log "Got response: " + res.statusCode
	.on 'error', (e) ->
		console.log 
	.on 'error', (e) ->
		console.log "Got error: " + e.message

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

