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
          <span class="card-button"><button type="submit" class="button-show-more" @click="goToGamePage()">Show reviews</button></span>
          <!-- Bootstrap collapse -->
        </div>
        <div class="card-footer">
          <p class="download" @click="getDownload()"> Steam link &nbsp;
            <img src="../assets/link.png" alt="Steam" width="24" height="24">
          </p>
          <p class="add-review" @click="addReview()">Add review&nbsp;
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
import Swal from 'sweetalert2'
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
    gameid:{},
    lastSearch:{}
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
      // axios({
      //   url: `${this.dimage}`,
      //   method: "GET",
      //   responseType: "blob",
      // }).then((response) => {
      //   var fileUrl = window.URL.createObjectURL(new Blob([response.data]));
      //   var fileLink = document.createElement("a");
      //   fileLink.href = fileUrl;
      //   fileLink.setAttribute("download", "pexelry download.jpeg");
      //   document.body.appendChild(fileLink);
      //   fileLink.click();
      // });
      window.open('https://store.steampowered.com/app/' + this.gameid,"_black");
    },
    // add user review to db
    async addReview() {
      const { value: formValues } = await Swal.fire({
        title: 'Add review',
        html:
          'Your ID: <br> <input id="swal-input1" class="swal2-input" size="10"> <br><br>' +
          'Review: <input id="swal-input2" class="swal2-input" size="30">',
        focusConfirm: false,
        preConfirm: () => {
          return [
            document.getElementById('swal-input1').value,
            document.getElementById('swal-input2').value
          ]
        }
      })
      if (formValues) {
        const reviewName = JSON.stringify(formValues[0]);
        const reviewData = JSON.stringify(formValues[1])
        try {
          const response = fetch(
            ` http://34.125.79.200:5432/search?game_id=${this.gameid}&steam_id=${reviewName}&review=${reviewData}`
          );
          const data = await response.json();
          const success = data.success;
        } catch (error) {
          console.log(error);
        }
      }
    },
    // open page for one game
    goToGamePage(){
      this.$router.push({name:'game', params:{id:this.gameid, searchTerm:this.lastSearch}});
    }
  }
};
</script>


<style scoped>
.card {
  margin: 20px 20px;
  box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
  height: 15rem;
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
  position: relative;
}
.download {
  cursor: pointer;
  color: #333333;
  font-size: 1.1rem;
  margin-left: 0.5rem;
  margin-top:4rem;
}
.add-review{
  cursor: pointer;
  color: #333333;
  font-size: 1.1rem;
  margin-left: 0.5rem;
  margin-top:1rem;
}
.card-text{
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  word-wrap:break-word;
  text-overflow: ellipsis;
  min-height: 4rem;
}
.card-header{
  max-width: 4rem;
}
.card-footer{
  min-width: 13rem;
  min-height: 15rem;
  max-width: 13rem;
  max-height: 15rem;
}
.card-img-left{
  max-width:29rem;
  max-height:15rem;
  min-width: 29rem;
  min-height: 15rem;

}
</style>
