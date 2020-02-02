
import React, { Component } from 'react';
import "views/Maps/css/leaflet.css";
import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import FullscreenControl from 'react-leaflet-fullscreen';
import 'react-leaflet-fullscreen/dist/styles.css'
//import markerIron from '/home/naval/nvl/POC/scoma/cms-ai/react-analytics-dashboard/src/views/Maps/css/images/marker-icon.png';
import markerIronRed from './css/images/red-dot.png';
import markerShadow from './css/images/marker-shadow.png';
import markerIron from './css/images/blue-dot.png';


const Leaflet = window.L;


var shipLayer = L.layerGroup();



class Map extends React.Component {
  constructor() {
  super();
  this.state = {
    allContractsDetails: [],
    markerPoints: [],
    contractType: "secondParty",
    firstPartyLatLong: [],
    secondPartyLatLong: []
  }
}

onMouseHover = event => {
    console.log("Mouser Hovered");
    console.log(event);
};

positions = [[36,-119],[38,-100]];
items = [];
  onChangeHandler1 = event => {
    console.log("LeafMap onChangeHandler1");
  }

  componentDidUpdate = () => {
    console.log("LeafMap componentDidUpdate");
    console.log(this.state.allContractsDetails);
      
  };

   componentDidMount = () => {
    
     fetch("http://localhost:3000/api/analytics/contractsDetails")
      .then(response => {
        if (!response.ok) {
          throw Error("Network request failed.");
        }
        return response;
      })
      .then(responseData => responseData.json())
      .then( responseData =>{
        this.setState({ allContractsDetails: responseData});
        for(let index = 0; index < responseData.length; index++){
          fetch('http://127.0.0.1:5001/fetch_lat_long', {
              method: 'POST',
              body: responseData[index].firstPartyAddress
            })
            .then(
              (data) => {
                if(data != null){
                  return data.json();
                }
                else{
                  throw new Error("Error occured while fetcing data from 'http://127.0.0.1:5001/fetch_lat_long'");
                }
              }) 
            .then(
              data => {
                if(data.length > 0){
                  this.positions.push(data);
                  var startDate = new Date(parseInt(responseData[index].startDate));
                  var endDate = new Date(parseInt(responseData[index].endDate));
                  this.items.push(<Marker position={data} icon={this.myIconBlue}
                    onMouseOver={() => { this.onMouseHover(this) }}
                  >
                    <Popup>
                     <b>Start Date:</b> {startDate.getDate() +"/"+(startDate.getMonth()+ 1)+"/"+startDate.getFullYear()} <br/> 
                     <b>Validity: </b> {endDate.getDate() +"/"+(endDate.getMonth()+ 1)+"/"+endDate.getFullYear()} <br/> 
                     <b>First Party:</b> {responseData[index].firstParty} <br/> 
                     <b>Second Party: </b> {responseData[index].secondParty} <br/> 
                     <b>First Party Address:</b> {responseData[index].firstPartyAddress} <br/> 
                     <b>Second Party Address: </b> {responseData[index].secondPartyAddress}
                    </Popup>
                  </Marker>)
                  if(index == responseData.length -1){
                    this.setState({markerPoints: this.items});
                    this.state.firstPartyLatLong.push(this.items);
                  }
                      
                }
              }
            )
            .catch((error) => {
              console.log(error)
            });

            fetch('http://127.0.0.1:5001/fetch_lat_long', {
              method: 'POST',
              body: responseData[index].secondPartyAddress
            })
            .then(
              (data) => {
                if(data != null){
                  return data.json();
                }
                else{
                  throw new Error("Error occured while fetcing data from 'http://127.0.0.1:5001/fetch_lat_long'");
                }
              }) 
            .then(
              data => {
                if(data.length > 0){
                  
                  this.positions.push(data);
                  var startDate = new Date(parseInt(responseData[index].startDate));
                  var endDate = new Date(parseInt(responseData[index].endDate));
                  this.items.push(<Marker position={data} icon={this.myIconRed}
                    onMouseOver={() => { this.onMouseHover(this) }}
                  >
                    <Popup>
                     <b>Start Date:</b> {startDate.getDate() +"/"+(startDate.getMonth()+ 1)+"/"+startDate.getFullYear()} <br/> 
                     <b>Validity: </b> {endDate.getDate() +"/"+(endDate.getMonth()+ 1)+"/"+endDate.getFullYear()} <br/> 
                     <b>First Party:</b> {responseData[index].firstParty} <br/> 
                     <b>Second Party: </b> {responseData[index].secondParty} <br/> 
                     <b>First Party Address:</b> {responseData[index].firstPartyAddress} <br/> 
                     <b>Second Party Address: </b> {responseData[index].secondPartyAddress}
                    </Popup>
                  </Marker>)
                  if(index == responseData.length -1){
                    this.setState({markerPoints: this.items});
                    this.state.firstPartyLatLong.push(this.items);
                  }
                      
                }
              }
            )
            .catch((error) => {
              console.log(error)
            });


           // .error(function() {
            //  console.log("Error occured while fetcing data from 'http://127.0.0.1:5001/fetch_lat_long'");
          //});
        }

      }
    );
  }

  handleChange = (event, value) => {
    console.log("LeafMap handleChange");
  };


  myIconBlue= L.icon({
    iconUrl: markerIron,
    iconSize: [40, 45],
    iconAnchor: [15, 40],
    popupAnchor: [-1, -50],
    //shadowUrl: markerShadow,
    shadowSize: [68, 95],
    shadowAnchor: [22, 94]
  });
  
  myIconRed= L.icon({
  iconUrl: markerIronRed,
  iconSize: [40, 45],
  iconAnchor: [15, 40],
  popupAnchor: [-1, -50],
  //shadowUrl: markerShadow,
  shadowSize: [68, 95],
  shadowAnchor: [22, 94]
  });

  render() {
           const bounds = Leaflet.latLngBounds([this.positions]);
    return (
        
      <LeafletMap
        center={[50, 10]}
        zoom={6}
        maxZoom={20}
        attributionControl={true}
        zoomControl={true}
        doubleClickZoom={true}
        scrollWheelZoom={true}
        dragging={true}
        animate={true}
        easeLinearity={0.35}
        bounds={bounds}
        fullscreenControl = {true}
      >
        <TileLayer
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
        {this.state.markerPoints}
        
      </LeafletMap>
    );
  }
}
export default Map;