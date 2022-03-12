<template>

  <div class = "container">
    <div class = "row">
      <div class="card">
        <div class = "card-header">No.{{ranks}}</div>
        <img
          class="card-img-left"
          :src="img"
          :alt="attrib"
        />

        <div class="card-body">
          <h4 class="card-title">{{name}}</h4>
          <h5 class="card-subtitle"> Description </h5>

          <p class="card-text">{{ovv}}</p>
          <span class="card-button"><button type="submit" class="button-show-more" @click="goToGamePage()">Show more</button></span>
          <!-- Bootstrap collapse -->
        </div>
        <div class="card-footer">
          <p> Steam link</p>
          <p class="download" @click="getDownload()">
            <img src="../assets/link.png" alt="Steam" width="24" height="24">
          </p>
          <br>
          <p>Add review</p>
          <p class="add-review" @click="addReview()">
            <img src="../assets/review.png" alt="Review" width="24" height="24">
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
  name: "Photos",
  props:{
    ranks:{},
    img:{},
    name:{},
    ovv:{},
    links:{},
    attrib:{},
    imgcap:{},
    gameid:{}
  },
  data() {
    return {
      loading: true,
      // dimage = download image
      dimage: this.$props.img,
    };
  },
  methods: {
    // download image
    getDownload() {
      axios({
        url: `${this.dimage}`,
        method: "GET",
        responseType: "blob",
      }).then((response) => {
        var fileUrl = window.URL.createObjectURL(new Blob([response.data]));
        var fileLink = document.createElement("a");
        fileLink.href = fileUrl;

        fileLink.setAttribute("download", "pexelry download.jpeg");
        document.body.appendChild(fileLink);
        fileLink.click();
      });
    },

    // go to shop link
    getLink() {

    },

    // add user review to db
    addReview() {

    },


    // open page for one game
    goToGamePage(){
      this.$router.push({name:'game', params:{id:this.gameid}});
    }
  }
};


</script>


<style scoped>
.card {
  margin: 20px 20px;
  box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
  height: 13rem;
  flex-direction: row;
  width: 100%;
}

p {
  display: inline-block;
  padding-left: 25px;
}

.card-title{
  padding-bottom: 10px;
}

.card-subtitle{
  padding-bottom: 15px;
}

.card-button{
  text-align: center;
  cursor: pointer;
  font-weight: 500;
  padding-left: 25px;
}

.button-show-more{
  width: 120px;
}


.download {
  cursor: pointer;
  color: #333333;
  font-size: 1.1rem;
  padding-left: 2.5rem;
}

 .card-text{
 display: -webkit-box;
   -webkit-box-orient: vertical;
   -webkit-line-clamp: 3;
   word-wrap:break-word;
   overflow: hidden;
 }

.card-img-left{
  width:29rem;
  height:13rem;}


</style>
