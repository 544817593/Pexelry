<!-- Some component.vue -->
<template>
<div>
    
  <vue-simple-suggest
    v-model="chosen"
    display-attribute="name"
    value-attribute="url"
    :list="getSuggestionList"
  ></vue-simple-suggest>

  <br>

  <p>Chosen element: {{ chosen }}</p>
          <form @submit.prevent="getSearch" id="searchForm">
          <div class="input-group">
            <label>
              <input
                type="text"
                class="form-control"
                placeholder="Search games by review here ..."
                v-model="chosen"
              />
            </label>

            <span
              ><button type="submit" class="input-group-addon bg-success" id="searchButton">
                Search
              </button></span>
          </div>

        </form>
</div>
</template>

<script>
  import VueSimpleSuggest from 'vue-simple-suggest'
  import 'vue-simple-suggest/dist/styles.css' // Optional CSS

  export default {
    components: {
      VueSimpleSuggest
    },
    data() {
      return {
        chosen: '',
      }
    },
    methods: {
      // Function returning a promise as a factory for suggestion lists.
      //
      // vue-simple-suggest calls it automatically when an update to the list is needed,
      // no need for watchers here!
      async getSuggestionList() {
            const response = await fetch(`http://34.125.79.200:5432/search?query=${this.chosen}`, { method: 'GET' });
          const data = await response.json();
          console.log(data.suggested_phrases);
         /*
          returns a promise with a list of star-wars characters
        */
      }
    }
  }
</script>