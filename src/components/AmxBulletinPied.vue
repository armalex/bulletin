<template> 

<div class="pied">


    <div class="premier"> 
       
         
    </div>
    
    <div class="deuxieme">
        <div>
            <div></div>
            <div class ="rubrique">SALAIRE NET </div>
            <div class ="rubrique">RESERVE FINANCIERE BRUTE </div>
            
        </div>
        <div>
            <div></div>
             <div class="rubrique alignedroite"> {{ new Intl.NumberFormat().format(salaireNet) }} €</div>
            <div class="rubrique alignedroite"> {{ new Intl.NumberFormat().format(soldeDisponibleCC) }}  €</div>
           
        </div>
    </div>
    

    <!-- <div class="deuxieme">
        <div><label > {{ parseFloat(salaireBrut).toFixed(2) }}</label></div>
        <div><label > {{ parseFloat(salaireNet).toFixed(2) }}</label></div>
        <div><label > {{ parseFloat(salaireNet).toFixed(2) }}</label></div>
    </div> -->
        
    
  
    
</div>


</template>

<script setup lang="ts">

import { computed } from 'vue'
import { useBulletin } from '../composables/useBulletin.ts'

const {
  salaireNet,
  estimationCA,
  fraisCadreho,
  totalSalaireCharge,
  reserveFinanciere
} = useBulletin()

const soldeDisponibleCC = computed(() => estimationCA.value - fraisCadreho.value - totalSalaireCharge.value - reserveFinanciere.value)

   
   


</script>


<style scoped>

.pied {
    display: grid;
    grid-template-rows: 100px; 
    grid-template-columns: 50% 50%;
    grid-gap: 5px; 
    margin-top : 1px;
    padding: 0px;
    /* background-color: rgb(220, 229, 226);  */
    height: 80%;
    width: 99%;
    font-size: x-small;
}

.premier {
    display : grid;
    /* flex-basis: 400px; */
    /* grid-template-columns: 60% 30% 10%;
    grid-template-rows: 25%  auto auto;  */
    padding : 10px;
    background-color: #c6d9f0;
    border : solid 2px white;
    width: 100%;
    height : 90%;
    margin: 5px;
}

.deuxieme {
    display : grid;
    /* grid-template-columns: 1fr 1fr 1fr; */
    grid-template-columns: 60% 30% 10%;
    /* grid-template-rows: 25%  auto auto;  */
     /* grid-template-rows: 25% 100px auto; */
    background-color: #c6d9f0;
    border : solid 2px white;
    padding : 10px;
    margin: 5px;
    /* margin-bottom: 5px; */
}

.troisieme {
    background-color: rgb(164, 183, 208);
    border : solid 2px white;
    margin-bottom: 5px;
}


input[type=text] {
  width: 100%;
  padding: 5px 5px;
  margin: 0px 0px 0px 1px;
  box-sizing: border-box;
  border: 0px solid red; 
  border-radius: 4px;
}

label {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: medium;
    font-weight: 500;
}
.rubrique {
    display : flex;
    font-family: "oswald ", sans-serif;
    font-size: 12px;
    font-weight: 600;
    color : rgb(20, 20, 22);
    margin-bottom: 5px; 
}

.alignedroite {
    justify-content: right;
    align-items: right;
}

</style>