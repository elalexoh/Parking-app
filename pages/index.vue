<template>
  <div class="container parking-body h-100">
    <!-- welcome message -->
    <div class="row welcome">
      <div class="col-12 col-sm-6 col-md-8">
        <h1>Plazas disponibles: {{getParkingSpaces.length}}</h1>
      </div>
      <div class="col-12 col-sm-6 col-md-4 d-flex">
        <h1 class="text-center text-sm-left">Vehiculos</h1>
        <a
          class="btn btn-success btn-sm ml-3 add-vehicle text-white"
          @click="addVehicle = !addVehicle"
        >+</a>
        <div class="custom-modal position-fixed" :class="!addVehicle  ? 'd-none' : ''">
          <div class="modal-wrapper w-50 h-75">
            <div class="modal-wrapper__head d-flex">
              <div class="close-custom btn btn-danger ml-auto" @click="addVehicle = !addVehicle">x</div>
            </div>
            <div class="modal-wrapper__body text-center">
              <h2>Nuevo vehículo</h2>
              <form action>
                <div class="container h-100">
                  <div class="row h-100">
                    <div class="col-6 offset-3 h-100 form-wrapper">
                      <div class="form-group">
                        <label for="vehicle-owner">Dueño</label>
                        <input
                          type="text"
                          class="form-control"
                          name="vehicle-owner"
                          id="vehicle-owner"
                          v-model="vehicleOwner"
                        >
                      </div>
                      <div class="form-group">
                        <label for="vehicle-type">Tipo de vehículo</label>
                        <select
                          name="vehicle-type"
                          v-model="vehicleType"
                          class="form-control"
                          id="vehicle-type"
                        >
                          <option value="motorcycle">Motocicleta</option>
                          <option value="sedan">Auto</option>
                          <option value="truck">Trailer</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div class="modal-wrapper__footer pb-5 text-center">
              <a href="#" class="btn btn-success" @click="newVehicle">añadir vehiculo</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- list of parkings -->
    <div class="row list">
      <div class="col-12 col-md-8">
        <ul v-if="!!getParkingSpaces.length" class="parking-list list-unstyled">
          <li class="item" v-for="(park, i) in getParkingSpaces" :key="i">
            <div class="parking-name font-weight-bold text-capitalize">{{park.name}}</div>
            <nuxt-link :to="`/parking/${park.id}`" class="btn btn-success parking-call">Ver más</nuxt-link>
            <div
              class="parking-type text-capitalize text-center"
            >Estacionados: {{park.vehicles.length}}</div>
          </li>
        </ul>
      </div>
      <div class="col-12 col-md-4">
        <ul v-if="!!getVehicles.length" class="vehicles-list list-unstyled">
          <li class="item position-relative" v-for="(vehicle, i) in getVehicles" :key="i">
            <div class="vehicle-icon text-capitalize">{{getIcon(vehicle.type)}}</div>
            <div class="text-capitalize vehicle-type font-weight-bold">{{vehicle.type}}</div>
            <div class="text-capitalize vehicle-owner">Dueño: {{vehicle.owner}}</div>
            <div
              class="position-absolute btn btn-danger remove-vehicle"
              @click="removeVehicle(vehicle.id)"
              title="Elimina este vehículo"
            >x</div>
            <div
              class="add-to-place position-absolute btn btn-success text-white font-weight-bold"
              title="Añadir este vehículo al estacionamiento"
              @click="addVehicleToParking(vehicle)"
            ><</div>
          </li>
          <div class="custom-modal position-fixed" :class="!selectedVehicle.id ? 'd-none' : ''">
            <div class="modal-wrapper w-50 h-75">
              <div class="modal-wrapper__head d-flex">
                <div class="close-custom btn btn-danger ml-auto" @click="selectedVehicle = {}">x</div>
              </div>
              <div class="modal-wrapper__body text-center" v-if="!!selectedVehicle.id">
                <div>
                  <h2>Añadiendo vehículo {{getIcon(selectedVehicle.type)}}</h2>
                  <small>Seleccione el estacionamiento</small>
                </div>
                <div class="container">
                  <div class="row h-100 align-items-center">
                    <div class="col-6 offset-3">
                      <div class="form-group">
                        <div class="form-group">
                          <label for="parkingPlace">Estacionamientos disponibles</label>
                          <select class="form-control" v-model="parkingPlace" id="parkingPlace">
                            <option
                              v-for="(parking, i) in getParkingSpaces"
                              :key="i"
                              :value="parking.id"
                            >{{parking.name}} ({{parking.type}})</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="modal-wrapper__footer pb-5 text-center">
                <a
                  href="#"
                  class="btn btn-success"
                  @click="parkingHere(parkingPlace, selectedVehicle)"
                >Estacionar</a>
              </div>
            </div>
          </div>
        </ul>
        <div class="text-center py-5" v-if="!!getVehicles.length === false">
          <h2>Registre nuevos vehículos</h2>
        </div>
      </div>
    </div>
    <div class="alert-block position-fixed d-flex" v-if="!!getAlerts.length">
      <div
        v-for="(alert, i) in getAlerts"
        :key="i"
        class="d-flex flex-column w-100 position-relative"
      >
        <div class="close-alert btn btn-danger position-absolute" @click="resetAlerts">x</div>
        <div class="error-type font-weight-bold text-center py-2">¡Aviso!</div>
        <div class="text-center font-weight-bold" :class="`${alert.type}-message`">{{alert.message}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  layout: "dashboard",
  data() {
    return {
      addVehicle: false,
      addVehicleToPlace: false,
      vehicleType: "motorcyle",
      vehicleOwner: "",
      parkingPlace: "",
      selectedVehicle: {}
    };
  },
  mounted() {
    this.resetAlerts();
  },
  computed: {
    ...mapGetters({
      getParkingSpaces: "parking/getParkingSpaces",
      getVehicles: "parking/getVehicles",
      getAlerts: "parking/getAlerts"
    })
  },
  methods: {
    parkingHere(parking, vehicle) {
      this.parking({ parking, vehicle });
      this.selectedVehicle = {};
    },
    newVehicle() {
      const newVehicle = {
        id: this.getVehicles.length + 1,
        type: this.vehicleType,
        icon: this.getIcon(this.vehicleType),
        owner: this.vehicleOwner
      };
      // this.vehicles.push(newVehicle);
      this.addNewVehicle(newVehicle);
    },
    ...mapActions({
      test: "parking/test",
      removeVehicle: "parking/removeVehicle",
      addNewVehicle: "parking/addNewVehicle",
      resetAlerts: "parking/resetAlerts",
      parking: "parking/parking"
    }),
    getIcon(type) {
      if (type == "motorcycle") {
        return "🛵";
      } else if (type == "sedan") {
        return "🚙";
      } else if (type == "truck") {
        return "🚜";
      }
    },
    addVehicleToParking(vehicle) {
      this.selectedVehicle = vehicle;
      this.addVehicleToPlace = !this.addVehicleToPlace;
    }
  }
};
</script>

