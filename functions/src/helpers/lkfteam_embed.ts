import getRankedIcon from "../helpers/icons_ranked"
import { findRegionOPGG } from "../helpers/opgg_regions"


export const embedGenerator = ( data: any, info: string, author: any) => {

    let description = '**Team**';

    data.forEach((player: any)  => {
        if (player.rankedData.length > 0){

        const nameForSearch = player.lolName.replace(/ /g, '+');
        const opggRegion = findRegionOPGG(player.region);
        description += `\n\n[${player.lolName}](https://${opggRegion}/summoner/userName=${nameForSearch})
        **${player.rankedData[0].queueType === 'RANKED_FLEX_SR' ? 'Flex' : 'SoloQ'}** ${player.rankedData[0].tier} ${player.rankedData[0].rank}`;

            if (player.rankedData.length > 1) {
              description += `\n**${player.rankedData[1].queueType === 'RANKED_FLEX_SR' ? 'Flex' : 'SoloQ'}** ${player.rankedData[1].tier} ${player.rankedData[1].rank}`;
            }
        }
    });

    const getAuthorRank = data[0].rankedData.find((rankStatus: any) => rankStatus.queueType === "RANKED_SOLO_5x5");
    const rank_icon_url = getRankedIcon(getAuthorRank?.tier);

    const embed =  {
        username: "Tuerquita",
        avatar_url: "https://res.cloudinary.com/dnb7yygrn/image/upload/v1610365422/tuerquita-icon_rxaazg.png",
        embeds: [
            {
                author: {
                    name: author.name,
                    icon_url: author.avatar,
                },
                title: info,
                description: description,
                color: 16711680,
                thumbnail: {
                    url: rank_icon_url,
                },
            },
        ],
    };

    return embed;
}
