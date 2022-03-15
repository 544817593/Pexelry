<template>
  <div>
        <div class="histories">
          <topButtons @click="settings()">
          <img src="../assets/settings.png" alt="Settings"  width="24" height="24">
          Settings
          </topButtons>
          <p></p>

          <topButtons @click="showHistory()">
          <img src="../assets/history.png" alt="Show">
          Show history
          </topButtons>
          <p></p>

          <topButtons @click="empty()">
          <img src="../assets/trash.png" alt="Empty" width="24" height="24">
          Empty history
          </topButtons>
      </div>
    <div class="pexelry-wrapper">
      <div class="pexelry-head">
        <div>
          <h1>GameSearch</h1>
          <p>Search it, Review it</p>
        </div>
      </div>
      <div class="search-wrapper">
        <form @submit.prevent="goToHomePage" id="searchForm">
          <div class="input-group">
            <label>
              <input
                type="text"
                class="form-control"
                placeholder="Search games by review here ..."
                v-model="search"
              />
            </label>

            <span
              ><button type="submit" class="input-group-addon bg-success" id="searchButton">
                Search
              </button></span
            >
          </div>
        </form>
      </div>
    </div>
    <div>
      <!--vue-scroll-indicator -->
      <vue-scroll-indicator
        height="3px"
        color="#32d9cb"
        background="none"
      ></vue-scroll-indicator>
    </div>
    <div>
      <div><Game 
        :image="image"
        :gameName="gameName"
        :gameDescription="gameDescription"
        :link="link"
        :recentRating="recentRating"
        :recentPositives="recentPositives"
        :publishDate="publishDate"
        :publisher="publisher"
        :gameid="gameid"
      /></div>
      <div v-if="reviews.length == 0">
        <Loading />
      </div>
      <div v-else class="reviews-wrapper">
        <Reviews
          v-for="(review, index) in reviews"
          v-bind:key="review.id"
          :names="names[index]"
          :ranks="ranks[index]"
          :reviews="reviews[index]"
        />
      </div>
    </div>

    <div class="overflow-auto">
      <b-pagination
        v-model="currentPage"
        :per-page="perPage"
        :total-rows="totalRes"
        aria-controls="my-table"
        align="center"
        @input="refresh()"
        first-text="First"
      prev-text="Prev"
      next-text="Next"
      last-text="Last"
      ></b-pagination>

      <p class="mt-3">Current Page: {{ currentPage }}</p>
    </div>
  </div>
</template>

<!--Start of Tawk.to Script-->
<script type="text/javascript">
var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
(function(){
var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
s1.async=true;
s1.src='https://embed.tawk.to/62290a9da34c2456412a4944/1fto52ubr';
s1.charset='UTF-8';
s1.setAttribute('crossorigin','*');
s0.parentNode.insertBefore(s1,s0);
})();
</script>
<!--End of Tawk.to Script-->

<script>
import Swal from 'sweetalert2'
import 'animate.css';
import config from "@/config/keys.js";
const Reviews = () =>
  import(/* webpackChunkName: "Photoscomponent" */ "@/components/reviews");
const Game = () =>
  import(/* webpackChunkName: "Photoscomponent" */ "@/components/gameProfile");
const Loading = () =>
  import(/* webpackChunkName: "Loadingcomponent" */ "@/components/Loading");
