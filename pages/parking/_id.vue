<template>
  <div class="detail-parking-wrapper">
    <h1 class="detail-parking__title pt-5 text-uppercase">{{getCurrentParking[0].name}}</h1>
    <div class="detail-parking__image">
      <!-- <img src class="img-fluid" alt> -->
      <h2>Imagenes del estacionamiento</h2>
      <!-- {{getCurrentParking}} -->
    </div>
    <div class="detail-parking__featured h-100 w-100 justify-content-center align-items-center">
      <div class="detail-parking__type">
        <h2>
          Estacionamiento tipo:
          <span class="detail-parking__type-pill">{{getCurrentParking[0].type}}</span>
        </h2>
      </div>
      <div class="detail-parking__vehicles">
        <h2 v-if="!!getCurrentParking[0].vehicles.length">Vehiculos Estacionados:</h2>
        <h2 v-else class="detail-parking-enabled">Estacionamiento Libre</h2>
        <div v-for="(vehicle, i) in getCurrentParking[0].vehicles" :key="i" class="vehicle">
          <div class="detail-parking__vehicles-icon">{{vehicle.icon}}</div>
          <div class="detail-parking__vehicles-type text-capitalize">{{vehicle.type}}</div>
          <div class="detail-parking__vehicles-owner text-capitalize">Dueño: {{vehicle.owner}}</div>
        </div>
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
      parkingId: this.$route.params.id
    };
  },
  computed: {
    ...mapGetters({
      getParkingSpaces: "parking/getParkingSpaces",
      getCurrentParking: "parking/getCurrentParking"
    })
  },
  methods: {}
};
</script>
<style>
.detail-parking-wrapper {
  height: calc(100% - 20px);
  display: grid;
  grid-template-rows: max-content 1fr;
  grid-template-columns: repeat(2, 1fr);
}
.detail-parking__title,
.detail-parking__image,
.detail-parking__featured {
  justify-self: center;
  align-self: center;
}
.detail-parking__title {
  grid-column: 1 / 3;
}
.detail-parking__featured {
  display: grid;
  grid-template-rows: max-content 1fr;
  /* background: #bada55; */
}
.detail-parking__type {
  padding: 2rem;
}
.detail-parking__vehicles {
  justify-self: center;
  background: #303030;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.detail-parking__type-pill {
  background-color: #42b883;
  color: white;
  padding: 1rem;
}
.vehicle {
  border: 2px solid #202020;
  min-height: 100px;
  width: 90%;
  display: grid;
  grid-template-columns: 30% 1fr;
  grid-template-rows: repeat(2, 1fr);
}
.detail-parking__vehicles-icon,
.detail-parking__vehicles-type,
.detail-parking__vehicles-owner {
  justify-self: center;
  align-self: center;
}
.detail-parking__vehicles-icon {
  grid-row: 1 /3;
  font-size: 20pt;
}
.detail-parking__vehicles-type {
  font-size: 14pt;
}
.detail-parking__vehicles-owner {
}
</style>

