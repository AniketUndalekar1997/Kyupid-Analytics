import React, { Component } from "react";
import "leaflet/dist/leaflet.css";
import { getAreasData, getUsersData } from "./utils/api";
import { formatUserData, computeDashBoardData } from "./utils/helpers";
import './App.css';
import MiniDrawer from "./Navigation";
import Map from './Main/Map';
import MyLoader from "./Main/Loader";
import DataTable from "./tables";
import { mapAreaName } from "./utils/helpers";
import isEmpty from "lodash.isempty";

export default class App extends Component {
  state = {
    geoData: null,
    usersData: null,
    formattedData: null,
    isGeoLoading: true,
    isUserLoading: true,
  };

  componentDidMount() {
    getAreasData()
      .then(res => {
        const posts = res.data;
        this.setState({ geoData: posts, isGeoLoading: false })
      })

    getUsersData()
      .then((res) => {
        const users = res.data;
        this.setState({ usersData: users });
        const formattedData = { ...formatUserData(users.users) };
        this.setState({ formattedData: formattedData, isUserLoading: false });
      })
  }

  render() {

    const {
      formattedData,
      usersData,
      geoData,
      isGeoLoading,
      isUserLoading
    } = this.state;

    let dashboarData, areaNameMap;

    const dataObj = {
      formattedData,
      usersData,
      geoData,
      isGeoLoading,
      isUserLoading
    };

    if (formattedData && geoData) {
      dashboarData = computeDashBoardData(formattedData);
    }

    if (geoData && !isGeoLoading) {
      areaNameMap = mapAreaName(this.state.geoData);
    }


    const colorObject = {
      map1: {
        color1: [245, 196, 42],
        color2: [143, 111, 9],
        colorFactorKey: 'male'
      },
      map2: {
        color1: [127, 230, 126],
        color2: [8, 130, 7],
        colorFactorKey: 'pro'
      },
      map3: {
        color1: [235, 66, 66],
        color2: [135, 7, 7],
        colorFactorKey: "matches"
      }
    }

    return (
      <div className="app" >
        <div className="app__top">
          <MiniDrawer dataObj={dashboarData} />
        </div>

        {((isGeoLoading && isUserLoading) || isEmpty(formattedData) || isEmpty(usersData)) ?
          <MyLoader /> :
          <>
            <div className="app__bottom">
              <div className="table">
                <DataTable formattedData={formattedData} areaNameMap={areaNameMap} tableName="users" />
              </div>
              <div className="map">

                <Map dataObj={dataObj} colorObject={colorObject.map1} />
              </div>
            </div>
            <div className="proUsers_table">
              <div className="pro_table">
                <DataTable formattedData={formattedData} areaNameMap={areaNameMap} tableName="prousers" />
              </div>
              <div className="proUsers_map">
                <Map dataObj={dataObj} colorObject={colorObject.map2} />
              </div>
            </div>
            <div className="proUsersMatch_table">
              <div className="proMatch_table">
                <DataTable formattedData={formattedData} areaNameMap={areaNameMap} tableName="prousersmatch" />
              </div>
              <div className="proMatch_map">
                <Map dataObj={dataObj} colorObject={colorObject.map3} />
              </div>
            </div>
          </>
        }
      </div>
    );
  }
}
