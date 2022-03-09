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
        <form @submit.prevent="getSearch">
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
              ><button type="submit" class="input-group-addon bg-success">
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

<script>
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
          { id: 12, first_name: 'Barney', last_name: 'Rubble' }]
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
        `https://api.pexels.com/v1/search?query=${this.search}&per_page=10`,
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
      const headers = { Authorization: this.api_key };
      // fetch photos from the api
      try {
        const response = await fetch(
          `https://api.pexels.com/v1/search?query=${this.search}&per_page=10`,
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
.error {
  padding: 4rem 0;
}
.error p {
  font-size: 24px;
}
</style>
