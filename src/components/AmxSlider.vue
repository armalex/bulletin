<template>
    <div class="slider-container">
    <input class="slider"
      type="range"
      :min="min"
      :max="max"
      :step="step"
      v-model="model"
      labelSlider="labelSlider"
      texteSlider1="texteSlider1"
      texteSlider2="texteSlider2"
      @input="updateValue"
      />
   
  </div>
</template>

<script setup lang="ts">

import { ref, defineComponent } from "vue";

//const model = defineModel()

// 

withDefaults(defineProps<{
    label : string,
    min : number,
    max : number,
    modelValue : number,
    labelSlider :number,
    texteSlider1:number,
    textesSlider2:number,
    secondLabel : number,
    step : number,
}>(), {
    label : "Nom du slider",

})


// const emits = defineEmits("update:modelValue"); 

const emits =defineEmits<{
  update : [valeur:number] 
}>()



// const currentValue = ref()
const model = defineModel<number>()


const updateValue = () => {
      emits("update", 10);
      // console.log("Valeur de la slide",props.labelSlider,model.value)
    } 

</script>

<style> 
/* rgb(83, 40, 198) bleu  cadreho
   rgb(233, 25, 44) rouge 
   rgb(111, 140, 105)  vert 
*/

:root {
    --track-height : 6px;
    --thumb-height : 18px;
    --thumb-width: 18px;
}


input[type="range"] {
    appearance: none;
    background: transparent;
    width : 23rem;
    height : 2rem; 
    cursor : pointer;
    border-radius: 3px;
    

}

/* input track  chrome safari edge */
input[type="range"]::-webkit-slider-runnable-track {
    background : linear-gradient(to right,rgb(207, 211, 221), rgb(83, 40, 198));
    height : var(--track-height);
    border-radius: 3px;
}

/* Firefox */
input[type="range"]::-moz-range-thumb  {
    background : linear-gradient(to right,rgb(83, 40, 198), white);
    height : var(--track-height);
    border-radius: 3px;
}

/* */
input[type="range"]::-webkit-slider-thumb {
        /* -webkit-appearance: none; */
        appearance: none;
        background:white ; 
        border-radius : 50%; 
        width: var(--thumb-width);
        height: var(--thumb-height); 
        margin-top : calc((var(--track-height)/2) - (var(--thumb-height))/2 );
        border : 1px solid rgb(83, 40, 198);
        /* color : red; */
       }

    body {
        margin:0;
        padding:32px;
        background : white;
    }


</style>
