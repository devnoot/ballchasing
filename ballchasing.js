(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('node-fetch'), require('fs'), require('form-data')) :
  typeof define === 'function' && define.amd ? define(['exports', 'node-fetch', 'fs', 'form-data'], factory) :
  (global = global || self, factory(global.ballchasing = {}, global.nodeFetch, global.fs, global.formData));
}(this, (function (exports, fetch, fs, FormData) {
  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    var n = Object.create(null);
    if (e) {
      Object.keys(e).forEach(function (k) {
        if (k !== 'default') {
          var d = Object.getOwnPropertyDescriptor(e, k);
          Object.defineProperty(n, k, d.get ? d : {
            enumerable: true,
            get: function () {
              return e[k];
            }
          });
        }
      });
    }
    n['default'] = e;
    return n;
  }

  var fetch__default = /*#__PURE__*/_interopDefaultLegacy(fetch);
  var fs__namespace = /*#__PURE__*/_interopNamespace(fs);
  var FormData__namespace = /*#__PURE__*/_interopNamespace(FormData);

  function _extends() {
    _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends.apply(this, arguments);
  }

  class BallChasingAPI {
    constructor(apiKey) {
      this._apiKey = apiKey;
      this._baseURL = new URL("https://ballchasing.com/api");
    }
    /**
     * Create the authorization headers needed to call the
     * ballchasing API.
     * @private
     */


    authHeaders() {
      return {
        "Authorization": this._apiKey
      };
    }
    /**
     * Make a request to the ballchasing API. This method will
     * check the response for errors.
     * @param url
     * @param fetchArgs Any extra fetch args
     * @param headers Any extra headers
     * @private
     */


    async request(url, fetchArgs, headers) {
      try {
        const args = _extends({
          headers: _extends({}, this.authHeaders(), headers)
        }, fetchArgs); // @ts-ignore


        const res = await fetch__default['default'](url, args);
        const json = await res.json();
        return {
          response: res,
          data: json
        };
      } catch (e) {
        throw new Error(e);
      }
    }
    /**
     * Checks if
     * 1) Your API key is correct
     * 2) If ballchasing API is reachable
     */


    async ping() {
      try {
        return await this.request(this._baseURL);
      } catch (e) {
        throw e;
      }
    }
    /**
     * Upload a replay
     *
     * @param filepath
     * @param groupId
     * @param visibility
     */


    async uploadReplay(filepath, groupId, visibility) {
      try {
        const endpoint = new URL("/api/v2/upload", this._baseURL);

        if (visibility) {
          endpoint.searchParams.set("visibility", visibility);
        }

        if (groupId) {
          endpoint.searchParams.set("group", groupId);
        }

        const stats = fs__namespace.statSync(filepath);
        const stream = fs__namespace.createReadStream(filepath);
        const formData = new FormData__namespace();
        formData.append("file", stream, {
          knownLength: stats.size
        });
        const args = {
          method: "POST",
          body: formData
        }; // @ts-ignore

        return await this.request(endpoint, args);
      } catch (e) {
        throw e;
      }
    }

    async getMaps() {
      try {
        const endpoint = new URL("/api/maps", this._baseURL);
        return await this.request(endpoint);
      } catch (e) {
        throw e;
      }
    }

    async listReplays(args) {
      try {
        const endpoint = new URL("/api/replays", this._baseURL);

        if (args.title) {
          endpoint.searchParams.set("title", args.title);
        }

        if (args.playerName) {
          endpoint.searchParams.set("player-name", args.playerName);
        }

        if (args.playerId) {
          endpoint.searchParams.set("player-id", args.playerId);
        }

        if (args.playlist) {
          endpoint.searchParams.set("playlist", args.playlist);
        }

        if (args.season) {
          endpoint.searchParams.set("season", args.season);
        }

        if (args.matchResult) {
          endpoint.searchParams.set("match-result", args.matchResult);
        }

        if (args.minRank) {
          endpoint.searchParams.set("min-rank", args.minRank);
        }

        if (args.maxRank) {
          endpoint.searchParams.set("max-rank", args.maxRank);
        }

        if (args.pro) {
          endpoint.searchParams.set("pro", "true");
        }

        if (args.uploader) {
          endpoint.searchParams.set("uploader", args.uploader);
        }

        if (args.group) {
          endpoint.searchParams.set("group", args.group);
        }

        if (args.map) {
          endpoint.searchParams.set("map", args.map);
        }

        if (args.createdBefore) {
          endpoint.searchParams.set("created-before", args.createdBefore);
        }

        if (args.createdAfter) {
          endpoint.searchParams.set("created-after", args.createdAfter);
        }

        if (args.replayDateBefore) {
          endpoint.searchParams.set("replay-date-before", args.replayDateBefore);
        }

        if (args.replayDateAfter) {
          endpoint.searchParams.set("replay-date-after", args.replayDateAfter);
        }

        if (args.count) {
          endpoint.searchParams.set("count", args.count.toString());
        }

        if (args.sortDir) {
          endpoint.searchParams.set("sort-dir", args.sortDir);
        }

        if (args.sortBy) {
          endpoint.searchParams.set("sort-by", args.sortBy);
        }

        return await this.request(endpoint);
      } catch (e) {
        throw e;
      }
    }

    async getReplay(args) {
      try {
        const endpoint = new URL(`/api/replays/${args.id}`, this._baseURL);
        return await this.request(endpoint);
      } catch (e) {
        throw new Error(e);
      }
    }

    async patchReplay({
      id,
      patch
    }) {
      try {
        const endpoint = new URL(`/api/replays/${id}`, this._baseURL);
        return await this.request(endpoint, {
          method: "PATCH",
          body: JSON.stringify(_extends({}, patch))
        }, {
          "Content-Type": "application/json"
        });
      } catch (e) {
        throw new Error(e);
      }
    }

    async deleteReplay(args) {
      try {
        const endpoint = new URL(`/api/replays/${args.id}`, this._baseURL);
        return await this.request(endpoint, {
          method: "DELETE"
        });
      } catch (e) {
        throw new Error(e);
      }
    }

    async downloadReplay(args) {
      try {
        const endpoint = new URL(`/api/replays/${args.id}/file`, this._baseURL);
        return await fetch__default['default'](endpoint, {
          headers: _extends({}, this.authHeaders())
        });
      } catch (e) {
        throw new Error(e);
      }
    }

    async createGroup(args) {
      try {
        const endpoint = new URL("/api/groups", this._baseURL);
        return await this.request(endpoint, {
          method: "POST",
          body: JSON.stringify(_extends({}, args))
        }, {
          "Content-Type": "application/json"
        });
      } catch (e) {
        throw new Error(e);
      }
    }

    async listGroups(args = {}) {
      try {
        const endpoint = new URL("/api/groups", this._baseURL);

        if (args.name) {
          endpoint.searchParams.set("name", args.name);
        }

        if (args.count) {
          endpoint.searchParams.set("count", args.count.toString());
        }

        if (args.creator) {
          endpoint.searchParams.set("creator", args.creator);
        }

        if (args.createdBefore) {
          endpoint.searchParams.set("created-before", args.createdBefore);
        }

        if (args.createdAfter) {
          endpoint.searchParams.set("created-after", args.createdAfter);
        }

        if (args.sortBy) {
          endpoint.searchParams.set("sort-by", args.sortBy);
        }

        if (args.sortDir) {
          endpoint.searchParams.set("sort-dir", args.sortDir);
        }

        if (args.group) {
          endpoint.searchParams.set("group", args.group);
        }

        return await this.request(endpoint);
      } catch (e) {
        throw new Error(e);
      }
    }

    async getGroup(args) {
      try {
        const endpoint = new URL(`/api/groups/${args.id}`, this._baseURL);
        return await this.request(endpoint);
      } catch (e) {
        throw new Error(e);
      }
    }

    async deleteGroup(args) {
      try {
        const endpoint = new URL(`/api/groups/${args.id}`, this._baseURL);
        return await this.request(endpoint, {
          method: "DELETE"
        });
      } catch (e) {
        throw new Error(e);
      }
    }

    async patchGroup({
      id,
      patch
    }) {
      try {
        const endpoint = new URL(`/api/groups/${id}`, this._baseURL);
        return await this.request(endpoint, {
          method: "PATCH",
          body: JSON.stringify(_extends({}, patch))
        }, {
          "Content-Type": "application/json"
        });
      } catch (e) {
        throw new Error(e);
      }
    }

  }

  exports.BallChasingAPI = BallChasingAPI;

})));
//# sourceMappingURL=ballchasing.js.map
