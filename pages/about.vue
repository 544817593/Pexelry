<template>
  <div>
    <div class="about-section">
      <div>
        <h2>About GameSearch</h2>
        <p>more about us</p>
      </div>
      <div>
        <vue-scroll-indicator
          height="4px"
          color="#32d9cb"
          background="none"
        ></vue-scroll-indicator>
      </div>
    </div>
    <div class="pexelry-about">
      <h3>GameSearch</h3>
      <p>
        This project uses Google Cloud virtual machine as the server. Python3 was used as the programming language and the IDE used was jupyter-notebook on the cloud server. NLTK was mainly used for language processing and pymongo is used to communicate with the database, except for common libraries. Furthermore, we have selected mongoDB as the database, which is between relational database and non-relational database, and all data for this project (including dataset, index etc.) are stored in it.
      </p>
      <p>
        <br /><span>Dataset</span><br />

        The dataset used in this project was the Steam Reviews Dataset pushlished on Kaggle. This dataset is created by the crawler tool provided by Steam, which collected more than 15 million game reviews from more than 8000 games, it contains numbers of attributes such as the game (app) id, game reviews, vote-ups etc. that totals up to a total volume of more than 5GB. Our project uses this dataset as a resource to establish a search for games and their corresponding reviews. We have processed the dataset from csv format to database's collection to perform saving and other operations.
        In addition, to visually enrich our search result, we have also added more than 1GB sized of game images and their corresponding descriptions to display along with search results.

        <br /><span>Language preprocessing</span><br />
        This project processes English tokens, and the corpora are segmented by non English characters, processed using stop words and stem function provided by NLTK.

        <br /><span>Search and retrieval</span><br />
        This project was influenced by existing film review websites such as Rotten Tomatoes, to search games and its reviews based on the Steam Reviews Dataset. When the user enters a query in the search box and click on the search button, the retrieval ranking results of relevant games will be displayed first. These results are based on 15 million game reviews. If the user decides to click on the button to enter the game page, reviews search results of this game based on the query will be displayed.

        <br /><span>Query Recommendation</span><br />
        The query recommendation of this project is realized by historical queries. When a user searches for a query on the web page, the query will be recorded in the database, which will also store the historical search times of this query.

        <br /><span>Query Expansion</span><br />
        This project uses the principle of PRF to realize query expansion with historical search results. When a user retrieves the game reviews, the first review in the returned review list is considered to be the most relevant review to the current query. The words that appear most in this review will be associated with the words in this query in the QE database. When the word frequency exceeds 3, and the same word in this query is met again in the game retrieval, QE will be used.

        <br /><span>Dynamic Reviews</span><br />
        This project supports users to enter new reviews on games. After entering reviews, the database will be updated so that new reviews can be searched.
      </p>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style scoped>
.about-section {
  background-image: url("../assets/ezgif.com-gif-maker.webp");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  height: 400px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}
h2 {
  font-weight: bold;
  font-size: 4.5rem;
  color: white;
}
p {
  font-size: 2.5rem;
  color: white;
}
.pexelry-about {
  max-width: 48rem;
  padding-top: 3rem;
  margin: 0 auto;
}
.pexelry-about h1 {
  text-align: center;
}
.pexelry-about p {
  font-size: 20px;
  color: black;
}
span {
  font-weight: bold;
  display: flex;
  justify-content: center;
  text-align: center;
  padding-top: 2rem;
}
</style>
