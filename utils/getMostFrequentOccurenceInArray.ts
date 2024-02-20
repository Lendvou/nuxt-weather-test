export const getMostFrequentOccurenceInArray = (arr: (string | number)[]) => {
    const map: Record<string | number, number> = {};
    for (const item of arr) {
        map[item] = (map[item] || 0) + 1;
    }
    return Object.entries(map).sort(
        ([, freqA], [, freqB]) => freqB - freqA
    )[0][0];
};
