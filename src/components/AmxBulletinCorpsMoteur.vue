<template> 

<div class="controlesaisie">
    <div class="logoAmx">
        <img src="../assets/Amx-logo-transparent-border.png"></img>
    </div>
    <div class= "intitule">
        Salaire brut
    </div>
    <div  class= "intitule">
     <AmxSlider
        label="Salaire brut de base"
        :min="2000"
        :max="10000"
        :step="50"
        :labelSlider="0"
        :texteSlider1="0"
        :textesSlider2="0"
        :secondLabel="0"
        v-model="salaireBrutDeBaseModel"
     />
    </div>
    <div class= "intitule">
    Frais de gestion : {{ (fraisGestionCadreho*100).toFixed(1) }} % 
    </div>
    
</div>


<div class="bulletin">
    <div class="colonnesalariale">
                <div class="child-salariale engras">Libellé</div>
                <div class="child-salariale engras">Nombre</div>
                <div class="child-salariale engras">Base</div>
                <div class="child-salariale engras">Taux salarial</div>
                <div class="child-salariale engras">Montant salarial</div>
            </div>
            <div class="colonnepatronale">
                <div class="child-salariale engras">Taux patronal</div>
                <div class="child-salariale engras">Montant patronal</div>
            </div>
</div>

<!-- Affichage des infos de revenu -->

<div v-for="(intitule) in revenuEtInfos" class="bulletin"> 

    <div class="corpssalarial">
          
            <div  class="colonnesalariale">
                <div class="child-salariale agauche" :class="{doneBlack : intitule.LIBELLE}">{{intitule.LIBELLE}}</div>
                <div class="child-salariale doneBlack">{{intitule.NOMBRE  }}</div>
                <div class="child-salariale doneBlack">{{intitule.BASE ==0 ? "-": intitule.BASE }}</div>
                <div class="child-salariale doneBlack">{{intitule.TAUXSALARIAL== 0 ? "-" : intitule.TAUXSALARIAL }}</div>
                <div class="child-salariale">
                    {{intitule.MONTANTSALARIAL==0 ?"-":intitule.MONTANTSALARIAL }} 
                </div>
            </div>
      </div>

    <div class="corpspatronale">
            
            <div class="colonnepatronale">
                <!-- <div class="child-salariale">{{intitule.PATRONALE=="0.0"? "":intitule.PATRONALE}}</div> -->
                <div class="child-salariale">{{intitule.PATRONALE==0 ? "-":intitule.PATRONALE}}</div>
                <div class="child-salariale">
                    {{  intitule.MONTANTPATRONAL==0 ? "-":intitule.MONTANTPATRONAL}}  
                </div>
            </div>
      
    </div>
  
</div>


<!-- Affichage des infos de charges salariales et patraonales  -->
<!-- non conseillé v-if et v-for sur la meme ligne -->
<div v-for="(intitule) in revenuCharges" class="bulletin"> 

    <div class="corpssalarial">
          
            <div  class="colonnesalariale">
                <div class="child-salariale agauche" 
                    :class="{bkgdmajoration: intitule.CATEGORIE==6 || intitule.CATEGORIE==7 ,doneRed : getStyleRed(intitule), doneBlue : getStyleBlue(intitule),doneGreen : getStyleGreen(intitule) }"
                    >{{intitule.LIBELLE}}</div>
                <div class="child-salariale" :class="{ bkgdmajoration: intitule.CATEGORIE==6 || intitule.CATEGORIE==7}"></div>
                <div class="child-salariale doneBlack"
                    :class="{ bkgdmajoration: intitule.CATEGORIE==6 || intitule.CATEGORIE==7  }">{{intitule.BASE  }}</div>
                <div class="child-salariale doneBlack"
                    :class="{ bkgdmajoration: intitule.CATEGORIE==6 || intitule.CATEGORIE==7 }">{{intitule.TAUXSALARIAL ==0.0 ? "-":intitule.TAUXSALARIAL }} </div>
                <div class="child-salariale doneBlack"
                    :class="{ bkgdmajoration: intitule.CATEGORIE==6 || intitule.CATEGORIE==7}">
                    {{intitule.MONTANTSALARIAL=="0.00" ? "-":intitule.MONTANTSALARIAL}}
                </div>
            </div>
     
    </div>

    <div class="corpspatronale">
            
            <div class="colonnepatronale">
                <!-- <div class="child-salariale">{{intitule.PATRONALE=="0.0"? "":intitule.PATRONALE}}</div> -->
                <div class="child-salariale doneBlack" :class="{ bkgdmajoration: intitule.CATEGORIE==6 || intitule.CATEGORIE==7}">{{intitule.TAUXPATRONAL=="0.00" ? " ":intitule.TAUXPATRONAL}}</div>
                <div class="child-salariale doneBlack" :class="{ bkgdmajoration: intitule.CATEGORIE==6 || intitule.CATEGORIE==7}">
                    {{ intitule.MONTANTPATRONAL== 0 ? "-":intitule.MONTANTPATRONAL}}  
                </div>
            </div>
      
    </div>
    
