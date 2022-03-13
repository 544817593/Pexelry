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
              </button></span>
          </div>

        </form>

      </div>


    </div>
    <div>

    <div>
      <!--vue-scroll-indicator -->
      <vue-scroll-indicator
        height="3px"
        color="#32d9cb"
        background="none"
      ></vue-scroll-indicator>
    </div>


      <div class="photos-wrapper">
        <Photos
          v-for="(photo, index) in images"
          v-bind:key="photo.id"
          :name="names[index]"
          :attrib="names[index]"
          :img="photo"
          :gameid="ids[index]"
          :ovv = "ovv[index]"
          :links = "links[index]"
          :ranks = "ranks[index]"
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
        @input="changePage()"
        first-text="First"
      prev-text="Prev"
      next-text="Next"
      last-text="Last"
      size="lg"
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

const Photos = () =>
  import(/* webpackChunkName: "Photoscomponent" */ "@/components/photos");
const Loading = () =>
  import(/* webpackChunkName: "Loadingcomponent" */ "@/components/Loading");

export default {
  components: {
    Photos,
    Loading,
  },
  data() {
    return {
      api_key: config.keys.api_key,
      images: [],
      search: "game",
      perPage: 10,
      currentPage: 1,
      ranks:[],
      names:[],
      ovv:[],
      links:[],
      ids:[],
      // items:[{ id: 1, first_name: 'Fred', last_name: 'Flintstone' },
      //     { id: 2, first_name: 'Wilma', last_name: 'Flintstone' },
      //     { id: 3, first_name: 'Barney', last_name: 'Rubble' },
      //     { id: 4, first_name: 'Fred', last_name: 'Flintstone' },
      //     { id: 5, first_name: 'Wilma', last_name: 'Flintstone' },
      //     { id: 6, first_name: 'Barney', last_name: 'Rubble' },
      //     { id: 7, first_name: 'Fred', last_name: 'Flintstone' },
      //     { id: 8, first_name: 'Wilma', last_name: 'Flintstone' },
      //     { id: 9, first_name: 'Barney', last_name: 'Rubble' },
      //     { id: 10, first_name: 'Fred', last_name: 'Flintstone' },
      //     { id: 11, first_name: 'Wilma', last_name: 'Flintstone' },
      //     { id: 12, first_name: 'Barney', last_name: 'Rubble' }],
        historyList: [], // Search history
        totalRes: 0,
        lastSearch: "game" // Most recent search
    };

  },
      mounted() {
        //如果本地存储的数据historyList有值，直接赋值给data中的historyList
        if (JSON.parse(localStorage.getItem("historyList"))) {
            this.historyList = JSON.parse(localStorage.getItem("historyList"));
        }
        // for results per page
        if (JSON.parse(localStorage.getItem("resultsPerPage"))) {
            this.resultsPerPage = JSON.parse(localStorage.getItem("resultsPerPage"));
        }
    },

  async created() {
    //Called synchronously after the instance is created

    try {
      const response = await fetch(
        ` http://34.125.79.200:5432/search?query=${this.search}&per_page=${this.perPage}&page_num=${this.currentPage}`
      );
      const data = await response.json();
      const images = data.img;
      const ranks = data.search_rank;
      const ovv = data.game_description;
      const links = data.steam_link;
      const names = data.game_name;
      const ids = data.appids;
      const totalRes = data.total_num;
      //store the returned data into the photos array
      this.images = images;
      this.ranks = ranks;
      this.ovv = ovv;
      this.links = links;
      this.names = names;
      this.ids = ids;
      //prevent our input search data from showing up in the input box
      this.search = "";
      this.totalRes = totalRes;

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

      this.lastSearch = this.search;


      const headers = { Authorization: this.api_key };
      // fetch photos from the api

        try {
          
          const response = await fetch(
            ` http://34.125.79.200:5432/search?query=${this.search}&per_page=${this.perPage}&page_num=${this.currentPage}`
          );
          const data = await response.json();
          const images = data.img;
          const ranks = data.search_rank;
          const ovv = data.game_description;
          const links = data.steam_link;
          const names = data.game_name;
          const ids = data.appids;
          const totalRes = data.total_num;
          //store the returned data into the photos array
          this.images = images;
          this.ranks = ranks;
          this.ovv = ovv;
          this.links = links;
          this.names = names;
          this.ids = ids;
          //prevent our input search data from showing up in the input box
          this.search = "";
          this.totalRes = totalRes;

        } catch (error) {
          console.log(error);
        }
    },
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
    this.getSearch();
  }
})

        },

  async changePage(){
    this.search = this.lastSearch;
      const headers = { Authorization: this.api_key };
      // fetch photos from the api

        try {
          
          const response = await fetch(
            ` http://34.125.79.200:5432/search?query=${this.search}&per_page=${this.perPage}&page_num=${this.currentPage}`
          );
          const data = await response.json();
          const images = data.img;
          const ranks = data.search_rank;
          const ovv = data.game_description;
          const links = data.steam_link;
          const names = data.game_name;
          const ids = data.appids;
          const totalRes = data.total_num;
          //store the returned data into the photos array
          this.images = images;
          this.ranks = ranks;
          this.ovv = ovv;
          this.links = links;
          this.names = names;
          this.ids = ids;
          //prevent our input search data from showing up in the input box
          this.search = "";
          this.totalRes = totalRes;

        } catch (error) {
          console.log(error);
        }
    
  }


  },
}


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
.photos-wrapper {
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
