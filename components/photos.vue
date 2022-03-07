<template>

  <div class = "container">
    <div class = "row">
      <div class="card">

        <img
          class="card-img-left"
          :src="img"
          :alt="attrib"
        />
        <div class="card-body">
          <h4 class="card-title">John Doe</h4>
          <h5 class="card-subtitle"> Overview </h5>

          <p class="card-text">Some example text some example text. John Doe is an architect and engineerSome example text some example text. John Doe is an architect and engineerSome example text some example text.
            John Doe is an architect and engineerSome example text some example text. John Doe is an architect and engineerSome example text some example text. John Doe is an architect and engineerSome example text some example text.
            John Doe is an architect and engineerSome example text some example text. John Doe is an architect and engineerSome example text some example text. John Doe is an architect and engineer</p>

        </div>
        <div class="card-footer">
          <p> Steam link</p>
          <p class="download" @click="getDownload()">
            <font-awesome-icon :icon="['fas', 'link']" />
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
  props: ["img", "name", "attrib", "imgcap", "id"],
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

    }
  },
};


</script>
<style scoped>
.card {
  margin: 50px 20px;
  box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
  height: 15rem;
}

.card {
  flex-direction: row;
}
.card{
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
  width:12.5rem;
  height:10rem;}


</style>
