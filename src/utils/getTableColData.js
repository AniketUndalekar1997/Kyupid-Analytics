const selectColData = (val) => {
    if (val === "users") {
        const columns = [
            { field: 'id', headerName: 'Area ID', width: 75 },
            { field: `${'users_count'}`, headerName: 'Total Users', width: 100 },
            { field: 'male', headerName: 'Male', width: 70 },
            { field: 'female', headerName: 'Female', width: 80 },
            { field: 'areaName', headerName: 'Area', width: 240 },

        ];
        return columns;
    }

    if (val === "prousers") {
        const columns = [
            { field: 'id', headerName: 'Area ID', width: 75 },
            { field: 'pro_users', headerName: 'Pro Users', width: 100 },
            { field: 'maleProPer', headerName: 'Male ( % )', width: 120 },
            { field: 'femaleProPer', headerName: 'Female ( % )', width: 120 },
            { field: 'areaName', headerName: 'Area', width: 240 },

        ];
        return columns;
    }
    if (val === "prousersmatch") {
        const columns = [
            { field: 'id', headerName: 'Area ID', width: 75 },
            { field: 'matches', headerName: 'Total Matches', width: 120 },
            { field: 'totalMaleMatches', headerName: 'Male Matches', width: 120 },
            { field: 'totalFemaleMatches', headerName: 'Female Matches', width: 140 },
            { field: 'proMatchPer', headerName: 'Pro Match (%)', width: 130 },
            { field: 'proMaleMatchPer', headerName: 'Pro Male (%)', width: 120 },
            { field: 'proFemaleMatchPer', headerName: 'Pro Female (%)', width: 130 },
            { field: 'areaName', headerName: 'Area', width: 240 },

        ];
        return columns;
    }
}

export default selectColData