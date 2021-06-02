const puppeteer = require('puppeteer');

async function getPlayerMatches (playerIds) {
    (async () =>
    {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        let res = {};
        for (const id of playerIds) {
            console.log(id);

            let playerId = id.replace('#', '%23');
            await page.goto("https://cod.tracker.gg/warzone/profile/atvi/" + playerId + "/matches");
            await page.waitForTimeout(2000);
            res[playerId] = await page.evaluate(
                () => Array.from(
                    document.querySelectorAll('.match__link'),
                    a => a.getAttribute('href').split(/[?/]+/)[3]
                )
            );
        }
        await browser.close();
    })();
}

function getXHR (id) {
    return new Promise(async (resolve, reject) => {
        try {

            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            await page.goto("https://cod.tracker.gg/warzone");

            await page.click('.platforms-dropdown');
            const linkHandlers = await page.$x("//span[contains(text(), 'Activision ID')]");
            if (linkHandlers.length > 0) {
                await linkHandlers[0].click();
            } else {
                throw new Error("Link not found");
            }

            await page.click('input[type="search"]');
            await page.type('input[type="search"]', id.username + '#');

            const data = await page.waitForResponse(
                response =>
                    response.url().includes('api/v2/warzone/standard/search?platform=atvi&query='));

            var players = await data.json();
            var playerIds = getIds(players);

            let res = {};
            for (const player of playerIds) {
                let  id = player.replace('#', '%23');

                await page.goto("https://cod.tracker.gg/warzone/profile/atvi/" + id + "/matches");
                await page.waitForTimeout(2000);

                res[id] = await page.evaluate(
                    () => Array.from(
                        document.querySelectorAll('.match__link'),
                        a => a.getAttribute('href').split(/[?/]+/)[3]
                    )
                );
            }

            let matchedPlayer = matchFound(res);

            var kdRatio = 0;
            if (matchedPlayer !== '') {
                await page.goto("https://cod.tracker.gg/warzone/profile/atvi/" + matchedPlayer + "/overview");
                kdRatio = await page.evaluate(() => {
                    let items = document.querySelectorAll('span[title="K/D Ratio"]');
                    if (items.length < 1) return 0;
                    return items[1].nextElementSibling.innerHTML;
                })
            }
            await browser.close();
            return resolve(kdRatio);
        } catch (e) {
            return reject(e);
        }
    })
}

function getIds(players) {
    let playerIds = [];
    for (const id of players.data) {
        if (playerIds.length > 3) return playerIds;
        playerIds.push(id.platformUserIdentifier);
    }
    return playerIds;
}

function matchFound (res) {
    for (const player in res) {
        let idSet = new Set(res[player]);
        if (idSet.has('4094181992530709708')) {
            return player;
        }
    }
    return '';
}

module.exports.getXHR = getXHR;