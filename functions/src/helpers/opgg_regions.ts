const regions = new Map<string, string>(
    [
        ["br1.api.riotgames.com", "br.op.gg/"],
        ["eun1.api.riotgames.com", "eune.op.gg/"],
        ["euw1.api.riotgames.com", "euw.op.gg/"],
        ["jp1.api.riotgames.com", "jp.op.gg/"],
        ["kr.api.riotgames.com", "op.gg/"],
        ["la1.api.riotgames.com", "lan.op.gg/"],
        ["la2.api.riotgames.com", "las.op.gg/"],
        ["na1.api.riotgames.com", "na.op.gg/"],
        ["oc1.api.riotgames.com", "oce.op.gg/"],
        ["tr1.api.riotgames.com", "tr.op.gg/"],
        ["ru.api.riotgames.com", "ru.op.gg/"],
    ],
);

export const findRegionOPGG = (region: string) => {
    if (!regions.has(region)){
        throw new Error('No region was found')
    }
    return regions.get(region)
}