export default {
  components: {
    Reviews,
    Loading,
    Game
  },
  data() {
    return {
      api_key: config.keys.api_key,
      /* returned by backend */
      image:[], // game image
      gameName:[], // game name
      gameDescription:[], // game description
      link:[], // steam link to the game
      recentRating:[], // recent rating for the game
      recentPositives:[], // recent positive rating for the game
      publishDate:[], // game's publish date
      publisher:[], // game's Publisher
      ranks:[], // list of review rank index
      names:[], // list of review user's id
      reviews: [], // game reviews
      totalRes: 0, // total number of results

      /*frontend data*/
      search: ["game"], // search term     
      perPage: 10, // results per page
      currentPage: 1, // current page number 
      gameid:0, // game's steam id
      historyList:[], // Search history

    };

  },
  mounted() {
        // 如果本地存储的数据historyList有值，直接赋值给data中的historyList
        if (JSON.parse(localStorage.getItem("historyList"))) {
            this.historyList = JSON.parse(localStorage.getItem("historyList"));
        }


    },
  computed: {
    photoos() {
      return this.$store.state.photos;
      console.log(this.$store.state.photos);
    },

  },
  async created() {
    
    console.log(this.perPage);
    
    this.gameid = this.$route.params.id;
    this.search = this.$route.params.searchTerm;
  
    //Called synchronously after the instance is created
    try {
      const response = await fetch(
        `http://34.125.79.200:5432/search?query=${this.search}&per_page=${this.perPage}&page_num=${this.currentPage}&appid=${this.gameid}`,       
      );
      const data = await response.json();

      this.image = data.img;
      this.gameName = data.game_name;
      this.gameDescription = data.game_description;
      this.link = data.steam_link;
      this.recentRating = data.recent_rating;
      this.recentPositives = data.recent_positives;
      this.publishDate = data.publish_data;
      this.publisher = data.Publisher;
      this.ranks = data.comment_rank;
      this.names = data.user;
      this.reviews = data.comment;  
      this.totalRes = data.total_num;
      
     
      this.search = "";   

    } catch (error) {
      console.log(error);
    }
  },
  methods: {
            empty(){
            localStorage.removeItem('historyList');
            this.historyList = [];
            Swal.fire({
  icon: 'success',
  title: 'Search history cleared',
})
        },

        // 弹窗历史记录
        showHistory(){
          Swal.fire({
  title: 'Search history',
  text: this.historyList,
  showClass: {
    popup: 'animate__animated animate__fadeInDown'
  },
  hideClass: {
    popup: 'animate__animated animate__fadeOutUp'
  }
})
        },

        // Change number of results per page
        async settings(){
/* inputOptions can be an object or Promise */
const inputOptions = await new Promise((resolve) => {
  setTimeout(() => {
    resolve({
      '5': '5',
      '10': '10',
      '20': '20',
      '50': '50'
    })
  }, 100)
})

const {} = Swal.fire({
  title: 'Results per page',
  input: 'radio',
  inputOptions: inputOptions,
  inputValidator: (value) => {
    if (!value) {
      return 'You need to choose something!'
    }
  }
}).then((result) => {
  if (result.value){
    this.perPage = result.value;
    localStorage.removeItem("perPage");
    localStorage.setItem("perPage", JSON.stringify(result.value));
    this.search = this.lastSearch;
    this.refresh();
  }
})

        },
            goToHomePage(){
      this.$router.push({name:'index', params:{search:this.search, historyList:this.historyList}});
    },

    async refresh(){
      this.reviews = [];
      this.search = this.$route.params.searchTerm;
            try {

      const response = await fetch(
        `http://34.125.79.200:5432/search?query=${this.search}&per_page=${this.perPage}&page_num=${this.currentPage}&appid=${this.gameid}`,       
      );
      const data = await response.json();

      this.image = data.img;
      this.gameName = data.game_name;
      this.gameDescription = data.game_description;
      this.link = data.steam_link;
      this.recentRating = data.recent_rating;
      this.recentPositives = data.recent_positives;
      this.publishDate = data.publish_data;
      this.publisher = data.Publisher;
      this.ranks = data.comment_rank;
      this.names = data.user;
      this.reviews = data.comment;  
      this.totalRes = data.total_num;
     
      this.search = "";   

    } catch (error) {
      console.log(error);
    }
    }
  },

};
</script>

<style scoped>
.pexelry-wrapper {
  width: 100%;
  height: 480px;
  background-image: url("../assets/ezgif.com-gif-maker.webp");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  padding-top: 6rem;
}
.pexelry-head {
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
}
h1 {
  font-size: 6rem;
  color: white;
}
p {
  font-size: 2.5rem;
  color: white;
}
h1,
p {
  text-align: center;
}
.search-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 0 auto;
  padding: 1.5rem 0 0 0;
}
.form-control {
  width: 500px;
}
button {
  text-align: center;
  padding: 7px 15px;
  margin-left: 0.5px;
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
  cursor: pointer;
  border: none;
  font-weight: 500;
}
button:focus {
  outline: none;
}
.reviews-wrapper {
  width: 85%;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  padding: 3rem 0;
}
.histories{
  position: fixed;
  z-index: 1000;
  margin-left: 1250px;
  margin-top: 14px;
}

topButtons{
  cursor: pointer;
}
</style>
