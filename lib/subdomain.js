/**
 * Created by andapper on 4/23/15.
 */

var path = require('path'),
    fs = require('fs');

/**
 * A function that modifies the Request URL to point to a subdomain route
 * @param {Array} subdomains An array of subdomains registered to the server
 * @param {string} directory A string specifying the subdomain controller folder
 * @param {string} staticFolder A string specifying where the statics folder is located
 */

module.exports = function(subdomains, directory, staticFolder) {

    var subdomainList = subdomains,
        subPath = directory,
        statics = staticFolder;

    function getStaticsDirectoryListing() {
        return fs.readdirSync(statics).filter(function(folder) {
            return fs.statSync(path.join(statics, folder)).isDirectory();
        });
    }

    return function(req, res, next) {
        var urlParts = req["headers"]["host"].split(".");
        var _url = req.url;
        if (_url.indexOf(subPath) > -1) {
            res.render("errors/404");
            return;
        } else if (urlParts.length > 1) {
            var parts = _url.substring(1).split("/");
            if (getStaticsDirectoryListing().indexOf(parts[0]) > -1) {
                next();
                return;
            }
        }

        if (urlParts.length > 1) {
            var found = false;
            for (var part in urlParts) {
                if (found) {break;}
                for (var sub in subdomainList) {
                    if (urlParts[part] == subdomainList[sub]) {
                        if (urlParts.length > 1) {
                            req.url = "/"+subPath+"/" + subdomainList[sub] + _url;
                        }
                        found = true;
                        break;
                    }
                }
            }
        }

        next();
    }
};