import fetch from "node-fetch";
import * as fs from "fs";
import * as FormData from "form-data";

export type Visibility = "public" | "unlisted" | "private"

export type Playlist =
    "unranked-duels" |
    "unranked-doubles" |
    "unranked-standard" |
    "unranked-chaos" |
    "private" |
    "season" |
    "offline" |
    "ranked-duels" |
    "ranked-doubles" |
    "ranked-solo-standard" |
    "ranked-standard" |
    "snowday" |
    "rocketlabs" |
    "hoops" |
    "rumble" |
    "tournament" |
    "dropshot" |
    "ranked-hoops" |
    "ranked-rumble" |
    "ranked-dropshot" |
    "ranked-snowday" |
    "dropshot-rumble" |
    "heatseeker"

export type MatchResult =  "win" | "loss"

export type Rank =
    "unranked" |
    "bronze-1" |
    "bronze-2" |
    "bronze-3" |
    "silver-1" |
    "silver-2" |
    "silver-3" |
    "gold-1" |
    "gold-2" |
    "gold-3" |
    "platinum-1" |
    "platinum-2" |
    "platinum-3" |
    "diamond-1" |
    "diamond-2" |
    "diamond-3" |
    "champion-1" |
    "champion-2" |
    "champion-3" |
    "grand-champion"

export type SortBy = "replay-date" | "upload-date"

export type SortDir = "asc" | "desc"

export interface ListReplaysArgs {
    title?: string
    playerName?: string
    playerId?: string
    playlist?: Playlist
    season?: string
    matchResult?: MatchResult
    minRank?: Rank
    maxRank?: Rank
    pro?: boolean
    uploader?: string
    group?: string
    // This is actually an enum from GET /maps
    map?: string
    // RFC3339 Format
    createdBefore?: string
    createdAfter?: string
    replayDateAfter?: string
    replayDateBefore?: string
    count?: number
    sortBy?: SortBy
    sortDir?: SortDir
}

export interface DeleteReplayArgs {
    id: string
}

export interface PatchReplayArgs {
    id: string
    // the patch data, for example, {"title":"patched title"}
    patch: {
        [key: string]: string
    }
}

export interface DownloadReplayArgs {
    id: string
}

export interface GetReplayArgs {
    id: string
}

export interface CreateGroupArgs {
    name: string
    parent?: string
    playerIdentification: "by-id" | "by-name"
    teamIdentification: "by-distinct-players" | "by-player-clusters"
}

export interface ListGroupsArgs {
    name?: string
    creator?: string
    group?: string
    createdBefore?: string
    createdAfter?: string
    count?: number
    sortBy?: SortBy
    sortDir?: SortDir
}

export interface DeleteGroupArgs {
    id: string
}

export interface PatchGroupArgs {
    id: string
    // the patch data, for example, {"title":"patched title"}
    patch: {
        [key: string]: string
    }
}

export interface GetGroupArgs {
    id: string
}

export class BallChasingAPI {

    private readonly _apiKey;
    private readonly _baseURL;

    constructor(apiKey: string) {
        this._apiKey = apiKey;
        this._baseURL = new URL("https://ballchasing.com/api")
    }

    /**
     * Create the authorization headers needed to call the
     * ballchasing API.
     * @private
     */
    private authHeaders() {
        return {"Authorization": this._apiKey};
    }

    /**
     * Make a request to the ballchasing API. This method will
     * check the response for errors.
     * @param url
     * @param fetchArgs Any extra fetch args
     * @param headers Any extra headers
     * @private
     */
    private async request(url: URL, fetchArgs?: RequestInit, headers?: HeadersInit) {
        try {
            const args: RequestInit = {
                headers: {
                    ...this.authHeaders(),
                    ...headers
                },
                ...fetchArgs
            }

            // @ts-ignore
            const res = await fetch(url, args);
            const json = await res.json();

            return {response: res, data: json};

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
    async uploadReplay(filepath: string, groupId?: string, visibility?: Visibility) {
        try {
            const endpoint = new URL("/api/v2/upload", this._baseURL);

            if (visibility) {
                endpoint.searchParams.set("visibility", visibility);
            }

            if (groupId) {
                endpoint.searchParams.set("group", groupId);
            }

            const stats = fs.statSync(filepath);
            const stream = fs.createReadStream(filepath);

            const formData = new FormData();
            formData.append("file", stream, {knownLength: stats.size});

            const args = {method: "POST", body: formData};

            // @ts-ignore
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

    async listReplays(args: ListReplaysArgs) {
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

    async getReplay(args: GetReplayArgs) {
        try {
            const endpoint = new URL(`/api/replays/${args.id}`, this._baseURL);
            return await this.request(endpoint);
        } catch (e) {
            throw new Error(e);
        }
    }

    async patchReplay({id, patch}: PatchReplayArgs) {
        try {
            const endpoint = new URL(`/api/replays/${id}`, this._baseURL);
            return await this.request(
                endpoint,
                {method: "PATCH", body: JSON.stringify({...patch})},
                {"Content-Type": "application/json"}
            );
        } catch (e) {
            throw new Error(e);
        }
    }

    async deleteReplay(args: DeleteReplayArgs) {
        try {
            const endpoint = new URL(`/api/replays/${args.id}`, this._baseURL);
            return await this.request(
                endpoint,
                {method: "DELETE"}
            );
        } catch (e) {
            throw new Error(e);
        }
    }

    async downloadReplay(args: DownloadReplayArgs) {
        try {
            const endpoint = new URL(`/api/replays/${args.id}/file`, this._baseURL);
            return await fetch(endpoint, {
                headers: {
                    ...this.authHeaders()
                }
            });
        } catch (e) {
            throw new Error(e);
        }
    }

    async createGroup(args: CreateGroupArgs) {
        try {
            const endpoint = new URL("/api/groups", this._baseURL);
            return await this.request(
                endpoint,
                {method: "POST", body: JSON.stringify({...args})},
                {"Content-Type": "application/json"}
            );
        } catch (e) {
            throw new Error(e);
        }
    }

    async listGroups(args: ListGroupsArgs = {}) {
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

    async getGroup(args: GetGroupArgs) {
        try {
            const endpoint = new URL(`/api/groups/${args.id}`, this._baseURL);
            return await this.request(endpoint);
        } catch (e) {
            throw new Error(e);
        }
    }

    async deleteGroup(args: DeleteGroupArgs) {
        try {
            const endpoint = new URL(`/api/groups/${args.id}`, this._baseURL);
            return await this.request(endpoint, {method: "DELETE"});
        } catch (e) {
            throw new Error(e);
        }
    }

    async patchGroup({id, patch}: PatchGroupArgs) {
        try {
            const endpoint = new URL(`/api/groups/${id}`, this._baseURL);
            return await this.request(endpoint, {
                method: "PATCH",
                body: JSON.stringify({...patch})
            }, {"Content-Type": "application/json"});
        } catch (e) {
            throw new Error(e);
        }
    }

}