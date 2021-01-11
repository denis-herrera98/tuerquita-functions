const icons = new Map();

icons.set(
  "IRON",
  "https://res.cloudinary.com/dnb7yygrn/image/upload/v1597544295/IRON_dlqdvs.png"
);
icons.set(
  "BRONZE",
  "https://res.cloudinary.com/dnb7yygrn/image/upload/v1597544297/BRONZE_eygje2.png"
);
icons.set(
  "SILVER",
  "https://res.cloudinary.com/dnb7yygrn/image/upload/v1597544300/SILVER_nlgost.png"
);
icons.set(
  "GOLD",
  "https://res.cloudinary.com/dnb7yygrn/image/upload/v1597544296/GOLD_dt880m.png"
);
icons.set(
  "PLATINUM",
  "https://res.cloudinary.com/dnb7yygrn/image/upload/v1597544300/PLATINUM_uode6a.png"
);
icons.set(
  "DIAMOND",
  "https://res.cloudinary.com/dnb7yygrn/image/upload/v1597544298/DIAMOND_pdsgwm.png"
);
icons.set(
  "MASTER",
  "https://res.cloudinary.com/dnb7yygrn/image/upload/v1597544300/MASTER_tjmdsc.png"
);
icons.set(
  "GRANDMASTER",
  "https://res.cloudinary.com/dnb7yygrn/image/upload/v1597544297/GRANDMASTER_f3com7.png"
);
icons.set(
  "CHALLENGER",
  "https://res.cloudinary.com/dnb7yygrn/image/upload/v1597544298/CHALLENGER_i1x5vx.png"
);

export default function (rank: string) {
  if (icons.has(rank)) {
    return icons.get(rank);
  }
  return "";
}
