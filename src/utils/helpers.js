const createArea = (item, processedData) => {
    const {
        area_id,
        age,
        gender,
        is_pro_user,
        total_matches
    } = item;

    const users_count = 1;
    const avg_age = age;
    const male = isMaleUser(gender) ? 1 : 0;
    const female = isMaleUser(gender) ? 0 : 1;
    const pro_users = (is_pro_user) ? 1 : 0;
    const matches = total_matches;
    const totalMaleMatches = isMaleUser(gender) ? total_matches : 0;
    const proUsersMatches = (is_pro_user) ? total_matches : 0;
    const totalMaleAge = isMaleUser(gender) ? age : 0;
    const maleProUsers = isMaleUser(gender) && (is_pro_user) ? 1 : 0;

    const userMap = {
        "id": area_id,
        "users_count": users_count,
        "total_age": avg_age,
        "male": male,
        "female": female,
        "pro_users": pro_users,
        "matches": matches,
        "totalMaleAge": totalMaleAge,
        "proUsersMatches": proUsersMatches,
        "totalMaleMatches": totalMaleMatches,
        "maleProUsers": maleProUsers,

    };

    processedData[area_id] = userMap;
}

const isMaleUser = (gender) => {
    return gender === "M";
}

const appendUsers = (item, existingUser) => {
    const { age, gender, is_pro_user, total_matches } = item;
    existingUser["total_age"] += age;
    existingUser.male += isMaleUser(gender) ? 1 : 0;
    existingUser.female += isMaleUser(gender) ? 0 : 1;
    existingUser.pro_users += (is_pro_user) ? 1 : 0;
    existingUser.matches += total_matches;
    existingUser.users_count += 1;
    existingUser.totalMaleAge += isMaleUser(gender) ? age : 0;
    existingUser.totalMaleMatches += isMaleUser(gender) ? total_matches : 0;
    existingUser.proUsersMatches += (is_pro_user) ? total_matches : 0;
    existingUser.maleProUsers += isMaleUser(gender) && (is_pro_user) ? 1 : 0;
}

const computeDashBoardData = (formattedData) => {
    let res = 0;
    let totalProUsers = 0;
    let totalMatches = 0;
    let totalUsers = 0;
    let avgAge = 0;
    let femaleCount = 0;
    let proPercent, femalePercent, maleCount, malePercent;

    if (formattedData) {
        Object.keys(formattedData).forEach(function (key) {
            totalProUsers += formattedData[key]?.pro_users;
            totalMatches += formattedData[key]?.matches;
            totalUsers += formattedData[key]?.users_count;
            avgAge += formattedData[key]?.total_age;
            femaleCount += formattedData[key]?.female;
        });
    }

    // Derived data 
    maleCount = totalUsers - femaleCount;
    proPercent = Math.floor(totalProUsers * 100 / totalUsers);
    femalePercent = Math.floor(femaleCount * 100 / totalUsers);
    malePercent = 100 - femalePercent;

    res = {
        totalUsers,
        totalMatches,
        totalProUsers,
        avgAge,
        femaleCount,
        maleCount,
        proPercent,
        femalePercent,
        malePercent
    }
    return res;
}

const formatUserData = (users) => {
    const processedData = {}

    users.forEach(item => {
        const existingUser = processedData[item?.area_id];
        if (!existingUser) {
            createArea(item, processedData);
        }
        else {
            appendUsers(item, existingUser);
        }
    });
    return processedData;
}

const mapAreaName = (geoData) => {
    let areaMap = {};
    geoData?.features?.map((item) => {
        const { area_id, name } = item?.properties;
        areaMap[area_id] = name;
        return null
    })
    return areaMap;
}

const addDerivedData = (data, key, areaNameMap) => {
    data[key]["femaleProusers"] = data[key].pro_users - data[key].maleProUsers;
    data[key]["maleProPer"] = Math.floor(data[key].maleProUsers * 100 / data[key].pro_users);
    data[key]["femaleProPer"] = 100 - data[key].maleProPer;
    data[key]["proMatchPer"] = Math.floor(data[key].proUsersMatches * 100 / data[key].matches);
    data[key]['totalFemaleMatches'] = Math.floor(data[key].matches - data[key].totalMaleMatches);
    data[key]["proMaleMatchPer"] = Math.floor(data[key].totalMaleMatches * 100 / data[key].matches);
    data[key]["proFemaleMatchPer"] = 100 - data[key].proMaleMatchPer;
    data[key]["areaName"] = areaNameMap[key];
    return data[key];
}

export { formatUserData, computeDashBoardData, mapAreaName, addDerivedData };