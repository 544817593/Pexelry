<template>
  <div class="footer">
    <footer class="footer-distributed">
        
      <div class="footer-right">
        <p class="footer-group-members">
          <span>Group members</span>
          Member one, sxxxxxxx;
          Member one, sxxxxxxx;
          Member one, sxxxxxxx;
          Member one, sxxxxxxx;
          Member one, sxxxxxxx;
          Member one, sxxxxxxx;
        </p>

      </div>
    </footer>
  </div>
</template>

<script>
export default {};
</script>
<style scoped>
@import url(https://fonts.googleapis.com/css?family=Open+Sans:400,500,300,700);

* {
  font-family: Open Sans;
}

.footer-distributed {
  background: #666;
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.12);
  box-sizing: border-box;
  width: 100%;
  text-align: center;
  font: bold 16px sans-serif;
  padding: 55px 50px;

}

.footer-distributed .footer-right {
  display: inline-block;
  vertical-align: top;

}


/* Footer Right */

.footer-distributed .footer-group-members {
  line-height: 20px;
  color: #92999f;
  font-size: 18px;
  font-weight: normal;
  margin: 0;
}

.footer-distributed .footer-group-members span {
  display: block;
  color: #ffffff;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 20px;
}



/* If you don't want the footer to be responsive, remove these media queries */

@media (max-width: 880px) {
  .footer-distributed {
    font: bold 14px sans-serif;
  }

  .footer-distributed .footer-left,
  .footer-distributed .footer-center,
  .footer-distributed .footer-right {
    display: block;
    width: 100%;
    margin-bottom: 40px;
    text-align: center;
  }

  .footer-distributed .footer-center i {
    margin-left: 0;
  }
}
</style>



