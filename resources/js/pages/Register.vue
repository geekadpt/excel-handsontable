<template>
    <div>
        <main>
            <section class="absolute w-full h-full">
                <div
                        class="absolute top-0 w-full h-full bg-gray-900"
                        style="background-size: 100%; background-repeat: no-repeat;"
                        :style="{'background-image': 'url(' + require('../assets/img/register_bg_2.png') + ')'}"
                ></div>
                <div class="container mx-auto px-4 h-full">
                    <div class="flex content-center items-center justify-center h-full">
                        <div class="w-full lg:w-4/12 px-4">
                            <template>
                                <v-card
                                        class="mx-auto"
                                        max-width="500"
                                >
                                    <v-card-title class="title font-weight-regular justify-space-between">
                                        <span>{{ currentTitle }}</span>
                                        <v-avatar
                                                color="primary lighten-2"
                                                class="subheading white--text"
                                                size="24"
                                                v-text="step"
                                        ></v-avatar>
                                    </v-card-title>

                                    <v-window v-model="step">
                                        <v-window-item :value="1">
                                            <v-card-text>
                                                <v-text-field
                                                        :label="$t('m.register.phone')"
                                                        value=""
                                                        v-model="registerForm.phone"
                                                ></v-text-field>
                                                <span class="caption grey--text text--darken-1">
                {{$t('m.register.explainPage1')}}
              </span>
                                            </v-card-text>
                                        </v-window-item>
                                        <v-window-item :value="2">
                                            <v-card-text>
                                                <v-text-field
                                                        :label="$t('m.register.code')"
                                                        type="text"
                                                        v-model="registerForm.verificationCode"
                                                ></v-text-field>
                                                <v-text-field
                                                        :label="$t('m.register.name')"
                                                        type="text"
                                                        v-model="registerForm.name"
                                                ></v-text-field>
                                                <v-text-field
                                                        :label="$t('m.register.password')"
                                                        type="password"
                                                        v-model="registerForm.password"
                                                ></v-text-field>
                                                <span class="caption grey--text text--darken-1">
                {{$t('m.register.explainPage2')}}
              </span>
                                            </v-card-text>
                                        </v-window-item>
                                        <v-window-item :value="3">
                                            <v-text-field
                                                    style="visibility: hidden;height: 1px"
                                            ></v-text-field>
                                            <div class="pa-4 text-center">
                                                <v-img
                                                        class="mb-4"
                                                        contain
                                                        height="128"
                                                        src="https://cdn.vuetifyjs.com/images/logos/v.svg"
                                                ></v-img>
                                                <h3 class="title font-weight-light mb-2">Welcome to Supcell</h3>
                                                <span class="caption grey--text text--darken-1">{{$t('m.register.explainPage3')}}</span>
                                            </div>
                                        </v-window-item>
                                    </v-window>

                                    <v-divider></v-divider>

                                    <v-card-actions>
                                        <v-btn
                                                :disabled="step !== 2"
                                                text
                                                @click="--step"
                                        >
                                            {{$t('m.register.previous')}}
                                        </v-btn>
                                        <v-spacer></v-spacer>
                                        <v-btn
                                                :disabled="step === 3"
                                                v-show = "step !== 3"
                                                color="primary"
                                                depressed
                                                @click="next"
                                        >
                                            {{$t('m.register.next')}}
                                        </v-btn>
                                        <router-link :to="{ name:'Login' }">
                                            <v-btn
                                                    v-show = "step === 3"
                                                    color="primary"
                                                    depressed
                                            >
                                                {{$t('m.register.login')}}
                                            </v-btn>
                                        </router-link>
                                    </v-card-actions>
                                </v-card>
                            </template>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    </div>
</template>
<script>
    import { EventBus } from '../event-bus.js';
    export default {
        data: () => ({
            step: 1,
            registerForm:{
                phone: '',
                verificationCode: '',
                name:'',
                password:''
            }
        }),

        computed: {
            currentTitle () {
                switch (this.step) {
                    case 1: return this.$t('m.register.titlePage1');
                    case 2: return this.$t('m.register.titlePage2');
                    case 3: return this.$t('m.register.titlePage3');
                }
            },
        },
        methods:{
            next(){
                switch (this.step) {
                    case 1:
                        this.$store.dispatch('sendVerificationCodes', {
                            phone: this.registerForm.phone,
                        });
                        this.$watch(this.$store.getters.getVerificationCodesSendStatus, function () {
                            if (this.$store.getters.getVerificationCodesSendStatus() === 2) {
                                EventBus.$emit('open-message', {
                                    text: this.$t('m.register.codeSended')
                                });
                                if(this.step === 1){
                                    ++this.step;
                                }
                            }
                            if (this.$store.getters.getVerificationCodesSendStatus() === 3) {
                                EventBus.$emit('open-message', {
                                    text: this.$store.getters.getVerificationCodesSendErrors
                                });
                            }
                        });
                        break;
                    case 2:
                        this.$store.dispatch('register',{
                            name:this.registerForm.name,
                            password:this.registerForm.password,
                            verification_key: this.$store.getters.getVerificationKey,
                            verification_code:this.registerForm.verificationCode,
                        });
                        this.$watch(this.$store.getters.getRegisterStatus, function () {
                            if (this.$store.getters.getRegisterStatus() === 2) {
                                if(this.step === 2){
                                    ++this.step;
                                }
                            }
                            if (this.$store.getters.getRegisterStatus() === 3) {
                                EventBus.$emit('open-message', {
                                    text: this.$store.getters.getRegisterErrors
                                });
                            }
                        });
                        break;
                    case 3:
                        break;
                    default:
                        break;
                }
            }
        }
    }
</script>