</div>

<!-- Affichage du calul cumulé  -->
<div class="bulletin">
    <div class="colonnesalariale">
                <div class="child-salariale engras agauche">Total général des charges</div>
                <div class="child-salariale engras"></div>
                <div class="child-salariale engras"></div>
                <div class="child-salariale engras"></div>
                <div class="child-salariale engras">{{totalChargesSalariales.toFixed(2)}}</div>
            </div>
            <div class="colonnepatronale">
                <div class="child-salariale engras"></div>
                <div class="child-salariale engras">{{ totalChargesPatronales.toFixed(2) }}</div>
            </div>
</div>


<div class="bulletin">
    <div class="colonnesalariale">
                <div class="child-salariale engras agauche">Salaire net à payer</div>
                <div class="child-salariale engras"></div>
                <div class="child-salariale engras"></div>
                <div class="child-salariale engras"></div>
                <div class="child-salariale engras">{{salaireNet.toFixed(2)}}</div>
            </div>
            <div class="colonnepatronale">
                <div class="child-salariale engras"></div>
                <div class="child-salariale engras"></div>
            </div>
</div>
<!-- <AmxCheckBox  label="Apporteur"/>  -->

<!-- <div><AmxBulletinPied> {{pied}}</AmxBulletinPied> </div> -->
<!-- <div>
	<button @click="testliste"> charges </button>
 </div> -->
 
</template>

<script setup lang="ts">
import { ref, onMounted,computed, reactive, toValue, watch } from 'vue'
// import AmxBulletinPied from './AmxBulletinPied.vue'
import { useBulletin } from '../composables/useBulletin.ts'
import AmxSlider from './AmxSlider.vue'


// const salaireBrutDeBase = ref(4000.00)
const salaireBrutDeBaseModel = defineModel({ default: 5000.0 });
const fraisGestionCadreho = ref(0.09)

// emits retirés, état global utilisé.



// Prop supprimée, valeur récupérée depuis useBulletin.ts

const {
    bulletinFinal,
    bulletinEntete,
    bulletinCalcule,
    salaireNet,
    salaireBrut,
    totalChargesPatronales,
    totalChargesSalariales,
    totalSalaireCharge,
    reserveFinanciere,
    fraisCadreho,
    estimationCA,
    notesDeFrais,
    primeApporteur,
    getParametresJson,
} = useBulletin(salaireBrutDeBaseModel.value,
                      0.0, 
                      0.0,
                      fraisGestionCadreho.value,
                      1
                    );


// const tableau = ref([])
interface RevenuCharge {
    LIBELLE: string;
    NOMBRE?: number;
    BASE?: number | string;
    TAUXSALARIAL?: number | string;
    MONTANTSALARIAL?: number | string;
    CATEGORIE?: number;
    REFERENCE?: number;
    TAUXPATRONAL?: number | string;
    MONTANTPATRONAL?: number | string;
    PATRONALE?: number | string;
}

const revenuCharges = ref<RevenuCharge[]>([])
const revenuEtInfos = ref<RevenuCharge[]>([])

// const totalSalarial = ref(0.0)
// const totalPatronal = ref(0.0)


// Modèles et props inutiles retirés car désormais gérés par useBulletin
// watch sur salaireBrutDeBaseModel préservé pour mettre à jour les taux dynamiquement
watch(
  salaireBrutDeBaseModel,
  async () => {
    // console.log(salaireBrutDeBaseModel.value)
    if (salaireBrutDeBaseModel.value>1801.79) {
        var CA = salaireBrutDeBaseModel.value * 1.9; // pour le meme calcul dans le moteur de calcul CA calulle pour 1.9 du SB 
        setTauxCadreho(CA);
        getParametresJson(salaireBrutDeBaseModel.value,fraisGestionCadreho.value,1,0)
        }
    else {
        // Optionnel : réinitialiser les valeurs dans useBulletin
    }
  },{ immediate: true }
)



