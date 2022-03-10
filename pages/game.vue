<template>
  <div>
    <div class="pexelry-wrapper">
      <div class="pexelry-head">
        <div>
          <h1>GameSearch</h1>
          <p>Search it, Review it</p>
        </div>
      </div>
      <div class="search-wrapper">
        <form @submit.prevent="getSearch" id="searchForm">
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
        TEST -- THIS IS GAME PAGE
      <!--vue-scroll-indicator -->
      <vue-scroll-indicator
        height="3px"
        color="#32d9cb"
        background="none"
      ></vue-scroll-indicator>
    </div>
    <div>
      <div><Game /></div>
      <div v-if="reviews.length == 0">
        <Loading />
      </div>
      <div v-else class="reviews-wrapper">
        <Reviews
          v-for="review in reviews"
          v-bind:key="review.id"
          :name="review.photographer"
          :attrib="review.photographer_url"
          :img="review.src.medium"
          :imgcap="review.src.portrait"
          :id="review.id"
        />
      </div>
    </div>

    <div class="overflow-auto">
      <b-pagination
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        aria-controls="my-table"
        align="center"
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
      reviews: [],
      search: "store",
      perPage: 10,
      currentPage: 1,
      items:[{ id: 1, first_name: 'Fred', last_name: 'Flintstone' },
          { id: 2, first_name: 'Wilma', last_name: 'Flintstone' },
          { id: 3, first_name: 'Barney', last_name: 'Rubble' },
          { id: 4, first_name: 'Fred', last_name: 'Flintstone' },
          { id: 5, first_name: 'Wilma', last_name: 'Flintstone' },
          { id: 6, first_name: 'Barney', last_name: 'Rubble' },
          { id: 7, first_name: 'Fred', last_name: 'Flintstone' },
          { id: 8, first_name: 'Wilma', last_name: 'Flintstone' },
          { id: 9, first_name: 'Barney', last_name: 'Rubble' },
          { id: 10, first_name: 'Fred', last_name: 'Flintstone' },
          { id: 11, first_name: 'Wilma', last_name: 'Flintstone' },
          { id: 12, first_name: 'Barney', last_name: 'Rubble' }],
      historyList:[], // Search history
        resultsPerPage: 5 // Results per page displayed
    };

  },
  mounted() {
        //如果本地存储的数据historyList有值，直接赋值给data中的historyList
        if (JSON.parse(localStorage.getItem("historyList"))) {
            this.historyList = JSON.parse(localStorage.getItem("historyList"));
        }
    },
  computed: {
    photoos() {
      return this.$store.state.photos;
      console.log(this.$store.state.photos);
    },
    rows() {
        return this.items.length
    }
  },
  async created() {
    //Called synchronously after the instance is created
    const headers = { Authorization: this.api_key };
    try {
      const response = await fetch(
        `https://api.pexels.com/v1/search?query=${this.search}&per_page=${this.resultsPerPage}`,
        { headers }
      );
      const data = await response.json();
      const reviews = data.photos;
      //store the returned data into the photos array
      this.reviews = reviews;
      //prevent our input search data from showing up in the input box
      this.search = "";
    } catch (error) {
      console.log(error);
    }
  },
  methods: {

    // runs only on field search
    async getSearch() {
            if (this.search != ''){
        // 没有搜索记录，把搜索值push进数组首位，存入本地
                if (!this.historyList.includes(this.search)) {
                  this.historyList.unshift(this.search);
                  localStorage.setItem("historyList", JSON.stringify(this.historyList));
                }else{
                    //有搜索记录，删除之前的旧记录，将新搜索值重新push到数组首位
                    let i =this.historyList.indexOf(this.search);
                    this.historyList.splice(i,1)
                    this.historyList.unshift(this.search);
                    localStorage.setItem("historyList", JSON.stringify(this.historyList));
                }
      }
      const headers = { Authorization: this.api_key };
      // fetch photos from the api
      try {
        const response = await fetch(
          `https://api.pexels.com/v1/search?query=${this.search}&per_page=${this.resultsPerPage}`,
          { headers }
        );
        const data = await response.json();
        const reviews = data.photos;
        this.reviews = reviews;
        this.search = "";
      } catch (error) {
        console.log(error);
      }
    },
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
  position: absolute;
  z-index: 1000;
  margin-left: 1250px;
  margin-top: 14px;
}
</style>
