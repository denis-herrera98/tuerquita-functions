const regions = new Map<string, string>(
    [
        ["br1.api.riotgames.com", "BR"],
        ["eun1.api.riotgames.com", "EUNE"],
        ["euw1.api.riotgames.com", "EUW"],
        ["jp1.api.riotgames.com", "JP"],
        ["kr.api.riotgames.com", "KR"],
        ["la1.api.riotgames.com", "LAN"],
        ["la2.api.riotgames.com", "LAS"],
        ["na1.api.riotgames.com", "NA"],
        ["oc1.api.riotgames.com", "OCE"],
        ["tr1.api.riotgames.com", "TR"],
        ["ru.api.riotgames.com", "RU"],
    ],
);

export const findRegion = (region: string) => {
    if (!regions.has(region)){
        throw new Error('No region was found')
    }
    return regions.get(region)
}


