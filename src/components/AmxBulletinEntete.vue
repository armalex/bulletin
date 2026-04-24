<template>

   <div class="entete">
    <div class="premier"> 
        <div>  <h4>Salaire brut-Prime apporteur      </h4> <h4>  {{ new Intl.NumberFormat().format(salaireBrut)  }} € - {{  new Intl.NumberFormat().format(primeApporteur) }} €</h4></div>
        <div>  <h4>Charges patronales </h4> <h4>{{ new Intl.NumberFormat().format(totalChargesPatronales) }} €</h4></div>
        <div>  <h4>Charges salariales  </h4> <h4>  {{ new Intl.NumberFormat().format(totalChargesSalariales) }} €</h4></div> 
        <div>  <h4>Salaire net   </h4><h4></h4>{{ new Intl.NumberFormat().format(salaireNet) }} €</div>
    </div>
         
    <div class="premier">
        <div>  <h4>Total salaire+charges   </h4> <h4>  {{ new Intl.NumberFormat().format(totalSalaireCharge)  }} € </h4></div>
        <div> <h4>Chiffre d'Affaires   </h4> <h4>  {{ new Intl.NumberFormat().format(estimationCA) }} €</h4></div>
        <div> <h4>Frais Cadreho </h4> <h4>{{ new Intl.NumberFormat().format(fraisCadreho) }} €</h4></div>
        <div> <h4>Chiffre d'Affaires net  </h4> <h4>  {{new Intl.NumberFormat().format(chiffreAffaireNet) }} €</h4></div>
   </div>
     
    <div class="premier">
        <div> <h4 class="tooltip">Solde disponible <span class="tooltiptext">Chiffre d'affaire net - Total salaire+charges</span> </h4> <h4>  {{ soldeDisponible.toFixed(2) }} €</h4></div>
        <div> <h4>Provision pour charges </h4> <h4>  {{ new Intl.NumberFormat().format(reserveFinanciere) }} €</h4></div>
        <div> <h4>Solde disp charges comprises  </h4> <h4>  {{ new Intl.NumberFormat().format(soldeDisponibleCC) }} €</h4></div>
        <div> <h4>Frais professionnels  </h4> <h4>  {{new Intl.NumberFormat().format(fraisProfessionnels) }} €</h4></div>
    </div>
        

    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useBulletin } from '../composables/useBulletin.ts'

const {
  salaireBrut,
  totalChargesPatronales,
  totalChargesSalariales,
  salaireNet,
  totalSalaireCharge,
  estimationCA,
  fraisCadreho,
  reserveFinanciere,
  notesDeFrais,
  primeApporteur
} = useBulletin()

const fraisProfessionnels = 0.0;
const chiffreAffaireNet = computed(() => estimationCA.value - fraisCadreho.value);
const soldeDisponible = computed(() => estimationCA.value - totalSalaireCharge.value);
const soldeDisponibleCC = computed(() => estimationCA.value - fraisCadreho.value - totalSalaireCharge.value - reserveFinanciere.value);

</script>



<style scoped>

/* @font-face {
    font-family:"oswald";
    src : url(./assets/Oswald-Variable_wght.ttf)
} */

.tooltip {
position: relative;
display: inline-block;
/* font-size: 0.9rem; */
border-bottom: 1px dotted black;
}

.tooltip .tooltiptext {
visibility: hidden;
width: 120px;
font-size: 0.8rem; 
background-color: #5a35c3;
color: #fff;
text-align: center;
border-radius: 6px;
padding: 5px 0;
position: absolute;
z-index: 1;
bottom: 125%;
left: 50%;
margin-left: -60px;
}

.tooltip:hover .tooltiptext {
visibility: visible;
}

.entete {
    display: grid;
    grid-template-rows: 100px; 
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 5px; 
    background-color: #c6d9f0;
    height: 120px;
    /* width: 80%; */
}

.premier {
    display : flex;
    flex-direction: column;
    font-family: "Oswald", sans-serif;
    justify-content: center;
    font-size: 0.5rem;
    padding : 0px;
    border : solid 2px white;
    margin-bottom: 5px; 
}


.premier>div {
    display : flex;
    flex-direction: row;
    justify-content: space-between;
    font-size: 0.7rem;
    margin : 2px;
    border : solid 0px white;
   
}

.premier>h4 {
    font-size: 0.9rem;
    font-weight: 800;
}

.deuxieme {
    background-color: rgb(164, 183, 208);
    border : solid 2px white;
    margin-bottom: 5px;
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

</style>