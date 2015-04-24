kraken-subdomains
==================

[![npm version](https://badge.fury.io/js/kraken-subdomains.svg)](http://badge.fury.io/js/kraken-subdomains)

Subdomain route support and configuration middleware for krakenJS `>= v0.1.0`.

===

##Config

Example

```
"subdomain": {
	"enabled": true,
	"module": {
		"name":"path:./lib/subdomain",
		"arguments": [ 
			["api", "mobile"], 
			"subdomains", 
			"path:./.build" 
		]
	}
}, 
```

`"module" : Config options [Required]`

`"name" : Path to module [Required]`

`"arguments" : Array of options [Required]`

`"arguments[0]" : An array of subdomains registered to the server`
	
`"arguments[1]" : A string specifying the subdomain controller folder`
		
`"arguments[2]" : A string specifying where the statics folder is located`

##Folder Structure

Example

```
Controllers
	login
	subdomains
		api
		mobile

```
`Login` is a top level directory and can be accessed by going to `http://localhost:8000/login`.

`subdomains` is the folder of the the same name you added to your config file and houses the subdomains for your server. 

The subdomain `api` is accessed by going to `http://api.localhost:8000/`, or if you have an endpoint registered for `/v1` under this subdomain then you can access it at `http://api.localhost:8000/v1/`.

If you attempt to access the `subdomains` folder you will be presented with a `404` error page. This is generated with `res.render("errors/404");` as KrakenJS has all the error pages defined by default.