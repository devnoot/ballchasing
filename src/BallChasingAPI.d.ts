export declare type Visibility = "public" | "unlisted" | "private";
export declare type Playlist = "unranked-duels" | "unranked-doubles" | "unranked-standard" | "unranked-chaos" | "private" | "season" | "offline" | "ranked-duels" | "ranked-doubles" | "ranked-solo-standard" | "ranked-standard" | "snowday" | "rocketlabs" | "hoops" | "rumble" | "tournament" | "dropshot" | "ranked-hoops" | "ranked-rumble" | "ranked-dropshot" | "ranked-snowday" | "dropshot-rumble" | "heatseeker";
export declare type MatchResult = "win" | "loss";
export declare type Rank = "unranked" | "bronze-1" | "bronze-2" | "bronze-3" | "silver-1" | "silver-2" | "silver-3" | "gold-1" | "gold-2" | "gold-3" | "platinum-1" | "platinum-2" | "platinum-3" | "diamond-1" | "diamond-2" | "diamond-3" | "champion-1" | "champion-2" | "champion-3" | "grand-champion";
export declare type SortBy = "replay-date" | "upload-date";
export declare type SortDir = "asc" | "desc";
export interface ListReplaysArgs {
    title?: string;
    playerName?: string;
    playerId?: string;
    playlist?: Playlist;
    season?: string;
    matchResult?: MatchResult;
    minRank?: Rank;
    maxRank?: Rank;
    pro?: boolean;
    uploader?: string;
    group?: string;
    map?: string;
    createdBefore?: string;
    createdAfter?: string;
    replayDateAfter?: string;
    replayDateBefore?: string;
    count?: number;
    sortBy?: SortBy;
    sortDir?: SortDir;
}
export interface DeleteReplayArgs {
    id: string;
}
export interface PatchReplayArgs {
    id: string;
    patch: {
        [key: string]: string;
    };
}
export interface DownloadReplayArgs {
    id: string;
}
export interface GetReplayArgs {
    id: string;
}
export interface CreateGroupArgs {
    name: string;
    parent?: string;
    playerIdentification: "by-id" | "by-name";
    teamIdentification: "by-distinct-players" | "by-player-clusters";
}
export interface ListGroupsArgs {
    name?: string;
    creator?: string;
    group?: string;
    createdBefore?: string;
    createdAfter?: string;
    count?: number;
    sortBy?: SortBy;
    sortDir?: SortDir;
}
export interface DeleteGroupArgs {
    id: string;
}
export interface PatchGroupArgs {
    id: string;
    patch: {
        [key: string]: string;
    };
}
export interface GetGroupArgs {
    id: string;
}
export declare class BallChasingAPI {
    private readonly _apiKey;
    private readonly _baseURL;
    constructor(apiKey: string);
    /**
     * Create the authorization headers needed to call the
     * ballchasing API.
     * @private
     */
    private authHeaders;
    /**
     * Make a request to the ballchasing API. This method will
     * check the response for errors.
     * @param url
     * @param fetchArgs Any extra fetch args
     * @param headers Any extra headers
     * @private
     */
    private request;
    /**
     * Checks if
     * 1) Your API key is correct
     * 2) If ballchasing API is reachable
     */
    ping(): Promise<{
        response: import("node-fetch").Response;
        data: any;
    }>;
    /**
     * Upload a replay
     *
     * @param filepath
     * @param groupId
     * @param visibility
     */
    uploadReplay(filepath: string, groupId?: string, visibility?: Visibility): Promise<{
        response: import("node-fetch").Response;
        data: any;
    }>;
    getMaps(): Promise<{
        response: import("node-fetch").Response;
        data: any;
    }>;
    listReplays(args: ListReplaysArgs): Promise<{
        response: import("node-fetch").Response;
        data: any;
    }>;
    getReplay(args: GetReplayArgs): Promise<{
        response: import("node-fetch").Response;
        data: any;
    }>;
    patchReplay({ id, patch }: PatchReplayArgs): Promise<{
        response: import("node-fetch").Response;
        data: any;
    }>;
    deleteReplay(args: DeleteReplayArgs): Promise<{
        response: import("node-fetch").Response;
        data: any;
    }>;
    downloadReplay(args: DownloadReplayArgs): Promise<import("node-fetch").Response>;
    createGroup(args: CreateGroupArgs): Promise<{
        response: import("node-fetch").Response;
        data: any;
    }>;
    listGroups(args?: ListGroupsArgs): Promise<{
        response: import("node-fetch").Response;
        data: any;
    }>;
    getGroup(args: GetGroupArgs): Promise<{
        response: import("node-fetch").Response;
        data: any;
    }>;
    deleteGroup(args: DeleteGroupArgs): Promise<{
        response: import("node-fetch").Response;
        data: any;
    }>;
    patchGroup({ id, patch }: PatchGroupArgs): Promise<{
        response: import("node-fetch").Response;
        data: any;
    }>;
}
