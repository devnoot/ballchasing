import { Response } from "node-fetch";
import { MatchResult, Playlist, Rank, SortBy, SortDir, Visibility } from "./types";
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
        response: Response;
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
        response: Response;
        data: any;
    }>;
    getMaps(): Promise<{
        response: Response;
        data: any;
    }>;
    listReplays(args: ListReplaysArgs): Promise<{
        response: Response;
        data: any;
    }>;
    getReplay(args: GetReplayArgs): Promise<{
        response: Response;
        data: any;
    }>;
    patchReplay({ id, patch }: PatchReplayArgs): Promise<{
        response: Response;
        data: any;
    }>;
    deleteReplay(args: DeleteReplayArgs): Promise<{
        response: Response;
        data: any;
    }>;
    downloadReplay(args: DownloadReplayArgs): Promise<Response>;
    createGroup(args: CreateGroupArgs): Promise<{
        response: Response;
        data: any;
    }>;
    listGroups(args?: ListGroupsArgs): Promise<{
        response: Response;
        data: any;
    }>;
    getGroup(args: GetGroupArgs): Promise<{
        response: Response;
        data: any;
    }>;
    deleteGroup(args: DeleteGroupArgs): Promise<{
        response: Response;
        data: any;
    }>;
    patchGroup({ id, patch }: PatchGroupArgs): Promise<{
        response: Response;
        data: any;
    }>;
}
