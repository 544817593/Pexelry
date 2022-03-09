<template>
  <div class = "container">
    <div class = "row">
      <div class="card">
        <img
          class="card-img-left card-img-left-gameProfile"
          :src="img"
          :alt="attrib"
        />

        <div class="card-body">
          <h4 class="card-title">Game title</h4>
          <h5 class="card-subtitle"> Description </h5>
          <p class="card-text">description description description description description description description description</p>
          <h6 class="card-otherinfo">Other information</h6>
          <p class="card-otherinfotext">Recent rating: Very Negative
              <br>Recent posivies: 1% of the 29,180 user reviews in the last 30 days are positive.
              <br>Date published: 21 Dec, 2017
              <br>Publisher: 24 Entertainment</p>
          <!-- Bootstrap collapse -->
        </div>
        <div class="card-footer">
          <p> Steam link</p>
          <p class="download" @click="getDownload()">
            <font-awesome-icon :icon="['fas', 'link']" />
          </p>
          <br>
          <p>Add review</p>
          <p class="add-review" @click="addReview()">
            <font-awesome-icon :icon="['fas', 'pen']" />
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const axios = require("axios");
export default {
  name: "Photos",
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

    // add review to db
    addReview() {

    }
  }
};
</script>
  
<style>
.card {
  margin: 20px 20px;
  box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
  height: 20rem;
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

.card-img-left-gameProfile{
  margin-top: 50px;
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

.link {
  cursor: pointer;
  color: #333333;
  font-size: 1.1rem;
  padding-left: 2.5rem;
}
.card-content{
  flec-basis: auto;
}
 .card-text{
 display: -webkit-box;
   -webkit-box-orient: vertical;
   -webkit-line-clamp: 3;
   word-wrap:break-word;
   overflow: hidden;
 }

img{
  width:29rem;
  height:13rem;}


</style>