<template>

  <div class = "container">
    <div class = "row">
      <div class="card">
        <div class = "card-header">No.{{id}}</div>

        <div class="card-body">
          <h5 class="card-subtitle"> User </h5>
          <p class="card-text">review review review review review review review review review review review review review review review review review review review review review review review review review review review review
              review review review review review review review review review review review review review review review review review review review review review review review review review review review review
              review review review review review review review review review review review review review review
          </p>
        </div>
      </div>
    </div>
  </div>



  


  <!--
  <div class="card" style="width: 50rem">

    <img
      class="card-img-left"
      :src="img"
      :alt="attrib"
      style="height: 20rem; width: 25rem"
      height="320"
    />
    <div class="card-body-left">
      <span>
        <img
          class="img-rounded img-responsive"
          width="40"
          height="40"
          :src="imgcap"
          :alt="attrib"
        /></span>

      <p class="card-text">{{ name }}</p>
      <p class="download" @click="getDownload()">
        <font-awesome-icon :icon="['fas', 'download']" />
      </p>
    </div>
  </div>-->
</template>


<script>


import lozad from "lozad";
const axios = require("axios");
export default {
  name: "Reviews",
  props:{
    img:{},
    name:{},
    attrib:{},
    imgcap:{},
    id:{},
    gameid:{}
  },
  data() {
    return {
      loading: true,
      // dimage = download image
      dimage: this.$props.img,
    };
  }
};


</script>
<style scoped>
.card {
  margin: 20px 20px;
  box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
  height: 10rem;
  flex-direction: row;
  width: 100%;
}

.img-rounded {
  border-radius: 50%;
  width: 2.5rem;
  height: 2.5rem;
  padding: 0;
  margin: 0;
}
p {
  display: inline-block;
  padding-left: 25px;
}

.card-subtitle{
  padding-bottom: 15px;
}


 .card-text{
 display: -webkit-box;
   -webkit-box-orient: vertical;
   -webkit-line-clamp: 4;
   word-wrap:break-word;
   overflow: hidden;
 }

img{
  width:29rem;
  height:13rem;}


</style>
