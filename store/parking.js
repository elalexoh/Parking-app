/*
  parking
  
*/
const initialState = () => ({
  parkingSpaces: [{
    id: 1,
    name: "Parking zone a",
    type: "Small",
    vehicles: []
  },
  {
    id: 2,
    name: "Parking zone b",
    type: "Medium",
    vehicles: []
  },
  {
    id: 3,
    name: "Parking zone c",
    type: "Medium",
    vehicles: []
  },
  {
    id: 4,
    name: "Parking zone d",
    type: "Large",
    vehicles: []
  }
  ],
  vehicles: [
    {
      id: 1,
      type: "motorcycle",
      icon: "🛵",
      owner: "John Doe"
    },
    {
      id: 2,
      type: "sedan",
      icon: "🚙",
      owner: "Jane Doe"
    },
    {
      id: 3,
      type: "truck",
      icon: "🚜",
      owner: "John Smith"
    }
  ],
  alerts: [],
});

// Getter functions.
const getters = {
  getParkingSpaces: state => {
    return state.parkingSpaces;
  },
  getVehicles: state => {
    return state.vehicles;
  },
  getAlerts: state => {
    return state.alerts;
  },
  getCurrentParking: (state) => {
    const parkingId = $nuxt['_route'].params.id;
    const currentParking = state.parkingSpaces.filter(park => {
      return park.id == parkingId;
    });
    return currentParking;
  },
}
const actions = {
  parking({
    commit
  }, data) {
    commit('PARKING_VEHICLE', data);
  },
  addNewVehicle({
    commit
  }, data) {
    commit('ADD_NEW_VEHICLE', data);
  },
  removeVehicle({
    commit
  }, data) {
    commit('REMOVE_VEHICLE', data);
  },
  resetAlerts({ commit }) {
    commit('RESET_ALERTS');
  }
}
// Mutations
const mutations = {
  SET_VEHICLES(state, vehicle) {
    state.vehicles = vehicle;
  },
  SET_PARKING_SPACE(state, space) {
    state.parkingSpaces = space;
  },
  ADD_NEW_VEHICLE(state, newVehicle) {
    state.vehicles.push(newVehicle);

  },
  REMOVE_VEHICLE(state, id) {
    const result = state.vehicles.filter(vehicle => vehicle.id !== id);
    state.vehicles = result;
  },
  PARKING_VEHICLE(state, data) {
    const vehicle = data.vehicle;
    const parking = data.parking;
    state.alerts = [];
    state.parkingSpaces.forEach(park => {
      if (park.id === parking) {
        console.info(park.vehicles);
        if (vehicle.type === 'sedan') {
          if (park.type === 'Medium' || park.type === 'Large') {
            const result = state.vehicles.filter(veh => veh.id !== vehicle.id);
            state.vehicles = result;
            park.vehicles.push(vehicle)
            state.alerts.push({
              type: "success",
              message: "Registrado exitosamente"
            });
          } else {
            state.alerts.push({
              type: "warning",
              message: "No puede estacionar aqui."
            });
          }
        } else if (vehicle.type === 'truck') {
          if (park.type === 'Large') {
            const result = state.vehicles.filter(veh => veh.id !== vehicle.id);
            state.vehicles = result;
            park.vehicles.push(vehicle)
            state.alerts.push({
              type: "success",
              message: "Registrado exitosamente"
            });
          } else {
            state.alerts.push({
              type: "warning",
              message: "No puede estacionar aqui."
            });
          }
        } else {
          const result = state.vehicles.filter(veh => veh.id !== vehicle.id);
          state.vehicles = result;
          park.vehicles.push(vehicle)
          state.alerts.push({
            type: "success",
            message: "Registrado exitosamente"
          });
        }
      }
    });
  },
  RESET_ALERTS(state) {
    state.alerts = [];
  }
}

// State object.
const state = initialState;

export default {
  state,
  getters,
  mutations,
  actions
}