<style>
.parking-body {
  display: grid;
  grid-gap: 2rem;
  grid-template-rows: max-content 1fr;
}
.list {
  background-color: #303030;
  margin-bottom: 2rem;
  overflow-y: auto;
}
.vehicles-list,
.parking-list {
  display: grid;
  grid-auto-rows: 100px;
  margin: 0;
}
.parking-list {
  grid-template-columns: repeat(2, 1fr);
  width: 100%;
}

.vehicles-list .item,
.parking-list .item {
  width: 95%;
  height: 85%;
  justify-self: center;
  align-self: center;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}
.vehicles-list .item {
  border: 2px solid #202020;
  grid-template-columns: 40% 1fr;
}
.parking-list .item {
  border: 2px solid #007bff;
}
.item .parking-name,
.item .parking-type {
  justify-self: center;
  align-self: center;
}
.item .parking-type {
  align-self: flex-start;
}
.item .parking-call {
  grid-row: 1 / 3;
  grid-column: 2 / 3;
  justify-self: center;
  align-self: center;
}
.item .vehicle-icon {
  grid-row: 1 / 3;
  justify-self: center;
  align-self: center;
}
.item .vehicle-type {
  justify-self: center;
  align-self: center;
}
.item .vehicle-owner {
  grid-column: 2/3;
  justify-self: center;
  align-self: start;
}
.add-vehicle {
  height: max-content;
}
.custom-modal {
  background-color: rgba(0, 0, 0, 0.8);
  height: 100vh;
  width: 100vw;
  z-index: 1000;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-wrapper {
  background-color: #202020;
  display: grid;
  grid-template-rows: max-content 1fr max-content;
}
.modal-wrapper__body {
  display: grid;
  grid-template-rows: max-content 1fr;
}
.form-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}
.remove-vehicle {
  right: 0;
  top: 0;
  transform: translate(50%, -20%);
}
.add-to-place {
  top: 50%;
  left: 0;
  transform: translate(-50%, -50%);
  font-size: 10pt;
}
.vehicle-icon {
  font-size: 25pt;
}
.alert-block {
  background-color: #303030;
  width: 250px;
  min-height: 100px;
  top: 0;
  right: 0;
  z-index: 10000;
}
.success-message,
.warning-message,
.error-message {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
}
.success-message {
  background: teal;
}
.warning-message {
  background-color: #acac09;
}
.error-message {
  background: brown;
}
.close-alert {
  top: 0;
  left: 0;
  transform: translateX(-100%);
}
@media (max-width: 991px) {
  body {
    /* background-color: #bada55; */
  }
}
</style>
