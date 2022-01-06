<template>
  <div id="products">
    <h2>Products</h2>
    <div class="notification" v-for="(info, key) in infos" :key="key"> 
      {{ info }} <!--her eklenan eleman için info -->
    </div> <!--elemanları gösterme -->
    <table :class="{ products: products.length !== 0 }"> <!--eleman varsa-->
      <tr> <!--sütunlar -->
        <th>Product Name</th>
        <th>Price</th>
        <th>Buy</th> 
      </tr>
      <tr v-for="product in products" :key="product.id"> <!--dönecek elemanlar-->
        <td>{{ product.name }}</td>
        <td>{{ product.price }}</td>
        <td>
          <label> <!--getelementbyıd için dinamikid verdik -->
            <input type="number" :id="product.id" value="0" /> <!--alınan ürün adeti, id döngü -->
          </label>
        </td>
        <td>
          <button @click="addToCard(product)">Add to card</button> <!--carta ürün ekleme butonu -->
        </td>
      </tr>
    </table>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      infos: [],
    };
  },
  computed: {
    ...mapState(['products']),  
  },
  methods: {
    addToCard(product) { 
      if (document.getElementById(product.id).value > 1) { //dinamik olarak verilen id ile kontrol
        const count = document.getElementById(product.id).value;  //bu değişken carda gidecek
        product = { ...product, count };
        this.$store.commit("addToCard", product);
        const info = product.name + "  added to card"; //yeni bildiri
        this.infos.push(info);
        setTimeout(() => {
          document.getElementById(product.id).value = 0; //inputu boşaltmak
          this.infos.splice(this.infos.indexOf(info), 1); 
        }, 3000);
      } else { //input değeri 0 veya string ise
        const info = "please enter a valid input";
        this.infos.push(info);
        setTimeout(() => {
          document.getElementById(product.id).value = 0;
          this.infos.splice(this.infos.indexOf(info), 1);
        }, 3000);
      }
    },
  },
};
</script>

<style>
#products {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.products {
  border: 1px solid #ddd;
  margin: auto;
}
.products td,
th {
  border: 1px solid #ddd;
  padding: 10px;
}
.notification {
  background-color: #ddd;
  padding: 20px;
  width: 400px;
  margin-bottom: 20px;
  border-radius: 25px;
  font-size: 24px;
}
button {
  border: none;
  cursor: pointer;
  padding: 5px 10px;
}
</style>