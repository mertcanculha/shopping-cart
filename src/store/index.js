import Vue from 'vue';
import Vuex from 'vuex';
import {productList} from "../assets/productData";

Vue.use(Vuex);

export const store = new Vuex.Store({
    state:{
        card:[],
        products:productList
    },
    mutations:{
        addToCard({card},product){ //ilk state sonra gelen eleman
            const itemIndex = card.findIndex(item =>item.id === product.id ); //aynı eleman var mı?
            if (itemIndex === -1){ //-1e eşitse bu eleman cartta yok.
                card.push(product);
            }else { //varsa
                card[itemIndex].count = parseInt(product.count) + parseInt(card[itemIndex].count)
            }
        }, 
        deductItemCount({card},product){ //bir eleman eksiltme
            const itemIndex = card.findIndex(item =>item.id === product.id ); //gelen elemanın indexini bulma
            card[itemIndex].count >1 ? card[itemIndex].count -- : card.splice(itemIndex,1) //kontrol
        },
        removeItem({card},product){ //eleman silinecek
            const itemIndex = card.findIndex(item =>item.id === product.id );
            card.splice(itemIndex,1)
        },
        clearAll(state){ //cardı boşaltma
            state.card = []
        }
    },
    getters:{ //kartlardaki elemanları map ile gez(toplam miktar)
        totalAmount(state){
            let amount= 0;
            state.card.map(item=>{
                amount += item.price*item.count
            });
            return amount
        }
    }
})