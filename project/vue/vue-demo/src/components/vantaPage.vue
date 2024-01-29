<template>
    <div>
       <div ref="vantaRef" style="width:100%;height:100vh"></div>
       <div class="my_title">Hello,World</div>
    </div>
    
    </template>
    
    <script>
    import * as THREE from 'three'
    import BIRDS from 'vanta/src/vanta.clouds'
    
    export default {   
      data() {
        return {
          
        };
      },
      mounted() {
        this.vantaEffect = BIRDS({
          el: this.$refs.vantaRef,
          THREE: THREE
        })
      },
      beforeDestroy() {
        if (this.vantaEffect) {
          this.vantaEffect.destroy()
        }
      },
      methods: {
        
      },
    
    };
    </script>
    
    <style>
    .my_title{
      z-index: 999;
      position: fixed;
      top: 40%;
      left: 10%;
      color: aquamarine;
      font-size: 100px;
      font-weight: bolder;
    }
    </style>
    