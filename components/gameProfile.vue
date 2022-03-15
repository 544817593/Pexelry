<template>
  <div class = "container">
    <div class = "row">
      <div class="card">
        <img
          class="card-img-left card-img-left-gameProfile"
          :src="image"
          :alt="attrib"
        />

        <div class="card-body">
          <h4 class="card-title">{{gameName}}</h4>
          <h5 class="card-subtitle"> Description </h5>
          <p class="card-text">{{gameDescription}}</p>
          <h6 class="card-otherinfo">Other information</h6>
          <p class="card-otherinfotext">Recent rating: {{recentRating}}
              <br>Recent posivies: {{recentPositives}}
              <br>Date published: {{publishDate}}
              <br>Publisher: {{publisher}}</p>
          <!-- Bootstrap collapse -->
        </div>
        <!-- <div class="card-footer">
          <p> Steam link</p>
          <p class="download" @click="getDownload()">
            <font-awesome-icon :icon="['fas', 'link']" />
          </p>
          <br>
          <p>Add review</p>
          <p class="add-review" @click="addReview()">
            <font-awesome-icon :icon="['fas', 'pen']" />
          </p>
        </div> -->
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
</template>

<script>
import Swal from 'sweetalert2'
const axios = require("axios");
export default {
  name: "Game",
  props:{
          /* returned by backend */
      image:{}, // game image
      gameName:{}, // game name
      gameDescription:{}, // game description
      link:{}, // steam link to the game
      recentRating:{}, // recent rating for the game
      recentPositives:{}, // recent positive rating for the game
      publishDate:{}, // game's publish date
      publisher:{}, // game's Publisher
      gameid:{} // game's steam id
  },
  data() {
    return {
      loading: true,
      // dimage = download image
      dimage: this.$props.image,
    };
  },
  methods: {
    // download image
    getDownload() {
      window.open(this.link,"_black");
    },

    // add review to db
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


.card-footer{
  min-width: 13rem;
  min-height: 20rem;
  max-width: 13rem;
  max-height: 20rem;
}


.card-img-left{
  max-width:29rem;
  max-height:15rem;
  min-width: 29rem;
  min-height: 15rem;
  
  }

</style>