function setTauxCadreho( CA : number) {
    // console.log("estimationCA",estimationCA.value)
    if ( CA<5000) 
        fraisGestionCadreho.value = 0.1;
    else if (CA>5000 && CA<7500)
        fraisGestionCadreho.value = 0.09;
    else if (CA>7500 && CA<9200)
        fraisGestionCadreho.value = 0.08;
    else if (CA>9200 && CA<11700)
        fraisGestionCadreho.value = 0.07;
    else if (CA>11700 && CA<14200)
        fraisGestionCadreho.value = 0.06;
    else if (CA>14200 && CA<16700)
        fraisGestionCadreho.value = 0.055;
    else if (CA>16700) 
         fraisGestionCadreho.value = 0.05;
    }

onMounted (()=> {
    getParametresJson(salaireBrutDeBaseModel.value,fraisGestionCadreho.value,1);
    
    // console.log("notesDeFrais, propsNotesDeFrais.value ", notesDeFrais,propsNotesDeFrais.value)
    // console.log("reserveFinanciere.value",reserveFinanciere)
    // console.log("propsSalaireBrut.value ",propsSalaireBrut , salaireNet)
    // console.log("valeurs", salaireNet.value,totalChargesSalariales.value,totalChargesPatronales.value,salaireBrutDeBaseModel.value )
    
    revenuEtInfos.value = bulletinEntete.value;
   	revenuCharges.value  = bulletinCalcule.value;
        
	// salaireBrutDeBase.value = salaireBrutDeBaseModel.value;

})

function getStyleRed(intitule: RevenuCharge) {
    if (intitule.REFERENCE !== undefined && intitule.REFERENCE >= 4000 && intitule.REFERENCE < 5000) 
        return true;
    else
        return false;
}

function getStyleBlue(intitule: RevenuCharge) {
    if (intitule.REFERENCE !== undefined && intitule.REFERENCE >= 6000 && intitule.REFERENCE <7000) 
        return true;
    else
        return false;
}

function getStyleGreen(intitule : RevenuCharge) {
    if (intitule.REFERENCE !== undefined && intitule.REFERENCE >= 7000 && intitule.REFERENCE < 8000) 
        return true;
    else
        return false;
}


</script>

<style scoped>

.recalculForm {
    display : grid;
    grid-template-columns: 50% 50%;
    margin-bottom: 15px;
    grid-gap: 5px;  
    /* padding : 5px; */

}

.bulletin {
grid-template-rows: auto; 
display : grid; 
grid-template-columns: 70% 30%;
grid-gap: 5px;  
}

.corpssalarial {
    display: grid;
    grid-template-rows: auto auto auto; 
    height: 100%;
    width: 100%;
 }

.colonnesalariale {
 font-size: 0.5rem;
 display: grid;
 grid-template-columns: 40% 1fr  1fr 1fr 1fr;
 grid-auto-rows: 1fr;
 background-color: rgb(224, 228, 207);
 padding: 0px;
 border: 0px solid #333;
 border-bottom: 1px solid #333;
 grid-gap: 1px;
}

.child-salariale {
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  }   

.corpspatronale {
    display: grid;
    grid-template-rows: auto auto auto; 
    height: 100%;
    width: 100%;
    
}

.colonnepatronale{
 font-size: 0.5rem;
 display: grid;
 grid-template-columns: 1fr  1fr;
 grid-auto-rows: 1fr;
 padding: 0px;
 border: 0px solid #333;
 margin-right: 5px;
 border-bottom: 1px solid #333;
 grid-gap: 1px;
}


/* style complémentaire */
.engras {
    font-weight: bold;
    color: #333;
}

.doneBlack {
    font-weight: bold;
    color: #333;
}


.doneGreen {
    font-weight: bold;
    color: green;
}

.doneRed {
    font-weight: bold;
    color: red ;
}

.doneBlue {
    font-weight: bold;
    color: blue;
}

.agauche {
    justify-content: left;
    padding-left: 3px;
}

.bkgdmajoration {
   background-color: #C5D9F1;
   
}

.totalSalaire {
    font-weight: bold;
    color: #333;
}

.intitule{
    /* display: flex;  */
    align-items: center;
    justify-content: center;
    font-family: "Oswald", sans-serif;
    font-weight: 600;
    font-size: 14px;
    margin-top: 0px;
 
}


.controlesaisie {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    font-family: Arial, Helvetica, sans-serif;
    width: 100%;
    height : 40px;

}

.logoAmx {
 display: flex;
 width : 40px;
 height : 40px
}

    
</style>
