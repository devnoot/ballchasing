const {BallChasingAPI} = require("../dist/index");
const Bottleneck = require("bottleneck/es5");
const expect = require("chai").expect;
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();

const limiter = new Bottleneck({
    maxConcurrent: 1,
    minTime: 1000 // 1 call per second
});

const API = new BallChasingAPI(process.env.API_KEY);

describe("BalChasingAPI Methods", () => {

    describe("BallChasingAPI.getReplay()", async () => {
        it("It should retrieve a replay with id b88feb3e-d33c-4979-acca-ca9ffd7c1a46", async () => {
            const {
                response,
                data
            } = await limiter.schedule(() => API.getReplay({id: "b88feb3e-d33c-4979-acca-ca9ffd7c1a46"}));
            expect(response.status).to.eq(200);
        });
    });

    describe("BallChasingAPI.ping()", async () => {
        it("It should ping the API server and receive signs of life", async () => {
            const {response, data} = await limiter.schedule(() => API.ping());
            expect(response.status).to.eq(200);
            expect(data).to.have.property("ball");
        });
    });

    describe("BallChasingAPI.getMaps()", async () => {
        it("It should retrieve a list of maps from the API server.", async () => {
            const {response, data} = await limiter.schedule(() => API.getMaps());
            expect(Object.keys(data).length).to.be.greaterThan(1);
            expect(Object.keys(data)).to.contain("stadium_day_p");
        });
    });

    describe("BallChasingAPI.uploadReplay()", () => {
        it("It should upload a replay and receive a status code of 409 because it already exists.", async () => {
            const replayFilepath = path.resolve(process.cwd(), "replays", "CCD37AC44A4D7C4E9A8BD8A4159A702D.replay");
            const {response, data} = await limiter.schedule(() => API.uploadReplay(replayFilepath));
            // 409 = the replay already exists
            expect(response.status).to.eq(409);
        });
    });

    describe("BallChasingAPI.listReplays()", () => {
        it("It should retrieve a list of replays by player with name noot", async () => {
            const {response, data} = await limiter.schedule(() => API.listReplays({playerName: "noot"}));
            expect(response.status).to.eq(200);
        });
    });

    describe("BallChasingAPI.listReplays()", () => {
        it("It should retrieve a list of replays by player with id asiud92easdasd", async () => {
            const {response, data} = await limiter.schedule(() => API.listReplays({playerId: "asiud92easdasd"}));
            expect(response.status).to.eq(200);
        });
    });

    describe("BallChasingAPI.listReplays()", () => {
        it("It should retrieve a list of replays by player noot that have been created between 01/01/2020 and 01/01/2021 on map park_p, sorted ascending by replay date.", async () => {
            const {response, data} = await limiter.schedule(() => API.listReplays(({
                playerName: "noot",
                createdAfter: "2020-01-01T00:00:00-05:00",
                createdBefore: "2021-01-01T00:00:00-05:00",
                map: "park_p",
                sortBy: "replay-date",
                sortDir: "asc"
            })));
            expect(response.status).to.eq(200);
        });
    });

    // describe("BallChasingAPI.patchReplay()", () => {
    //     it("", async () => {
    //
    //     });
    // });
    //
    // describe("BallChasingAPI.deleteReplay()", () => {
    // });

    describe("BallChasingAPI.downloadReplay()", () => {
        it("It should download the replay with id b88feb3e-d33c-4979-acca-ca9ffd7c1a46", async () => {
            const {response} = await limiter.schedule(() => API.downloadReplay({id: "b88feb3e-d33c-4979-acca-ca9ffd7c1a46"}));
            expect(response.status).to.eq(200);
        });
    });

    // describe("BallChasingAPI.createGroup()", () => {
    // });

    describe("BallChasingAPI.listGroups()", () => {
        it("It should retrieve a list of groups.", async () => {
            const {response} = await limiter.schedule(() => API.listGroups());
            expect(response.status).to.eq(200);
        });
    });

    // describe("BallChasingAPI.getGroup()", () => {
    // });
    //
    // describe("BallChasingAPI.deleteGroup()", () => {
    // });
    //
    // describe("BallChasingAPI.patchGroup()", () => {
    // });

});

