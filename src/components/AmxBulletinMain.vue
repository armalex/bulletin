<template> 
    <div class="bulletinBS">
        <div class="entete"> 
            <AmxBulletinEntete></AmxBulletinEntete> 
        </div>
        <div> 
            <AmxBulletinCorpsMoteur></AmxBulletinCorpsMoteur>
        </div>
         <div> 
            <AmxBulletinPied></AmxBulletinPied> 
        </div>
    </div>
</template>

<script setup lang="ts"> 
import AmxBulletinEntete from './AmxBulletinEntete.vue'
import AmxBulletinCorpsMoteur from './AmxBulletinCorpsMoteur.vue' 
import AmxBulletinPied from './AmxBulletinPied.vue'
</script>


<style scoped>
 
 .entete {
    display : grid;
    /* grid-template-rows: 1fr 1fr 1fr; */
    width : 100%;
    padding-top: 1px;
    padding-left: 1px;
    /* height : 250px; */
    margin-top: 0px; 
 }

.bulletinBS {
    display : flex;
    flex-direction: column;
    align-items: top;
    padding: 2px;
    border: 2px solid #241313; 
    background-color: #c6d9f0; 
    border-radius: 5px;
    /* border-color: 10px solid rgb(180, 66, 9); */
    width : 100%;
    min-height : 600px;
    width : 700px;
    margin: 2px;
}


</style>