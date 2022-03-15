<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
    <a class="navbar-brand">
      <!-- <img src="../assets/John-Philip.jpg" width="30" height="30" class="d-inline-block align-top img-rounded" alt=""> -->
      Game Search
    </a>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav ml-auto">
        <li class="nav-item active">
          <nuxt-link to="/" class="nav-link"> Home</nuxt-link>
        </li>
        <li class="nav-item active">
          <nuxt-link to="/about" class="nav-link"> About</nuxt-link>
        </li>
      </ul>

      <!-- <div class="histories">
        <img src="../assets/settings.png" alt="Settings" @click="settings()" width="24" height="24">
        Settings<p></p>
        <img src="../assets/history.png" alt="Show" @click="showHistory()">
        Show history<p></p>
        <img src="../assets/trash.png" alt="Empty" @click="empty()" width="24" height="24">
        Empty history
      </div> -->
    </div>
  </nav>
</template>
<script>

import Swal from "sweetalert2";

export default {
  head() {
    return {
      title: "GameSearch ",
      meta: [
        {
          hid: "description",
          name: "description",
          content: "search all the amazing games",
        },
      ],
    };
  },
  methods:{
    // //清空历史搜索记录
    // empty(){
    //   localStorage.removeItem('historyList');
    //   this.historyList = [];
    //   Swal.fire({
    //     icon: 'success',
    //     title: 'Search history cleared',
    //   })
    // },

    // // 弹窗历史记录
    // showHistory(){
    //   Swal.fire({
    //     title: 'Search history',
    //     text: this.historyList,
    //     showClass: {
    //       popup: 'animate__animated animate__fadeInDown'
    //     },
    //     hideClass: {
    //       popup: 'animate__animated animate__fadeOutUp'
    //     }
    //   })
    // },

    // // Change number of results per page
    // async settings(){
    //   /* inputOptions can be an object or Promise */
    //   const inputOptions = await new Promise((resolve) => {
    //     setTimeout(() => {
    //       resolve({
    //         '10': '10',
    //         '25': '25',
    //         '50': '50'
    //       })
    //     }, 100)
    //   })

    //   const {} = Swal.fire({
    //     title: 'Results per page',
    //     input: 'radio',
    //     inputOptions: inputOptions,
    //     inputValidator: (value) => {
    //       if (!value) {
    //         return 'You need to choose something!'
    //       }
    //     }
    //   }).then((result) => {
    //     if (result.value){
    //       this.resultsPerPage = result.value;
    //       localStorage.removeItem("resultsPerPage");
    //       localStorage.setItem("resultsPerPage", JSON.stringify(result.value));
    //       this.search = this.historyList[0];
    //       document.getElementById("searchButton").click();
    //     }
    //   })

    }
  
};


</script>

<style scoped>
nuxt-link:hover {
  text-decoration: none;
}
a:hover {
  text-decoration: none;
}
.img-rounded {
  border-radius: 50%;
}

.navbar {
  z-index: 900;
}



</style>
