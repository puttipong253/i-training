<template>
    <Wrapper>
        <v-row>
            <v-col cols="12" sm="6" md="3">
                <v-card
                    class="mx-auto mt-5"
                    max-width="344"
                    height="200px"
                >
                    <v-card-title class="blue white--text">
                      ผู้ลงทะเบียนทั้งหมด
                    </v-card-title>

                    <div class="mt-1 blue--text">
                      {{getCountAllUser}}
                    </div>
                </v-card>
            </v-col> 
            <v-col cols="12" sm="6" md="3">
                <v-card
                    class="mx-auto mt-5"
                    max-width="344"
                    height="200px"
                >
                    <v-card-title class="green white--text">
                      ผู้ลงทะเบียนที่จับคู่แล้ว
                    </v-card-title>

                    <div class="mt-1 green--text">
                      {{getCountUserMatch}}
                    </div>
                </v-card>
            </v-col> 
            <v-col cols="12" sm="6" md="3">
                <v-card
                    class="mx-auto mt-5"
                    max-width="344"
                    height="200px"
                >
                    <v-card-title class="orange white--text" >
                      ผู้ลงทะเบียนที่ยังไม่จับคู่
                    </v-card-title>

                    <div class="mt-1 orange--text">
                      {{getCountUserNotMatch}}
                    </div>
                </v-card>
            </v-col> 
            <v-col cols="12" sm="6" md="3">
                <v-card
                    class="mx-auto mt-5"
                    max-width="344"
                    height="200px"
                >                   
                    <v-card-title class="red white--text">
                      ห้องพักที่ลงทะเบียนแล้ว
                    </v-card-title>

                    <div class="mt-1 red--text">
                      {{getCountUserRoom}}
                    </div>
                </v-card>
            </v-col> 
        </v-row>                
    </Wrapper>
</template>

<script>
import {Wrapper} from './index.style'
export default {
    data() {
        return {
            
        }
    },
    components:{
        Wrapper
    },
    mounted(){
        this.$store.dispatch('countAllUser')
        this.$store.dispatch('countUserMatch')
        this.$store.dispatch('countUserNotMatch')
        this.$store.dispatch('countUserRoom')
    },
    computed: {
        getCountAllUser(){
            return this.$store.getters.getCountAllUser
        },
        getCountUserMatch(){
            return this.$store.getters.getCountUserMatch
        },
        getCountUserNotMatch(){
            return this.$store.getters.getCountUserNotMatch
        },
        getCountUserRoom(){
            return this.$store.getters.getCountUserRoom
        }
    },
}
</script>