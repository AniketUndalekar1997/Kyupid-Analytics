import React, { Component } from "react";
import {
  MapContainer,
  TileLayer,
  ZoomControl,
  GeoJSON,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { pickHex } from "../utils/getColorFactor";
import { Typography } from "@mui/material";


export default class Map extends Component {

  render() {
    const {
      formattedData,
      geoData,
    } = this.props.dataObj;

    const {
      color1,
      color2,
      colorFactorKey
    } = this.props?.colorObject;

    const getColorFactor = (key, user) => {
      let colorFactor;
      if (key === "male") {
        colorFactor = user?.male / user?.users_count;
      }
      if (key === "pro") {
        colorFactor = user?.maleProUsers / user?.pro_users;
      }
      if (key === "matches") {
        colorFactor = user?.proMaleMatchPer / 100;
      }
      return colorFactor;
    }

    return (
      <MapContainer
        center={[12.9716, 77.5946]}
        zoom={11}
        zoomControl={false}
        style={{ height: "63vh", width: "100%" }}
      >

        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {geoData?.features?.map((item) => {
          const { area_id } = item?.properties;
          const user = formattedData[area_id];
          // const colorFactor = user?.male / user?.users_count;
          const colorFactor = getColorFactor(colorFactorKey, user)

          return (
            <GeoJSON
              key={item?.properties?.area_id}
              data={item}
              pathOptions={{
                color: "#3d3838",
                fillColor: pickHex(color1, color2, colorFactor),
                fillOpacity: 0.8,
                opacity: 1,
                weight: 1
              }}

              onEachFeature={(item, layer) => {
                const { properties } = item;
                const { area_id, name } = properties;

                const {
                  users_count,
                  female,
                  male,
                  matches,
                  pro_users,
                  total_age,
                } = formattedData[area_id]

                layer.bindPopup(
                  `<h3 class="infoboxHeader">${name}</h3><TABLE BORDER="1" CELLSPACING="1" WIDTH="300 COlOR="Green"">
                    <TR><TD BGCOLOR="#70F989">Total No of Users</TD> <TD>${users_count}</TD></TR>
                    <TR><TD BGCOLOR="#70F989">No of female users</TD> <TD>${female}</TD></TR>
                    <TR><TD BGCOLOR="#70F989">No of male users</TD> <TD>${male}</TD>
                    <TR><TD BGCOLOR="#70F989">Total no of matches</TD> <TD>${matches}</TD>
                    <TR><TD BGCOLOR="#70F989">No of Pro Users</TD> <TD>${pro_users}</TD>
                    <TR><TD BGCOLOR="#70F989">Avergae Age of Users</TD> <TD>${Math.floor(total_age / users_count)}</TD>
                    </TABLE>`
                );

                layer.on({
                  mouseover: function (e) {
                    const auxLayer = e.target;
                    auxLayer.setStyle({
                      weight: 4,
                      color: "#3d3838",
                      fillColor: pickHex(color1, color2, colorFactor),
                    });
                  },
                  mouseout: function (e) {
                    const auxLayer = e.target;
                    auxLayer.setStyle({
                      weight: 1,
                      color: "#3d3838",
                      fillColor: pickHex(color1, color2, colorFactor),
                      dashArray: "",
                      fillOpacity: 0.8,
                      opacity: 1
                    });
                  }
                });
              }}
              attribution="&copy; credits due..."
            >
            </GeoJSON>
          )
        }
        )}
        <ZoomControl position="bottomright" />

      </MapContainer>
    );
  }
}
